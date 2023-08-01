import { userRepository } from "../repository";

export const userDataSave = async (
  id: number,
  name: string,
  email: string,
  picture: string
) => {
  const saved_user = await userRepository
    .save({ id, name, email, picture })
    .then((res) => {
      return res;
    })
    .catch((err) => {
      throw err;
    });
  return saved_user;
};

export const allUserFind = async () => {
  const any_userData = await userRepository
    .find({})
    .then((res) => {
      return res;
    })
    .catch((err) => {
      throw err;
    });

  return any_userData;
};
