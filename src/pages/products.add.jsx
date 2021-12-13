import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { client } from '../api';
import { authorize, selectAuth } from '../auth/state';
import { CustomAlert, InputField, SelectField } from '../components/design';
import { getAllCategories, selectCategories } from '../products/state';

const formView = {
  name: '',
  description: '',
  quantity: 0,
  price: 0,
  imageUrl: '',
  categoryId: 1,
  universalCode: '',
};

function ProductAdd() {
  const { isAuthenticated, authError, authAvailable } = useSelector(selectAuth);

  const categories = useSelector(selectCategories);

  const dispatch = useDispatch();

  const [formState, setFormState] = useState(formView);
  const [touchedState, setTouched] = useState(formView);

  const updateFormValues = ({ target: { name, value } }, isNumeric = false) => {
    setFormState({ ...formState, [name]: isNumeric ? +value : value });
    setTouched({ ...touchedState, [name]: true });
  };

  useEffect(() => {
    dispatch(getAllCategories());
  }, []);

  const handleSubmit = async () => {
    try {
      await client.post('products', formState);
      setFormState(formView);
      setTouchedState(formView);
    } catch {
      return;
    }
  };

  return (
    <div className="bg-lightdarkblue h-full flex items-center justify-center">
      <div className="p-5 flex flex-col w-full md:w-auto text-lightblue bg-darkblue rounded m-4 shadow">
        <div className="text-3xl">Add product</div>
        <div className="text-sm pb-2">
          Please enter product details below to create a product
        </div>
        {authAvailable && (
          <CustomAlert
            type="success"
            message="You can login to your account"
            className="mb-2"
          />
        )}
        {authError && (
          <CustomAlert type="danger" message={authError} className="mb-2" />
        )}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 pb-5">
          <InputField
            label="Universal Code"
            name="universalCode"
            type="text"
            placeholder="Enter Code"
            required
            onChange={(e) => updateFormValues(e)}
            value={formState.universalCode}
          />
          <InputField
            label="Name"
            name="name"
            type="text"
            placeholder="Enter name"
            required
            onChange={(e) => updateFormValues(e)}
            value={formState.name}
          />
          <InputField
            label="Description"
            name="description"
            type="text"
            placeholder="Enter description"
            onChange={(e) => updateFormValues(e)}
            value={formState.description}
          />
          <InputField
            label="Quantity"
            name="quantity"
            type="number"
            required
            placeholder="0"
            onChange={(e) => updateFormValues(e, true)}
            value={formState.quantity}
          />
          <InputField
            label="Price"
            name="price"
            type="number"
            placeholder="0.00"
            required
            onChange={(e) => updateFormValues(e, true)}
            value={formState.price}
          />
          <InputField
            label="Image URL"
            name="imageUrl"
            type="text"
            placeholder="https://link.to.image.com"
            onChange={(e) => updateFormValues(e)}
            value={formState.imageUrl}
            required
          />
          <SelectField
            label="Category"
            name="categoryId"
            type="select"
            options={categories}
            onChange={(e) => updateFormValues(e, true)}
            value={formState.categoryId}
          />
        </div>
        <button
          type="submit"
          className="rounded bg-blue text-darkblue font-bold py-2 text-md transition-colors hover:bg-brightgreen disabled:bg-mutedgreen"
          onClick={handleSubmit}
        >
          Add product
        </button>
      </div>
    </div>
  );
}

export { ProductAdd };
