import React from 'react';
import { Box, Text } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Formik } from 'formik';

import '../../../styles/styles.scss';

import { SIGN_VALUES, SIGN_VALIDATION } from '../../../utils/validation';
import { IUserProps, IFormikError } from '../store/types';
import { BtnSubmit } from '../../../components/Buttons/BtnSubmit';
import { BtnLoading } from '../../../components/Buttons/BtnLoading';
import { loadingSelector } from '../../../store/selectors';
import { signupUser } from '../store/user-slice';
import { InputForm } from './InputForm';

export const SingUpForm = () => {
  const dispatch = useDispatch();
  const isLoading = useSelector(loadingSelector);

  const registerUser = (data: IUserProps, { setFieldError }: IFormikError) => {
    dispatch(signupUser({ ...data, setFieldError }));
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
        initialValues={SIGN_VALUES}
        validationSchema={SIGN_VALIDATION}
        onSubmit={registerUser}
      >
        {() => (
          <Form className="formic-form">
            <InputForm name="email" type="email" placeholder="Email" />
            <InputForm name="fullName" type="text" placeholder="Name" />
            <InputForm name="password" type="password" placeholder="Password" />
            <InputForm name="passwordConfirm" type="password" placeholder="Confirm password" />
            {isLoading ? <BtnLoading /> : <BtnSubmit text="Sing Up" />}
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
