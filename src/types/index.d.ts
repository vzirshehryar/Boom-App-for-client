type CustomResponse = {
  msg: string;
};
type RegisterBody = {
  email: string;
  password: string;
  website?: string;
  company?: string;
};