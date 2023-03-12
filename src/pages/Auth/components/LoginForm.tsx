import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '@auth/store/user-slice';
import { Box, Text } from '@chakra-ui/react';
import { Formik, Form } from 'formik';
import { LOGIN_VALUES } from '@utils/validation';
import { BtnSubmit } from '@reuse_button/BtnSubmit';
import { IUserProps, IFormikError } from '@auth/store/types';
import { loadingSelector } from '@store/selectors';
import { BtnLoading } from '@components/Buttons/BtnLoading';
import { InputForm } from './InputForm';

export const LoginForm = () => {
  const dispatch = useDispatch();
  const isLoading = useSelector(loadingSelector);

  const loginUserHandler = (data: IUserProps, { setFieldError }: IFormikError) => {
    dispatch(loginUser({ ...data, setFieldError }));
  };

  return (
    <Box display="flex" flexDirection="column" w="28rem" h="23rem" bg="#dbdbdb60" borderRadius="xl">
      <Text
        alignSelf="center"
        fontFamily="Rokkitt"
        fontSize="48px"
        lineHeight="55px"
        marginTop="1rem"
      >
        TRELLO
      </Text>
      <hr />
      <Formik initialValues={LOGIN_VALUES} onSubmit={loginUserHandler}>
        {() => (
          <Form className="formic-form">
            <InputForm name="email" type="email" placeholder="Email" />
            <InputForm name="password" type="password" placeholder="Password" />
            {isLoading ? <BtnLoading /> : <BtnSubmit text="Login" />}
          </Form>
        )}
      </Formik>
      <Box margin="1rem" display="flex" flexDirection="column" alignItems="flex-end">
        <Text color="gray.500">don`t have account?</Text>
        <Link to="/singup">
          <Text fontSize="16px" color="#6486ff">
            Sing Up
          </Text>
        </Link>
      </Box>
    </Box>
  );
};