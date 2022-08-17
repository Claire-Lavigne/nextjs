// import { useRouter } from "next/router";
import Head from "next/head";
import { MongoClient } from "mongodb";

const Product = (props) => {
  // const router = useRouter();
  // console.log(router);
  // const urlID = router.query.product;

  return (
    <>
      <Head>
        <title>{props.product.title}</title>
        <meta type="description" content={props.product.description} />
        <meta type="image" content={props.product.image} />
      </Head>
      <div>
        <h1>Nom du produit: {props.product.title}</h1>
        <p>{props.product.price}</p>
        <p>{props.product.description}</p>
        <img src={props.product.image} alt={props.product.title} />
      </div>
    </>
  );
};

export default Product;

// pre render single product pages
export async function getStaticPaths() {
  const client = await MongoClient.connect(
    "mongodb+srv://circe:Datasolution75012@cluster0.czxgm.mongodb.net/products?retryWrites=true&w=majority"
  );
  const db = client.db();

  const productsCollection = db.collection("products");
  // récupérer les url dans un tableau
  const products = await productsCollection.find({}, { url: 1 }).toArray();

  client.close();

  return {
    fallback: false,
    paths: products.map((product) => ({
      params: {
        product: product.url,
      },
    })),
  };
}

export async function getStaticProps(context) {
  const productUrl = context.params.product;
  const client = await MongoClient.connect(
    "mongodb+srv://circe:Datasolution75012@cluster0.czxgm.mongodb.net/products?retryWrites=true&w=majority"
  );
  const db = client.db();

  const productsCollection = db.collection("products");
  const currentProduct = await productsCollection.findOne({ url: productUrl });

  client.close();

  return {
    props: {
      product: {
        title: currentProduct.title,
        url: currentProduct.url,
        description: currentProduct.description,
        image: currentProduct.image,
        price: currentProduct.price,
      },
    },
  };
}
