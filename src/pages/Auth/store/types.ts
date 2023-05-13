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
  token: string | null;
  isLogin: boolean;
  isLoading: boolean;
  ownerId: string | null;
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

export interface ISingUpProps extends IFormikError, IUserProps {
  passwordConfirm?: string;
}
export interface ILoginProps extends IFormikError {
  email: string;
  password: string;
}
