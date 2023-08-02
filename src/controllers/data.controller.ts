import { physicalRepository } from "../repository";
import { PhysicalDataJson } from "../types/physicalData";

export const physicalDataSave = async (physicalData: PhysicalDataJson) => {
  physicalData.inspection_date = new Date(physicalData.inspection_date);
  console.log(physicalData);
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
