import { DataSource } from "typeorm";

export const AppDataSource = new DataSource({
  type: "mysql",
  host: "121.130.215.41",
  port: 3306,
  username: "projectm",
  password: "7oml7UsTL$",
  database: "hackathon",
  // synchronize: true, // 엔티티 동기화 여부, 개발 중일땐 true를 해도 상관없으나 실서버에서는 false로 하고 migration을 하거나, 직접 수정한다.
  synchronize: false,
  logging: true,
  entities: ["src/entity/index.ts"], // Entity 경로 설정
  subscribers: [],
  migrations: [],
});
