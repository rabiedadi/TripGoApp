export interface User {
  fullName: string;
  email: string;
  phone: string | null;
  image: string | null;
  emailConfirmed: boolean;
}
