const express = require('express');
const cors = require('cors');
require('dotenv').config();
const port = process.env.PORT || 5000;
const app = express();
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
var jwt = require('jsonwebtoken');





// middleware
app.use(cors());
app.use(express.json());






const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.jnabqpv.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });


const run=async()=>{
  try{
  //   //usercollection
    const usersCollection=client.db("heaeasy").collection("users")
   const homesCollection = client.db('heaeasy').collection('homes')
   const orderCollection=client.db("heaeasy").collection("orders")
   


 

   app.post("/orders",async(req,res)=>{
    const order=req.body
   
    const result=await orderCollection.insertOne(order)
    console.log(result)
    res.send(result)

   })






    

    // Save user email & generate JWT
    app.put('/user/:email', async (req, res) => {
      const email = req.params.email
      const user = req.body
      const filter = { email: email }
      const options = { upsert: true }
      const updateDoc = {
        $set: user,
      }
      const result = await usersCollection.updateOne(filter, updateDoc, options)
      console.log(result)

      const token = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: '1d',
      })
      console.log(token)
      res.send({ result, token })
    })

    console.log('Database Connected...')


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


