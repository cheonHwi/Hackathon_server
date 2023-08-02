import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity()
export default class GymList {
  @PrimaryColumn({ type: "int", comment: "순번" })
  gym_id: number;

  @Column({ type: "varchar", length: 15, comment: "체력단련장 이름" })
  gym_name: string;

  @Column({ type: "varchar", length: 15, comment: "체력단련장 소속" })
  gym_employer: string;

  @Column({ type: "varchar", length: 15, comment: "운동 유형" })
  gym_type: string;

  @Column({ type: "varchar", length: 15, comment: "X 좌표값" })
  gym_positionx: string;

  @Column({ type: "varchar", length: 15, comment: "Y 좌표값" })
  gym_positiony: string;
}
