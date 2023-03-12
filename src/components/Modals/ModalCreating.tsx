import React from 'react';
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  AlertDialogCloseButton,
} from '@chakra-ui/react';
import { Formik, Form, FormikValues, FormikHelpers } from 'formik';
import { BtnSubmit } from '@reuse_button/BtnSubmit';
import { InputForm } from '@auth/components/InputForm';

interface IProps {
  isOpen: boolean;
  onClose: () => void;
  cancelRef: any;
  modalHeader?: string;
  initialValues: FormikValues;
  formSubmit: <t>(values: t, formikHelpers?: FormikHelpers<t>) => void | Promise<any>;
  placeholder: string;
  inputName: string;
}

const defaultProps = {
  modalHeader: '',
};

export const ModalCreating = ({
  isOpen,
  onClose,
  modalHeader,
  initialValues,
  formSubmit,
  placeholder,
  inputName,
  cancelRef,
}: IProps) => (
  <AlertDialog
    motionPreset="slideInBottom"
    leastDestructiveRef={cancelRef}
    onClose={onClose}
    isOpen={isOpen}
    isCentered
    closeOnOverlayClick={false}
    size="sm"
  >
    <AlertDialogOverlay />

    <AlertDialogContent>
      <AlertDialogHeader fontFamily="Rokkitt" textAlign="center">
        {modalHeader}
      </AlertDialogHeader>
      <AlertDialogCloseButton />
      <AlertDialogBody>
        <Formik initialValues={initialValues} onSubmit={formSubmit}>
          <Form className="formic-form">
            <InputForm name={inputName} type="text" placeholder={placeholder} />
            <BtnSubmit text="Create" />
          </Form>
        </Formik>
      </AlertDialogBody>
    </AlertDialogContent>
  </AlertDialog>
);

ModalCreating.defaultProps = defaultProps;
