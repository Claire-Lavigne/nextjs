import { MongoClient } from "mongodb";

async function handler(req, res) {
  if (req.method === "POST") {
    const data = req.body;

    const client = await MongoClient.connect(
      "mongodb+srv://circe:Datasolution75012@cluster0.czxgm.mongodb.net/products?retryWrites=true&w=majority"
    );
    const db = client.db();

    const productsCollection = db.collection("products");
    const result = await productsCollection.insertOne(data);

    console.log(result);

    client.close();

    res
      .status(201)
      .json({ message: "Your new product has been added succesfully!" });
  }
}

export default handler;
