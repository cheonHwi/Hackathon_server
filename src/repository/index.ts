import { AppDataSource } from "../config/data-source";
import { User, PhysicalData } from "../entity";

export const userRepository = AppDataSource.getRepository(User);
export const physicalRepository = AppDataSource.getRepository(PhysicalData);
