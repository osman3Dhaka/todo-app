const express = require('express')
const cors = require('cors')
const { MongoClient, ServerApiVersion,ObjectId } = require('mongodb');

require('dotenv').config()
const app = express()
const port = process.env.PORT || 5000

app.use(cors())
app.use(express.json())


const uri = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.cgogo0x.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

// client.connect(err => {
//   const collection = client.db("uniqueITtodo").collection("todos");
//   // perform actions on the collection object
//   client.close();
// });

async function run() {
    try {
      await client.connect();
      const database = client.db("uniqueITtodo");
      const todos = database.collection("todos");

      app.get('/allTask', async(req, res) => {
        const query  = {}
        const result = await todos.find(query).toArray();
        res.send(result)
      })
      
      app.post('/addTask', async(req, res) => {
        const task = req.body
        const result = await todos.insertOne(task);
        res.send(result)
      })
      app.delete('/delete/:id',async(req,res)=>{
        const id = req.params
        console.log(id);
        const query ={ _id:ObjectId(id) }
        const result = await todos.deleteOne(query); 
        res.send(result);
      })
      
      
      
    } finally {
      
    }
  }
  run().catch(console.dir)





app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})