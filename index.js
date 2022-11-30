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
  try {
    const userLoginCollection = client.db("heaeasy").collection("registerData")
    const categoryLoginCollection = client.db("heaeasy").collection("category")
    const productsDataCollection = client.db("heaeasy").collection("productCollection");
    const bookingDataCollection = client.db('heaeasy').collection('bookingData')
    const reportDataCollection = client.db('heaeasy').collection('reportData')
    const boostProductsCollection = client.db('heaeasy').collection('boostProduct')

    // register time post 
    app.post('/registerData', async (req, res) => {
      const userData = req.body;
      const result = await userLoginCollection.insertOne(userData)
      res.send(result)
    });

    //get all user
    app.get('/allUser', async (req, res) => {
      const query = {}
      const allUser = await userLoginCollection.find(query).toArray()
      res.send(allUser)
    })

    app.get('/userData/:id', async (req, res) => {
      const id = req.params.id;
      const query = { _id: ObjectId(id) };
      const result = await userLoginCollection.find(query).toArray();
      res.send(result)

    })

    //social
    app.get("/socialLogin/:email", async (req, res) => {
      const email = req.params.email;
      //   console.log(email);
      const query = { email: email };
      const curser = userLoginCollection.find(query);
      const result = await curser.toArray();
      const arraysLength = result;
      if (arraysLength.length > 0) {
        return res.send("old user");
      }
      const newUser = {
        email: email,
        name: email,
        accountType: "Buyer",
      };
      //   console.log(email)
      const createUser = await userLoginCollection.insertOne(newUser);
      res.send(createUser);
      //   console.log(createUser);
    });


    //category get

    app.get('/category', async (req, res) => {
      const query = {}
      const result = await categoryLoginCollection.find(query).toArray()
      res.send(result)
    });


    app.get("/CarCategory", async (req, res) => {
      const queryData = req.query.model;
      if (queryData == null) {
        const query = { model: 'Bm-W' };
        const data = await categoryLoginCollection.find(query).toArray();
        return res.send(data);
      }

      const query = { model: queryData };
      const curser = categoryLoginCollection.find(query);
      const result = await curser.toArray();
      res.send(result);
    });

    // car post
    app.post("/products", async (req, res) => {
      const productsData = req.body;
      const result = await productsDataCollection.insertOne(productsData);
      res.send(result);
    });

    //get my product list

    app.get('/products/:email', async (req, res) => {
      const productEmail = req.params.email;
      //  console.log(productEmail)
      const query = { seller: productEmail }
      const result = productsDataCollection.find(query);
      const curser = await result.toArray()
      res.send(curser)
    })

    //boostProducts
    app.post('/boostProduct', async (req, res) => {
      const boostProduct = req.body
      const result = await boostProductsCollection.insertOne(boostProduct)
      res.send(result)
    })

    // product delete
    app.delete('/productsData/:id', async (req, res) => {
      const ID = req.params.id;
      const query = { _id: ObjectId(ID) }
      const result = await productsDataCollection.deleteOne(query)
      res.send(result)
    })

    // car category wise get
    app.get("/allCars", async (req, res) => {

      const queryData = req.query.model;
      if (queryData == null) {
        const query = { carType: 'Porsche' };
        const data = await productsDataCollection.find(query).toArray();
        return res.send(data);
      }

      const query = { carType: queryData };
      const curser = productsDataCollection.find(query);
      const result = await curser.toArray();
      res.send(result);
    });









    //booking data post
    app.post('/bookingData', async (req, res) => {
      const bookingData = req.body;
      const result = await bookingDataCollection.insertOne(bookingData)
      res.send(result)
    })

    // get myOrder 
    app.get('/bookingData/:email', async (req, res) => {

      const bookingEmail = req.params.email
      const query = { email: bookingEmail }
      const result = bookingDataCollection.find(query)
      const curser = await result.toArray()
      res.send(curser)

    })

    //report post
    app.post('/reportData', async (req, res) => {
      const reportData = req.body
      const result = await reportDataCollection.insertOne(reportData)
      res.send(result)
    })

    //all report list get
    app.get('/allreportData', async (req, res) => {
      const query = {}
      const result = await reportDataCollection.find(query).toArray()
      res.send(result)
    })

    //delete Report item
    app.delete('/allReportDelete/:id', async (req, res) => {
      const id = req.params.id
      const query = { _id: ObjectId(id) }
      const result = await reportDataCollection.deleteOne(query)
      res.send(result)

    })

    // admin
    // app.get('/usersAdmin/:email', async (req, res) => {
    //   const email = req.params.email;
    //    const query = { email };
    //    const user = await userLoginCollection.findOne(query);
    //    res.send({ isAdmin: user?.accountType === 'admin' });
    //  });

    app.get("/adminState/:email", async (req, res) => {
      console.log(req.params.email);
      const query = { email: req.params.email };
      const curser = await userLoginCollection.findOne(query);
      if (curser?.accountType === "Admin") {
        console.log("admin");
        return res.send(true);
      }
      console.log("not admin");
      res.send(false);
    });


    //seller
    // app.get('/usersSeller/:email', async (req, res) => {
    //   const email = req.params.email;
    //   const query = { email };
    //   const user = await userLoginCollection.findOne(query);
    //   res.send({ isSeller: user?.accountType === 'Seller' });
    // });

    app.get("/sellerState/:email", async (req, res) => {
      console.log(req.params.email);
      const query = { email: req.params.email };
      const curser = await userLoginCollection.findOne(query);
      if (curser?.accountType === "Seller") {
        console.log("Seller");
        return res.send(true);
      }
      console.log("not Seller");
      res.send(false);
    });

    //buyer
    // app.get('/usersBuyer/:email', async (req, res) => {
    //   const email = req.query.email;
    //    const query = { email };
    //    const user = await userLoginCollection.findOne(query);
    //    res.send({ isBuyer: user?.accountType === 'Buyer' });
    //  });

    app.get("/buyerState/:email", async (req, res) => {
      console.log(req.params.email);
      const query = { email: req.params.email };
      const curser = await userLoginCollection.findOne(query);
      if (curser?.accountType === "Buyer") {
        console.log("buyer");
        return res.send(true);
      }
      console.log("not buyer");
      res.send(false);
    });


    //all seller
    app.get("/allSellers", async (req, res) => {
      // const queryData = req.params.accountType;
      const query = { accountType: 'Seller' };
      const curser = userLoginCollection.find(query);
      const result = await curser.toArray();
      res.send(result);
    });

    //delete seller
    app.delete('/allSellerDelete/:id', async (req, res) => {
      const id = req.params.id
      const query = { _id: ObjectId(id) }
      const result = await userLoginCollection.deleteOne(query)
      res.send(result)
    })

    //get all Buyer
    app.get("/allBuyers", async (req, res) => {
      // const queryData = req.params.accountType;
      const query = { accountType: 'Buyer' };
      const curser = userLoginCollection.find(query);
      const result = await curser.toArray();
      res.send(result);
    });

    // delete Buyer
    app.delete('/allBuyerDelete/:id', async (req, res) => {

      const id = req.params.id
      const query = { _id: ObjectId(id) }
      const result = await userLoginCollection.deleteOne(query)
      res.send(result)

    })

    app.get("/user/:email", async (req, res) => {
      console.log(req.params.email);
      const query = { email: req.params.email };
      const curser = await userLoginCollection.findOne(query);
      if (curser) {
        return res.send(curser);
      }

      res.send(false);
    });




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


