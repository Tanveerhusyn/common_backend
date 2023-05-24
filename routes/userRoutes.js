const express = require('express');

const router = express.Router();
const axios = require('axios');
const NFTRequest = require('../models/NFTRequest');
const Agent = require('../models/Agent');
const User = require('../models/UserModelfinal');

const multer = require('multer');
const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');

// configure cloudinary
cloudinary.config({
  cloud_name: "dnrpvfhgs",
  api_key: "892624489525822",
  api_secret: "3r23GSf0EefP4xC1DYz1tkWSmgE"
});

// configure multer storage
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'nft-requests'
  }
});

const upload = multer({ storage: storage });

// Register user
router.post('/register', async (req, res) => {
  try {
    // Hash the password before saving it to the database
    

    // Create a new user document in the database
    const user = new User({
      fullname: req.body.fullname,
      email: req.body.email,
      phone: req.body.phone,
      cnic: req.body.cnic,
      address: req.body.address,
      walletAddress: req.body.walletAddress,
    });

    await user.save();

    res.status(201).json({ message: 'User registered successfully.' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Login user
router.post('/login', async (req, res) => {
  try {
    const { email, walletAddress } = req.body;

    // Check if the email address exists in the database
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ message: 'Invalid email or wallet address.' });
    }

    // Compare the wallet address with the user's wallet address
    const isMatch = walletAddress==user.walletAddress;

    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid email or wallet address.' });
    }

    res.status(200).json({ user });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Endpoint for creating a new NFT request
router.post('/nft-requests', upload.array('images'), async (req, res) => {
  try {
    const availableAgent = await Agent.findOne({ status: 'available' }); // Find the first available agent

    if (!availableAgent) {
      return res.status(503).json({ error: 'All agents are busy. Please try again later.' });
    }

    
    
    const images = req.files.map(file => file.path); // get image URLs from cloudinary
   
    const parsed =   JSON.parse(req.body['metadata']);
    // add images to metadata
    const metadata = {...parsed, images}
    console.log("Body",metadata)


    const url =  `https://api.pinata.cloud/pinning/pinJSONToIPFS`
    const jwt = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiIxYWIzMGRkOS01MjQ1LTQ4ODUtOGU2ZS0wZGM1MjFiODE5YjEiLCJlbWFpbCI6InRhbnZlZXJodXNzYWluNDY1QGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJwaW5fcG9saWN5Ijp7InJlZ2lvbnMiOlt7ImlkIjoiRlJBMSIsImRlc2lyZWRSZXBsaWNhdGlvbkNvdW50IjoxfSx7ImlkIjoiTllDMSIsImRlc2lyZWRSZXBsaWNhdGlvbkNvdW50IjoxfV0sInZlcnNpb24iOjF9LCJtZmFfZW5hYmxlZCI6ZmFsc2UsInN0YXR1cyI6IkFDVElWRSJ9LCJhdXRoZW50aWNhdGlvblR5cGUiOiJzY29wZWRLZXkiLCJzY29wZWRLZXlLZXkiOiI2NWNmYzBjMTMwMjQzOGFjZDE1ZCIsInNjb3BlZEtleVNlY3JldCI6IjVmMDQ1M2E3MzlkN2Q0N2E5Y2YyNzUyNzNlZGQ1Yzc5YWM0N2EzMjVmNDg3YTFkYmNlMmNhZmFhY2EzYmEyZWQiLCJpYXQiOjE2NzkxNzczOTV9.KRNHQRR0zR8f9pjMxxpeaA-MLao4qbIOFknE1pU-8ho"
   await axios.post(url,
      JSON.stringify(metadata),
      {
          headers: {
              'Authorization':`Bearer ${jwt}`,
              'Content-Type': `application/json`,
              'pinata_api_key': '65cfc0c1302438acd15d',
              'pinata_secret_api_key': '5f0453a739d7d47a9cf275273edd5c79ac47a325f487a1dbce2cafaaca3ba2ed'
          }
      }
  ).then(async (response) =>{
      //handle response here
      const ipfsHash = response.data.IpfsHash;
      const final  = {...metadata,hash:ipfsHash}
    console.log("RES",final)

      const nftRequest = new NFTRequest({metadata: final, assignedAgent: availableAgent._id });
      await nftRequest.save();
  });

   

    

    res.status(201).json({ message: `NFT request created successfully and assigned to agent ${availableAgent.name}` });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});


router.get('/userNFTs/:walletAddress', async (req, res) => {
  try {
    const walletAddress = req.params.walletAddress;
    const documents = await NFTRequest.find({ 'metadata.walletAddress': walletAddress }).exec();
    res.json(documents);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Endpoint for retrieving the status of an NFT request
router.get('/nft-requests/:id', async (req, res) => {
  try {
    const nftRequest = await NFTRequest.findById(req.params.id).populate('assignedAgent');
    if (!nftRequest) {
      return res.status(404).json({ error: 'NFT request not found' });
    }
    res.status(200).json(nftRequest);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

router.post('/mint/:id', async (req, res) => {
  try {
    const nftRequest = await NFTRequest.findById(req.params.id);
    if (!nftRequest) {
      return res.status(404).json({ error: 'NFT request not found' });
    }
    
    console.log(req.body)
    // Update the tokenId of the NFT request
    nftRequest.token.tokenURI = req.body.tokenURI;
    nftRequest.token.tokenId = req.body.tokenId;
    nftRequest.token.tokenAddress = req.body.tokenAddress;

    // Save the updated NFT request
    await nftRequest.save();

    res.status(200).json(nftRequest);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

router.get('/allusers', async function (req, res, next) {
  User.find({}).exec(function (error, results) {
      if (error) {
          return next(error);
      }
      res.json(results);
  });
});

module.exports = router;