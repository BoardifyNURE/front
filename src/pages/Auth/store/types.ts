export interface IUserProps {
  email: string;
  fullName?: string;
  password: string;
  passwordConfirm?: string;
}

export interface IInput {
  name: string;
  type: string;
  placeholder: string;
}

export interface IFormikError {
  setFieldError: (field: string, message: string | undefined) => void;
}

export interface IUserState {
  id?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  username?: string;
}

export interface IAuth {
  accessToken: string;
  user: {
    email: string;
    fullName: string;
    followers: number[];
    following: number[];
    friends: number[];
    avatar: string;
    bio: string;
    id: string;
  };
}

export interface ISignUpProps extends IFormikError, IUserProps {
  passwordConfirm?: string;
}
export interface ILoginProps extends IFormikError {
  email: string;
  password: string;
}
