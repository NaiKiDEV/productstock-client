import React, { useState } from 'react';
import { client, setToken } from '../api';
import { CustomAlert, InputFeld } from '../components/design';

const formView = {
  email: '',
  password: '',
};

function Login() {
  const [formState, setFormState] = useState(formView);

  const [authError, setAuthError] = useState('');

  const updateFormValues = ({ target }) => {
    setFormState({ ...formState, [target.name]: target.value });
  };

  const handleSignInSubmit = async () => {
    try {
      setAuthError('');
      const { data } = await client.post('auth', formState);
      setToken(data);
    } catch (error) {
      if (error.response.status === 401) {
        setAuthError(error.response.data.message);
      }
    }
  };

  const emailError =
    (!formState.email ||
      !formState.email.match(
        /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/
      )) &&
    'Email is invalid';

  return (
    <div className="bg-lightdarkblue h-full flex items-center justify-center">
      <div className="p-5 flex flex-col text-lightblue bg-darkblue rounded m-4 md:w-96">
        <div className="text-3xl">Sign in</div>
        <div className="text-sm pb-2">
          Please enter your details below to proceed
        </div>
        {authError && (
          <CustomAlert type="danger" message={authError} className="mb-2" />
        )}

        <div className="flex flex-col gap-3 pb-5">
          <InputFeld
            label="Email"
            name="email"
            type="email"
            placeholder="Enter your email"
            onChange={(e) => updateFormValues(e)}
            value={formState.email}
            error={emailError}
          />
          <InputFeld
            label="Password"
            name="password"
            type="password"
            placeholder="Enter your password"
            onChange={(e) => updateFormValues(e)}
            value={formState.password}
          />
        </div>
        <button
          type="button"
          className="rounded bg-blue text-darkblue font-bold py-2 text-md transition-colors hover:bg-brightgreen disabled:bg-black"
          onClick={handleSignInSubmit}
        >
          Sign in
        </button>
      </div>
    </div>
  );
}

export { Login };
