export type User = {
  id: number;
  user_name: string;
};

export interface OpenState {
  openRegister: boolean;
  openLogin: boolean;
  user: User;
  loading: boolean;
  error: any;
}

export interface formState {
  openForm: boolean;
}

export interface formState2 {
  openEditForm: boolean;
}

export type logInput = {
  email: string;
  password: string;
};

export type regInput = {
  user_name: string;
  email: string;
  password: string;
};

export type fileUser = {
  id: number;
  title: string;
  file_size: string;
  file_link: string;
  userId: number;
  createdAt: Date | string;
  updatedAt: Date | string;
};

export type filesState = fileUser[];

export type OpenFilesState = {
  files: filesState;
  loading: boolean;
  error: any;
};
