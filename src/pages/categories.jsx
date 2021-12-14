import { Spinner } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { client } from '../api';
import { CustomAlert, Dialog, InputField } from '../components';
import { CloseIcon, EditIcon, TrashIcon } from '../icons';
import { getAllCategories, selectCategories } from '../products/state';

const formView = {
  id: 0,
};

function Categories() {
  const dispatch = useDispatch();

  const categories = useSelector(selectCategories);

  const [formState, setFormState] = useState(formView);

  const [error, setError] = useState('');

  const updateFormValues = ({ target: { name, value } }, isNumeric = false) => {
    setFormState({ ...formState, [name]: isNumeric ? +value : value });
  };

  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    dispatch(getAllCategories());
  }, []);

  const handleSubmit = async () => {
    try {
      setError('');
      await client.put(`categories/${formState.id}`, formState);
      dispatch(getAllCategories());
      setIsModalOpen(false);
    } catch (e) {
      setError(e.message);
      return;
    }
  };

  const handleDelete = async (id) => {
    try {
      setError('');
      await client.delete(`categories/${id}`);
      dispatch(getAllCategories());
    } catch (e) {
      setError(e.message);
      return;
    }
  };

  return (
    <div className="bg-lightdarkblue h-full relative">
      {categories ? (
        <div className="grid grid-cols-12 gap-2 w-full px-2 p-2">
          {categories?.length > 0 ? (
            categories?.map((cat) => (
              <div
                key={cat.id}
                className="col-span-6 lg:col-span-3 xxl:col-span-2 bg-darkblue rounded p-4 text-lightblue flex flex-col"
              >
                <div className="flex justify-between items-center">
                  <div className="text-md flex-wrap">ID: {cat.id}</div>
                  <div className="rounded bg-blue text-darkblue font-bold px-2 py-1 text-xs flex items-center">
                    {cat.name}
                  </div>
                </div>

                <div className="border-b border-lightdarkblue my-2" />
                <div className="text-sm leading-tight flex-grow flex items-center">
                  {cat.description ?? 'Description not provided'}
                </div>
                <div className="border-b border-lightdarkblue my-2" />
                <div className="flex justify-between">
                  <div
                    className="cursor-pointer hover:bg-lightdarkblue transition-colors rounded p-1"
                    onClick={() => {
                      setFormState({
                        id: cat.id,
                        name: cat.name,
                        description: cat.description,
                      });
                      setIsModalOpen(true);
                    }}
                  >
                    <EditIcon className="w-5 h-5 text-mutedgreen " />
                  </div>
                  <div className="cursor-pointer hover:bg-lightdarkblue transition-colors rounded p-1">
                    <TrashIcon
                      className="w-5 h-5 text-red-500 "
                      onClick={() => handleDelete(cat.id)}
                    />
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-12 text-lightblue p-2">
              There are no products matching your criteria...
            </div>
          )}
        </div>
      ) : (
        <div className="flex items-center justify-center flex-grow h-full w-full">
          <Spinner thickness="4px" size="xl" className="text-brightgreen" />
        </div>
      )}
      <Dialog isOpen={isModalOpen}>
        <div className="w-96 bg-darkblue rounded text-lightblue p-4">
          <div className="flex justify-between">
            <div className="text-lg">Update category</div>
            <div className="hover:bg-lightdarkblue rounded p-1 cursor-pointer">
              <CloseIcon
                className="w-5 h-5"
                onClick={() => setIsModalOpen(false)}
              />
            </div>
          </div>
          {error && (
            <CustomAlert type="danger" message={error} className="mb-2" />
          )}
          <div className="border-b border-lightdarkblue my-2" />
          <div className="flex flex-col gap-2">
            <InputField
              label="Name"
              name="name"
              type="text"
              placeholder="Enter name"
              labelClassName="text-md"
              required
              onChange={(e) => updateFormValues(e)}
              value={formState.name}
            />
            <InputField
              label="Description"
              name="description"
              type="text"
              labelClassName="text-md"
              placeholder="Enter description"
              onChange={(e) => updateFormValues(e)}
              value={formState.description}
            />
            <button
              type="submit"
              className="rounded bg-blue text-darkblue font-bold py-2 mt-2 text-md transition-colors hover:bg-brightgreen disabled:bg-mutedgreen"
              onClick={handleSubmit}
            >
              Save
            </button>
          </div>
        </div>
      </Dialog>
    </div>
  );
}

export { Categories };
