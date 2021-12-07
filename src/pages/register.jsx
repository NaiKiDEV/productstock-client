import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import { client } from '../api';
import { displayLoginAlert, selectAuth } from '../auth';
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
  const [touchedState, setTouched] = useState(formView);
  const [registerError, setRegisterError] = useState();

  const { authAvailable } = useSelector(selectAuth);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const emailError =
    touchedState.email &&
    ((!formState.email && 'Email must not be empty') ||
      (!formState.email.match(
        /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/
      ) &&
        'Email is invalid'));

  const nameEmpty =
    touchedState.name && !formState.name && 'Name must not be empty';

  const surnameEmpty =
    touchedState.surname && !formState.surname && 'Surname must not be empty';

  const passwordNotMatched =
    touchedState.password &&
    touchedState.passwordrepeat &&
    formState.password !== formState.passwordrepeat &&
    'Passwords do not match';

  const anyErrors =
    emailError || nameEmpty || surnameEmpty || passwordNotMatched;

  const updateFormValues = ({ target: { name, value } }) => {
    setFormState({ ...formState, [name]: value });
    setTouched({ ...touchedState, [name]: true });
  };

  const register = async () => {
    const { name, surname, email, password } = formState;
    try {
      setRegisterError('');
      await client.post('users/register', { name, surname, email, password });
      dispatch(displayLoginAlert());
    } catch (e) {
      setRegisterError(
        e?.message ||
          'There was an issue trying to register your account, try again'
      );
    }
  };

  useEffect(() => {
    if (authAvailable) {
      navigate('/login');
    }
  }, [authAvailable]);

  return (
    <div className="bg-lightdarkblue h-full flex items-center justify-center">
      <div className="p-5 flex flex-col text-lightblue bg-darkblue rounded m-4 sm:w-3/4 shadow lg:w-1/2 xl:w-1/3">
        <div className="text-3xl">Join Us!</div>
        <div className="text-sm pb-2 leading-none">
          Please enter your details below to proceed with account registration,
          once confirmed you will able to create new listings and list your
          products.
        </div>
        {/* <CustomAlert
          type="success"
          message="User with given email already exists"
          className=""
        /> */}
        {registerError && (
          <CustomAlert type="danger" message={registerError} className="" />
        )}

        <div className="flex flex-col gap-3 pb-5">
          <InputFeld
            label="Name"
            name="name"
            type="text"
            placeholder="Enter your name"
            onChange={(e) => updateFormValues(e)}
            value={formState.name}
            error={nameEmpty}
            required
          />
          <InputFeld
            label="Surname"
            name="surname"
            type="text"
            placeholder="Enter your surname"
            onChange={(e) => updateFormValues(e)}
            value={formState.surname}
            error={surnameEmpty}
            required
          />
          <InputFeld
            label="Email"
            name="email"
            type="email"
            placeholder="Enter your email"
            onChange={(e) => updateFormValues(e)}
            value={formState.email}
            error={emailError}
            required
          />
          <InputFeld
            label="Password"
            name="password"
            type="password"
            value={formState.password}
            onChange={(e) => updateFormValues(e)}
            placeholder="Enter your password"
            required
          />
          <InputFeld
            label="Repeat Password"
            name="passwordrepeat"
            type="password"
            value={formState.passwordrepeat}
            onChange={(e) => updateFormValues(e)}
            placeholder="Repeat your password"
            error={passwordNotMatched}
            required
          />
        </div>
        <button
          type="button"
          className="rounded bg-blue text-darkblue font-bold py-2 text-md transition-colors hover:bg-brightgreen disabled:bg-mutedgreen"
          disabled={anyErrors}
          onClick={register}
        >
          Register
        </button>
      </div>
    </div>
  );
}

export { Register };
