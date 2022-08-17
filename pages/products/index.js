import Link from "next/link";
import { MongoClient } from "mongodb";

const DUMP_PRODUCTS = [
  {
    name: "Monstera Deliciosa",

    url: "monstera-deliciosa",

    description: "Such a lovely plant !",

    image:
      "https://cdn.shopify.com/s/files/1/0004/2654/1108/products/LIVRAISON_PLANTE_GRANDE_MONSTERA_DELICIOSA_2_360x.jpg?v=1622459168",

    price: "24,50",
  },

  {
    name: "Calathea White",

    url: "calathea-white",

    description: "Such an adoable plant !",

    image:
      "https://cdn.shopify.com/s/files/1/0004/2654/1108/products/LIVRAISONPLANTECALATHEAWHITESTAR_220a7209-ea12-446c-94d7-bda9bdcab422_360x.jpg?v=1620981308",

    price: "28,90",
  },

  {
    name: "Anthurium",

    url: "anthurium",

    description: "So small, so lovely",

    image:
      "https://cdn.shopify.com/s/files/1/0004/2654/1108/products/LIVRAISONPLANTEANTHURIUMCLARINERVIUM_280x.jpg?v=1617831027",

    price: "12,20",
  },
];

const Products = (props) => {
  return (
    <div>
      Products
      <ul>
        <li></li>
      </ul>
      <ul>
        {props?.products &&
          props.products.map((product, index) => (
            <li key={index}>
              <Link href={`/products/${product.url}`} title={product.title}>
                <a>
                  Nom: {product.title}
                  <img src={product.image} alt={product.name} />
                </a>
              </Link>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default Products;

export async function getStaticProps() {
  const client = await MongoClient.connect(
    "mongodb+srv://circe:Datasolution75012@cluster0.czxgm.mongodb.net/products?retryWrites=true&w=majority"
  );
  const db = client.db();

  const productsCollection = db.collection("products");
  const products = await productsCollection.find().toArray();

  client.close();

  return {
    props: {
      // products: DUMP_PRODUCTS,
      products: products.map((product) => ({
        title: product.title,
        url: product.url,
        description: product.description,
        image: product.image,
        price: product.price,
        id: product._id.toString(),
      })),
    },
  };
}
