import bcrypt from "bcryptjs";

type HashArgs = {
  password: string;
};

export const hash = async ({ password }: HashArgs) => {
  return await bcrypt.hash(password, 10);
};

type VerifyArgs = {
  hash: string;
  password: string;
};

export const verify = async ({ hash, password }: VerifyArgs) => {
  return await bcrypt.compare(password, hash);
};
