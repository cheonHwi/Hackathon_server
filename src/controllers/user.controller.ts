import { userRepository } from "../repository";

export const userDataSave = async (
  id: string,
  name: string,
  affiliation?: string,
  army_unit?: string,
  enlistment_date?: string
) => {
  const saved_user = await userRepository
    .save({ id, name, affiliation, army_unit, enlistment_date })
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

export const userDataUpdate = async (id: string, { ...body }) => {
  const { affiliation, army_unit, enlistment_date } = body;
  try {
    await userRepository
      .update(id, {
        affiliation,
        army_unit,
        enlistment_date,
        is_verified: true,
      })
      .then((res) => {
        return res;
      })
      .catch((err) => {
        throw err;
      });
  } catch (err) {
    throw err;
  }
};

export const findOneUser = async (id: string) => {
  const any_userData = await userRepository
    .findOne({ where: { id } })
    .then((res) => {
      if (!res) return null;
      return { ...res };
    })
    .catch((err) => {
      throw err;
    });

  return any_userData;
};

// import { userRepository } from "../repository";

// export const userDataSave = async (
//   id: string,
//   name: string,
//   affiliation?: string,
//   army_unit?: string,
//   enlistment_date?: string
// ) => {
//   const updates = {
//     affiliation,
//     army_unit,
//     enlistment_date,
//   };

//   try {
//     const updatedUser = await userRepository.update(id, updates).then((res) => {
//       console.log(res);
//       return res;
//     });
//   } catch (err) {
//     throw err;
//   }
// };

// export const allUserFind = async () => {
//   const any_userData = await userRepository
//     .find({})
//     .then((res) => {
//       return res;
//     })
//     .catch((err) => {
//       throw err;
//     });

//   return any_userData;
// };

// export const findOneUser = async (id: string) => {
//   const any_userData = await userRepository
//     .findOne({ where: { id } })
//     .then((res) => {
//       if (!res) return null;
//       return { ...res };
//     })
//     .catch((err) => {
//       throw err;
//     });

//   return any_userData;
// };
