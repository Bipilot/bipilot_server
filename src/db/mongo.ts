import { MongoClient, ServerApiVersion } from 'mongodb';
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const username: any = process.env.DB_USER;
const password: any = process.env.DB_PASS;
const dbName: any = process.env.DB_NAME;
const encodedPassword = encodeURIComponent(password);
const uri = `mongodb+srv://${username}:${encodedPassword}@cluster0.pkqlxs0.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function connect() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } catch (error) {
    console.error('Failed to connect to MongoDB:', error);
  }
}

async function insertData(collectionName: any, data: any) {
  try {
    const collection = client.db(dbName).collection(collectionName);
    const result = await collection.insertOne(data);
    return result;
  } catch (error) {
    return error;
  }
}

async function getData(collectionName: any, query: any) {
  try {
    const collection = client.db(dbName).collection(collectionName);
    const result = await collection.find(query).toArray();
    return result;
  } catch (error) {
    return error;
  }
}

async function updateData(collectionName: any, query: any, update: any) {
  try {
    const collection = client.db(dbName).collection(collectionName);
    const result = await collection.updateOne(query, { $set: update });
    return result;
  } catch (error) {
    return error;
  }
}

async function deleteData(collectionName: any, query: any) {
  try {
    const collection = client.db(dbName).collection(collectionName);
    const result = await collection.deleteOne(query);
    return result;
  } catch (error) {
    return error;
  }
}

export {
  connect,
  insertData,
  getData,
  updateData,
  deleteData
}



