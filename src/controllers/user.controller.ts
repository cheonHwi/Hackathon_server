import { userRepository } from "../repository";

export const userDataSave = async (
  id: string,
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

export const findOneUser = async (id: string) => {
  const any_userData = await userRepository
    .findOne({ where: { id } })
    .then((res) => {
      return res;
    })
    .catch((err) => {
      throw err;
    });

  return any_userData;
};
