import { AppDataSource } from "../config/data-source";
import { User, PhysicalData, GymList } from "../entity";

export const userRepository = AppDataSource.getRepository(User);
export const gymRepository = AppDataSource.getRepository(GymList);
export const physicalRepository = AppDataSource.getRepository(PhysicalData);
