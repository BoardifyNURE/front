import React from 'react';
import { FormControl, Input, FormErrorMessage } from '@chakra-ui/react';
import { useField } from 'formik';

import { IInput } from '../store/types';

export const InputForm = ({ ...props }: IInput) => {
  const [field, meta] = useField(props);

  return (
    <FormControl w="72%" isInvalid={Boolean(meta.touched && meta.error)}>
      <Input {...field} {...props} h="2.6rem" bg="white" marginTop="2" />
      {meta.touched && meta.error && <FormErrorMessage>{meta.error}</FormErrorMessage>}
    </FormControl>
  );
};
