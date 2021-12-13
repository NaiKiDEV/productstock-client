import { Spinner } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { client } from '../api';
import { CustomAlert, InputField, SelectField } from '../components';
import { CloseIcon, EditIcon, TrashIcon } from '../icons';
import { getAllUsers, selectUsers } from '../products/state';

const formView = {
  id: 0,
};

const Roles = [
  { id: 'Admin', name: 'Administrator' },
  { id: 'Warehouse', name: 'Warehouse' },
  { id: 'Basic', name: 'Basic' },
];

function Users() {
  const dispatch = useDispatch();

  const users = useSelector(selectUsers);

  const [formState, setFormState] = useState(formView);

  const [error, setError] = useState('');

  const updateFormValues = ({ target: { name, value } }, isNumeric = false) => {
    setFormState({ ...formState, [name]: isNumeric ? +value : value });
  };

  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    dispatch(getAllUsers());
  }, []);

  const handleSubmit = async () => {
    try {
      setError('');
      await client.put(`users/${formState.id}`, formState);
      dispatch(getAllUsers());
      setIsModalOpen(false);
    } catch (e) {
      setError(e.message);
      return;
    }
  };

  const handleDelete = async (id) => {
    try {
      setError('');
      await client.delete(`users/${id}`);
      dispatch(getAllUsers());
    } catch (e) {
      setError(e.message);
      return;
    }
  };

  console.log(isModalOpen);
  return (
    <div className="bg-lightdarkblue h-full relative">
      {users ? (
        <div className="grid grid-cols-12 gap-2 w-full px-2 p-2">
          {users?.length > 0 ? (
            users?.map((user) => (
              <div
                key={user.id}
                className="col-span-6 lg:col-span-3 xxl:col-span-2 bg-darkblue rounded p-4 text-lightblue flex flex-col"
              >
                <div className="flex justify-between items-center">
                  <div className="text-md flex-wrap">ID: {user.id}</div>
                  <div className="rounded bg-blue text-darkblue font-bold px-2 py-1 text-xs flex items-center">
                    {user.role}
                  </div>
                </div>
                <div className="border-b border-lightdarkblue my-2" />
                <div className="text-sm leading-tight flex-grow flex flex-col">
                  <div className="text-sm">Name:</div>
                  <div className="text-sm">{`${user.name} ${user.surname}`}</div>
                </div>
                <div className="border-b border-lightdarkblue my-2" />
                <div className="text-sm leading-tight flex-grow flex flex-col">
                  <div className="text-sm">Email:</div>
                  <div className="text-sm">{`${user.email}`}</div>
                </div>
                <div className="border-b border-lightdarkblue my-2" />
                <div className="flex justify-between">
                  <div
                    className="cursor-pointer hover:bg-lightdarkblue transition-colors rounded p-1"
                    onClick={() => {
                      setFormState({
                        id: user.id,
                        name: user.name,
                        surname: user.surname,
                        email: user.email,
                        role: user.role,
                      });
                      setIsModalOpen(true);
                    }}
                  >
                    <EditIcon className="w-5 h-5 text-mutedgreen " />
                  </div>
                  <div className="cursor-pointer hover:bg-lightdarkblue transition-colors rounded p-1">
                    <TrashIcon
                      className="w-5 h-5 text-red-500 "
                      onClick={() => handleDelete(user.id)}
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
      <div
        className={`absolute top-0 h-full w-full ${!isModalOpen && 'hidden'}`}
      >
        <div className="h-full w-full relative">
          <div className="bg-lighterdarkblue opacity-40 h-full w-full"></div>
          <div className="absolute top-0 left-0 flex justify-center items-center h-full w-full">
            <div className="w-96 bg-darkblue rounded text-lightblue p-4">
              <div className="flex justify-between">
                <div className="text-lg">Update useregory</div>
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
                  label="Surname"
                  name="surname"
                  type="text"
                  labelClassName="text-md"
                  placeholder="Enter surname"
                  onChange={(e) => updateFormValues(e)}
                  value={formState.surname}
                />
                <InputField
                  label="Email"
                  name="email"
                  type="text"
                  labelClassName="text-md"
                  placeholder="Enter email"
                  onChange={(e) => updateFormValues(e)}
                  value={formState.email}
                />
                <SelectField
                  label="Role"
                  name="role"
                  options={Roles}
                  onChange={(e) => updateFormValues(e)}
                  value={formState.role}
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
          </div>
        </div>
      </div>
    </div>
  );
}

export { Users };
