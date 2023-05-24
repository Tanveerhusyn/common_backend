const mongoose = require('mongoose')
const express = require('express')
const app = express()
 
const agentRoutes = require('./routes/agentRoutes')
const GovtRouter = require('./routes/GovtRoute')
 
const userRoutes = require('./routes/userRoutes')
const PropertyRouter = require('./routes/PropertyRoute')

var cors = require('cors')
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors())

mongoose.set('strictQuery', false);
const atlasURL = "mongodb+srv://tan:abcdefg@cluster0.wrwhy.mongodb.net/blockland?retryWrites=true&w=majority"
const url = 'mongodb+srv://hafeezkakar:hafeez@cluster0.xucy9.mongodb.net/?retryWrites=true&w=majority'
const connection = mongoose.connect(atlasURL, { useNewUrlParser: true, useUnifiedTopology: true });
connection.then((db) => {
    console.log("Connected correctly to mongodb");
}, (err) => { console.log(err); });


app.use('/agent', agentRoutes)
app.use('/user', userRoutes)
app.use('/govt', GovtRouter)
app.use('/property', PropertyRouter)

app.listen(5000, () => console.log("Listening on port 5000"))