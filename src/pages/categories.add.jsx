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
};

function CategoryAdd() {
  const { isAuthenticated, authError, authAvailable } = useSelector(selectAuth);

  const categories = useSelector(selectCategories);

  const dispatch = useDispatch();

  const [formState, setFormState] = useState(formView);
  const [touchedState, setTouched] = useState(formView);

  const [error, setError] = useState('');

  const updateFormValues = ({ target: { name, value } }, isNumeric = false) => {
    setFormState({ ...formState, [name]: isNumeric ? +value : value });
    setTouched({ ...touchedState, [name]: true });
  };

  const handleSubmit = async () => {
    try {
      setError('');
      await client.post('categories', formState);
      setFormState(formView);
      setTouched(formView);
    } catch (e) {
      setError(e.message);
      return;
    }
  };

  return (
    <div className="bg-lightdarkblue h-full flex items-center justify-center">
      <div className="p-5 flex flex-col w-full md:w-auto text-lightblue bg-darkblue rounded m-4 shadow">
        <div className="text-3xl">Add category</div>
        <div className="text-sm pb-2">
          Please enter product details below to create a category
        </div>
        {error && (
          <CustomAlert type="danger" message={error} className="mb-2" />
        )}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pb-5">
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

export { CategoryAdd };
