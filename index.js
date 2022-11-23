const express = require('express');
const cors= require("cors")
const app = express();
const port=process.env.PORT || 5000;



// midleware
app.use(cors());
app.use(express.json());


// genarel server

app.get('/', (req, res) => {
  res.send('this is hea_Easy server');
});

app.listen(port, () => {
 
    console.log(`Server listening on port ${port}`)
    

})
