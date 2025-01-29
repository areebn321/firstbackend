//and display it on the browser
const express = require("express");
const cors = require("cors");
const app = express();
const mongodb = require("mongodb");
const MongoClient = mongodb.MongoClient;
const uri =
  "mongodb+srv://areebnadir3:mgqu7yUSX4YnDFG7@cluster0.blkxh.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

app.use(cors());
const port = 3001;

app.get("/api", async (req, res) => {
  const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  try {
    await client.connect();
    const database = client.db("sample_training");
    const collection = database.collection("trips");
    const result = await collection.find({}).toArray();
    res.json(result);
  } catch (e) {
    console.log(e);
    res.status(500).send({ error: e.message });
  } finally {
    await client.close();
  }
  //   res.json("Hello World!");
});

// app.get("/api", async (req, res) => {
//   const client = new MongoClient(uri, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   });
//   try {
//     await client.connect();
//     const database = client.db("sample_training");
//     const collection = database.collection("grades");
//     const result = await collection.findMany({}).toArray();
//     res.json(result);
//   } catch (e) {
//     console.log(e);
//     res.status(500).send({ error: e.message });
//   } finally {
//     await client.close();
//   }
// });

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
