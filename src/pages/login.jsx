import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { authorize, selectAuth } from '../auth/state';
import { CustomAlert, InputField } from '../components/design';

const formView = {
  email: '',
  password: '',
};

function Login() {
  const { isAuthenticated, authError, authAvailable } = useSelector(selectAuth);

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const [formState, setFormState] = useState(formView);
  const [touchedState, setTouched] = useState(formView);

  const updateFormValues = ({ target: { name, value } }) => {
    setFormState({ ...formState, [name]: value });
    setTouched({ ...touchedState, [name]: true });
  };

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated]);

  const emailError =
    touchedState.email &&
    ((!formState.email && 'Email must not be empty') ||
      (!formState.email.match(
        /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/
      ) &&
        'Email is invalid'));

  const passwordError =
    touchedState.password &&
    !formState.password &&
    'Password must not be empty';

  return (
    <div className="bg-lightdarkblue h-full flex items-center justify-center">
      <div className="p-5 flex flex-col text-lightblue bg-darkblue rounded m-4 shadow md:w-96">
        <div className="text-3xl">Sign in</div>
        <div className="text-sm pb-2">
          Please enter your details below to proceed
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
        <div className="flex flex-col gap-3 pb-5">
          <InputField
            label="Email"
            name="email"
            type="email"
            placeholder="Enter your email"
            onChange={(e) => updateFormValues(e)}
            value={formState.email}
            error={emailError}
          />
          <InputField
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
