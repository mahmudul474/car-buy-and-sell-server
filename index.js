const express = require('express');
const cors = require('cors');
require('dotenv').config();
const port = process.env.PORT || 5000;
const app = express();
const { MongoClient, ServerApiVersion } = require('mongodb');
var jwt = require('jsonwebtoken')




// middleware
app.use(cors());
app.use(express.json());










//mongodb code is  here



const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.jnabqpv.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });


const run=async()=>{
  try{
    //usercollection
    const usercollection=client.db("heaeasy").collection("users")
   
app.put("/user/:email",async(req,res)=>{
const email=req.params.email
const  user=req.body
const filter={email:email}
const option={upsert:true}
const updoc={
  $set:user,
}
const result=await usercollection.updateOne(filter,updoc ,option)


const token=jwt.sign(user,process.env.ACCES_TOKEN,{expiresIn:"1h"})
res.send({result,token})


})






  }
  finally{

  }
}

run().catch(err=>console.log(err))












//genarel server


app.get('/', async (req, res) => {
  res.send(" hea-easy  server is running");
})

app.listen(port, () => console.log(` hea-esay server running on ${port}`))




