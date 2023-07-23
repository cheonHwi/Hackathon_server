import { AppDataSource } from "../config/data-source";
import { User } from "../entity";

export const userRepository = AppDataSource.getRepository(User);
