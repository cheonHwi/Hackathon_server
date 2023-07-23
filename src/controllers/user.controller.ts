import { userRepository } from "../repository";

// export const save = (): Promise<object> => {
//   return new Promise(async (resolve, reject) => {
//     const user = await userRepository.save({ id: "ryuwoong" });
//     resolve(user);
//   });
// };

export const save = async (username: string) => {
  const user = await userRepository
    .save({ id: username })
    .then((res) => {
      return res;
    })
    .catch((err) => {
      throw err;
    });
  return user;
};
