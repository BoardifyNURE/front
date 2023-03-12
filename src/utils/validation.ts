import * as Yup from 'yup';

export const SIGN_VALUES = {
  email: '',
  password: '',
  passwordConfirm: '',
};

export const SIGN_VALIDATION = Yup.object().shape({
  email: Yup.string().email('Enter valid email').required('Required field'),
  password: Yup.string()
    .required('Required field')
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,}$/,
      'The minimum length is 6 symbols. Must contain 1 uppercase, 1 small and 1 digit.'
    ),
  passwordConfirm: Yup.string().oneOf([Yup.ref('password'), null], 'Passwords must match'),
});

export const LOGIN_VALUES = {
  email: '',
  password: '',
};

export const CREATEBOARD_VALUES = {
  boardName: '',
};

export const CREATECOLUMN_VALUES = {
  columnName: '',
};

export const CREATETASK_VALUES = {
  taskName: '',
};

export const CREATECHECKLIST_VALUES = {
  checklistName: '',
};

export const CREATETODO_VALUES = {
  todoName: '',
};

export const USERDATA_VALUES = {
  fullName: '',
};
