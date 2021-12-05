import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { client, getToken, setToken } from '../api';
import { authorize, selectAuth } from '../auth/state';
import { CustomAlert, InputFeld } from '../components/design';

const formView = {
  email: '',
  password: '',
};

function Login() {
  const { isAuthenticated, authError } = useSelector(selectAuth);

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const [formState, setFormState] = useState(formView);

  const updateFormValues = ({ target }) => {
    setFormState({ ...formState, [target.name]: target.value });
  };

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/', { replace: true });
    }
  }, [isAuthenticated]);

  const emailError =
    (!formState.email ||
      !formState.email.match(
        /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/
      )) &&
    'Email is invalid';

  const passwordError = !formState.password && 'Password must not be empty';

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
            error={passwordError}
          />
        </div>
        <button
          type="submit"
          className="rounded bg-blue text-darkblue font-bold py-2 text-md transition-colors hover:bg-brightgreen disabled:bg-mutedgreen"
          disabled={emailError || passwordError}
          onClick={() => dispatch(authorize(formState))}
        >
          Sign in
        </button>
      </div>
    </div>
  );
}

export { Login };
