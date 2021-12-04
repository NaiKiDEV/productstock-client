import React, { useState } from 'react';
import { CustomAlert, InputFeld } from '../components/design';

const formView = {
  name: '',
  surname: '',
  email: '',
  password: '',
  passwordrepeat: '',
};

function Register() {
  const [formState, setFormState] = useState(formView);

  const updateFormValues = ({ target }) => {
    setFormState({ ...formState, [target.name]: target.value });
  };

  const emailInvalid =
    !formState.email ||
    !formState.email.match(/^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/);

  return (
    <div className="bg-lightdarkblue h-full flex items-center justify-center">
      <div className="p-5 flex flex-col text-lightblue bg-darkblue rounded m-4 sm:w-3/4 lg:w-1/2 xl:w-1/3">
        <div className="text-3xl">Join Us!</div>
        <div className="text-sm pb-2 leading-none">
          Please enter your details below to proceed with account registration,
          once confirmed you will able to create new listings and list your
          products.
        </div>
        {emailInvalid && (
          <CustomAlert
            type="danger"
            message="Given email is not valid"
            className="mb-2"
          />
        )}
        <div className="flex flex-col gap-3 pb-5">
          <InputFeld
            label="Name"
            name="name"
            type="text"
            placeholder="Enter your name"
            onChange={(e) => updateFormValues(e)}
            value={formState.name}
          />
          <InputFeld
            label="Surname"
            name="surname"
            type="text"
            placeholder="Enter your surname"
            onChange={(e) => updateFormValues(e)}
            value={formState.surname}
          />
          <InputFeld
            label="Email"
            name="email"
            type="email"
            placeholder="Enter your email"
            onChange={(e) => updateFormValues(e)}
            value={formState.email}
          />
          <InputFeld
            label="Password"
            name="password"
            type="password"
            value={formState.password}
            placeholder="Enter your password"
          />
          <InputFeld
            label="Repeat Password"
            name="passwordrepeat"
            type="password"
            value={formState.passwordrepeat}
            placeholder="Repeat your password"
          />
        </div>
        <button
          type="button"
          className="rounded bg-blue text-darkblue font-bold py-2 text-md transition-colors hover:bg-brightgreen disabled:bg-black"
          disabled={emailInvalid}
        >
          Register
        </button>
      </div>
    </div>
  );
}

export { Register };
