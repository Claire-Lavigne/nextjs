import { useRef } from 'react';

const NewProductForm = (props) => {
  const titleInputRef = useRef();
  const urlInputRef = useRef();
  const descriptionInputRef = useRef();
  const imageInputRef = useRef();
  const priceInputRef = useRef();


  const submitHandler = (event) => {
    event.preventDefault();

    const productData = {
      title: titleInputRef.current.value,
      url: urlInputRef.current.value,
      image: imageInputRef.current.value,
      description: descriptionInputRef.current.value,
      price: priceInputRef.current.value
    };

    props.onAddProduct(productData);
  }

  return (
      <form onSubmit={submitHandler}>
        <div>
          <label htmlFor='title'>Product Title</label>
          <input type='text' required id='title' ref={titleInputRef} />
        </div>
        <div>
          <label htmlFor='url'>Product URL</label>
          <input type='text' required id='url' ref={urlInputRef} />
        </div>
        <div>
          <label htmlFor='image'>Product Image</label>
          <input type='url' required id='image' ref={imageInputRef} />
        </div>
        <div>
          <label htmlFor='description'>Description</label>
          <textarea
            id='description'
            required
            rows='5'
            ref={descriptionInputRef}
          />
        </div>
        <div>
          <label htmlFor='price'>Price</label>
          <input type='text' required id='price' ref={priceInputRef} />
        </div>
        <div>
          <button>Add product</button>
        </div>
      </form>
  );
}

export default NewProductForm;