import { userRepository } from "../repository";

export const userDataSave = async (username: string) => {
  const saved_user = await userRepository
    .save({ id: username })
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
