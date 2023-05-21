import React, { useState } from 'react';
import { Box, Text } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Formik, Form } from 'formik';

import { history } from '../../../constants/history';
import { InputForm } from './InputForm';
import { BtnLoading } from '../../../components/Buttons/BtnLoading';
import { BtnSubmit } from '../../../components/Buttons/BtnSubmit';
import { IFormikError } from '../store/types';
import { LoginDto } from '../../../api/types';
import { apiService } from '../../../api/ApiService';
import { login } from '../store/user-slice';
import { authSelector } from '../../../store/selectors';

export const LoginForm = () => {
  if (useSelector(authSelector)) {
    history.push('/');
  }

  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);

  const loginHandler = async (dto: LoginDto, { setFieldError }: IFormikError) => {
    setLoading(true);

    try {
      const { data, error } = await apiService.login(dto);

      if (error) {
        throw new Error(error);
      }

      if (!data?.accessToken) {
        throw new Error('Something went wrong');
      }

      apiService.setAccessToken(data.accessToken);

      const { data: user } = await apiService.getUser();

      if (!user?.id) {
        throw new Error('Something went wrong');
      }

      dispatch(login(user));
    } catch (error: any) {
      setFieldError('password', error.message);
    }

    setLoading(false);
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
      <Formik
        initialValues={{
          email: '',
          password: '',
        }}
        onSubmit={loginHandler}
      >
        {() => (
          <Form className="formic-form">
            <InputForm name="email" type="email" placeholder="Email" />
            <InputForm name="password" type="password" placeholder="Password" />
            {loading ? <BtnLoading /> : <BtnSubmit text="Login" />}
          </Form>
        )}
      </Formik>
      <Box margin="1rem" display="flex" flexDirection="column" alignItems="flex-end">
        <Text color="gray.500">Don`t have an account?</Text>
        <Link to="/signup">
          <Text fontSize="16px" color="#6486ff">
            Sing Up
          </Text>
        </Link>
      </Box>
    </Box>
  );
};
