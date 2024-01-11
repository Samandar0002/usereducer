export interface User {
    id: number;
  name: string;
  username: string;
  email: string;
  address: {
    city: string;
    zipcode: string;
  };
  website: string;
  company: {
    name: string;
  };
}
  
export interface TableState {
    users: User[];
    loading: boolean;
    error: string | null;
}
  
export interface TableAction {
    type: 'SET_USERS' | 'SET_LOADING' | 'SET_ERROR';
  payload?: User[] | boolean | string;
}
  