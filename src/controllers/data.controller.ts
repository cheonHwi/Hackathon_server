import { physicalRepository } from "../repository";
import { PhysicalDataJson } from "../types/physicalData";

export const physicalDataSave = async (physicalData: PhysicalDataJson) => {
  const saved_user = await physicalRepository
    .save(physicalData)
    .then((res) => {
      return res;
    })
    .catch((err) => {
      throw err;
    });
  return saved_user;
};
