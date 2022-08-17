import NewProductForm from "../../components/forms/NewProductForm";

const New = (props) => {
  const addNewProduct = async (data) => {
    console.log(data);

    const response = await fetch("/api/new-product", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const responseData = await response.json();
    console.log(responseData);
  };

  return (
    <div>
      <h1>Ajouter un nouveau produit</h1>
      <NewProductForm onAddProduct={addNewProduct} />
    </div>
  );
};

export default New;
