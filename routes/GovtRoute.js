const path = require("path");
var express = require("express");
var router = express.Router();
const GovtModel = require("../models/PropertyModel");
const fs = require("fs");
const PDFDocument = require("pdfkit");
const pdfParse = require("pdf-parse");
const NFTRequest = require("../models/NFTRequest");

//verify property
router.post("/verifyproperty/:id", async (req, res) => {
  try {
    const nft = await NFTRequest.findById(req.params.id);
    if (nft.callLink != "") {
      nft.status = "accepted";
      await nft.save();
    }
    res
      .status(200)
      .json({ message: "Property Details are matched with govt record." });
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ error: "Property coculd not be approved from govt.", err });
  }
});

// router.post('/verifyproperty', function (req, res, next) {
//     const path1 = path.join(__dirname, 'report.pdf')
//     const getPDF = async (file) => {
//         let readFileSync = fs.readFileSync(file)
//         try {
//             let pdfExtract = await pdfParse(readFileSync)
//             console.log('File content: ', pdfExtract.text)
//             if (pdfExtract.text.includes('Flat')) {
//                 res.status(200).send("True")
//             }
//             else {
//                 res.status(200).send("False")
//             }
//             console.log('Total pages: ', pdfExtract.numpages)
//             console.log('All content: ', pdfExtract.info)
//         } catch (error) {
//             throw new Error(error)
//         }
//     }

//     getPDF(path1)
// });

module.exports = router;
