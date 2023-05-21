import React, { useState } from 'react';
import { Box, Text } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Formik } from 'formik';

import '../../../styles/styles.scss';

import { history } from '../../../constants/history';
import { IFormikError } from '../store/types';
import { BtnSubmit } from '../../../components/Buttons/BtnSubmit';
import { BtnLoading } from '../../../components/Buttons/BtnLoading';
import { InputForm } from './InputForm';
import { apiService } from '../../../api/ApiService';
import { SignUpDto } from '../../../api/types';
import { authSelector } from '../../../store/selectors';

export const SignUpForm = () => {
  if (useSelector(authSelector)) {
    history.push('/');
  }

  const [loading, setLoading] = useState(false);

  const signUpUser = async (
    dto: SignUpDto & { confirmPassword: string },
    { setFieldError }: IFormikError
  ) => {
    setLoading(true);

    try {
      if (dto.password !== dto.confirmPassword) {
        throw new Error("Passwords don't match");
      }

      const { data, error } = await apiService.signUp(dto);

      if (error) {
        throw new Error(error);
      }

      if (!data?.id) {
        throw new Error('Something went wrong');
      }

      apiService.setAccessToken(data.id);

      history.push('/login');
    } catch (error: any) {
      setFieldError('confirmPassword', error.message);
    }

    setLoading(false);
  };
  return (
    <Box display="flex" flexDirection="column" w="28rem" h="23rem" bg="#dbdbdb60" borderRadius="xl">
      <Text
        alignSelf="center"
        fontFamily="Rokkitt"
        fontStyle="normal"
        fontWeight="normal"
        fontSize="48px"
        lineHeight="55px"
        marginTop="1rem"
      >
        SIGN UP
      </Text>
      <hr />
      <Formik
        initialValues={{
          firstName: '',
          lastName: '',
          email: '',
          username: '',
          password: '',
          confirmPassword: '',
        }}
        onSubmit={signUpUser}
      >
        {() => (
          <Form className="formic-form">
            <InputForm name="firstName" type="text" placeholder="First name" />
            <InputForm name="lastName" type="text" placeholder="Last name" />
            <InputForm name="email" type="email" placeholder="Email" />
            <InputForm name="username" type="test" placeholder="Username" />
            <InputForm name="password" type="password" placeholder="Password" />
            <InputForm name="confirmPassword" type="password" placeholder="Confirm password" />
            {loading ? <BtnLoading /> : <BtnSubmit text="Sign Up" />}
          </Form>
        )}
      </Formik>
      <Box margin="1rem" display="flex" flexDirection="column" alignItems="flex-end">
        <Text color="gray.500">Alreaddy have an account?</Text>
        <Link to="/login">
          <Text fontSize="16px" color="#6486ff">
            Login
          </Text>
        </Link>
      </Box>
    </Box>
  );
};
