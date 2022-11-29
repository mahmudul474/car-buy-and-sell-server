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






// const categories = require('./data/categories.json');
// const news = require('./data/news.json');


// app.get('/news-categories', (req, res) => {
//     res.send(categories)
// });

// app.get('/category/:id', (req, res) => {
//     const id = req.params.id;
//     if (id === '08') {
//         res.send(news);
//     }
//     else {
//         const category_news = news.filter(n => n.category_id === id);
//         res.send(category_news);
//     }
// })

// app.get('/news', (req, res) =>{
//     res.send(news);
// });

// app.get('/news/:id', (req, res) => {
//     const id = req.params.id;
//     const selectedNews = news.find(n => n._id === id);
//     res.send(selectedNews);
// });


// //mongodb code is  here



const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.jnabqpv.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });


const run=async()=>{
  try{
  //   //usercollection
    const usercollection=client.db("heaeasy").collection("users")

    const productCatagoris=client.db("heaeasy").collection("prodauctCatagory")




    //get all catagory

    app.get("/catagory",async(req,res)=>{
      const query={}
      const result=await productCatagoris.find(query).toArray()
      res.send(result)

    })












  //   const srviceCollection = client.db("ginusServerCollection").collection("services")
 



  //   const orderCollection = client.db("ginusServerCollection").collection("orders");
     
  //   // all data get
    
    
  //   app.get("/services",async(req,res)=>{
  //       const query={};
  //       const services=await srviceCollection.find(query).toArray();
  //       res.send(services);
    
       
  //   })
    
  //   // get spacificdata    
    
  //   app.get("/services/:id", async(req,res)=>{
  //       const id=req.params.id;
  //       const query={_id:ObjectId(id)};
  //       const services=await srviceCollection.findOne(query);
  //       res.send(services);
    
    
    
  //   })
    
    

  //   app.get("/cata/:meseg", async(req,res)=>{
  //  const meseg=req.params.meseg;
  //  const query={meseg:meseg};
  //  const ress=await orderCollection.find(query).toArray()
  //  res.send(ress)


  //   })

    
    
    //order post
    
    
    // app.post("/orders",  async(req,res)=>{
    //     //  console.log(req.headers.authorization)
    // const order = req.body;
    // const result=await  orderCollection.insertOne(order);
    //     res.send(result);
    
    // })
    
    
    
    ///get first all oreder then spacific order collection
    
    
    // app.get("/orders", async(req,res)=>{
    
    // const decoded=req.decoded;
    // if(decoded.email !== req.query.email){
    //     res.status(401).send({messege:"unauthorized"});
    // }
    
    //  let query={};
    //     if(req.query.email){
    //         query.email=req.query.email;
    //     }
        
    //     const orders=await orderCollection.find(query).toArray();
    //     res.send(orders);
    
    
    // })
    
    
    
    
    
    
    
    
    
    //uptgrade data
    
    
 
    
    
    
    
    
    
    ///get jwt token from clint  side
    
    
    
    
    
    
    













    
    
    // app.get('/news-categories',async (req, res) => {
      
    //  const query={};
    //  const result=await catagorycollection.find(query).toArray()
     

    //     res.send(result)
    // });
    
    // app.get('/catagory/:id', async(req, res) => {
    //     const id = req.query.id;
    //   const query={_id:ObjectId(id)}
    //         const categorynews =await Productcollection.find(query).toArray()
    //         res.send(categorynews);
        
    // })
    
    // app.get('/news', async(req, res) =>{

    //   const query={};
    //   const result=await Productcollection.find(query).toArray()
    //     res.send(result);
    // });
    
    // app.get('/news/:id', async(req, res) => {
    //     const id = req.params.id;
    //     const query={_id: ObjectId(id)}
    //     const selectedNews =await Productcollection.find(query).toArray();
    //     res.send(selectedNews);
    // });
    
    
    // //mongodb code is  here
    
    























   
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




