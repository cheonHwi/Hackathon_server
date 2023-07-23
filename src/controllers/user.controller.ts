import { userRepository } from "../repository";

// export const save = (): Promise<object> => {
//   return new Promise(async (resolve, reject) => {
//     const user = await userRepository.save({ id: "ryuwoong" });
//     resolve(user);
//   });
// };

export const save = async () => {
  const user = await userRepository.save({ id: "ryuwoong" }).then((res) => {
    // console.log(res);
    return res;
  });
  return user;
};
