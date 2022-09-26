import { useState } from 'react';
import {
  signInWithGooglePopup,
  createUserDocumentFromAuth,
  signInAuthUserWithEmailAndPassword,
} from '../../utils/firebase/firebase.util';
import FormInput from '../form-input/form-input.component';
import Button, { BUTTON_TYPE_CLASSES } from '../button/button.component';
import {
  SignInContainer,
  Header,
  ButtonsContainer,
} from './sign-in-form.styles';

const defaultFormFields = {
  email: '',
  password: '',
};

const SignInForm = () => {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { email, password } = formFields;

  const resetFormFields = () => {
    setFormFields(defaultFormFields);
  };

  const signInWithGoogle = async () => {
    await signInWithGooglePopup();
  };

  const handleSubmit = async e => {
    e.preventDefault();

    try {
      const { user } = await signInAuthUserWithEmailAndPassword(
        email,
        password
      );

      resetFormFields();
    } catch (error) {
      if (error.message === 'auth/wrong-password' || 'auth/user-not-found')
        alert('Incorrect email or password');
      console.log(error.code);
    }
  };

  const handleChange = e => {
    e.preventDefault();
    const { name, value } = e.target;
    setFormFields({ ...formFields, [name]: value });
  };

  return (
    <SignInContainer>
      <Header>I already have an account</Header>
      <span>Sign in with your email and password</span>
      <form onSubmit={handleSubmit}>
        <FormInput
          label='Email'
          inputOptions={{
            type: 'email',
            required: true,
            onChange: handleChange,
            name: 'email',
            value: email,
          }}
        />

        <FormInput
          label='Password'
          inputOptions={{
            type: 'password',
            required: true,
            onChange: handleChange,
            name: 'password',
            value: password,
          }}
        />

        <ButtonsContainer>
          <Button butttonType={BUTTON_TYPE_CLASSES.base} type='submit'>
            Sign In
          </Button>
          <Button
            buttonType={BUTTON_TYPE_CLASSES.google}
            type='button'
            onClick={signInWithGoogle}
          >
            Google Sign In
          </Button>
        </ButtonsContainer>
      </form>
    </SignInContainer>
  );
};

export default SignInForm;
