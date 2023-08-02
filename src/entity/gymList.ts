import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity()
export default class GymList {
  @PrimaryColumn({ type: "int", comment: "순번" })
  gym_id: number;

  @Column({ type: "varchar", length: 15, comment: "회원 이름" })
  gym_name: string;

  @Column({ type: "varchar", length: 15, comment: "회원 이름" })
  gym_employer: string;

  @Column({ type: "varchar", length: 15, comment: "회원 이름" })
  gym_type: string;

  @Column({ type: "varchar", length: 15, comment: "회원 이름" })
  gym_positionx: string;

  @Column({ type: "varchar", length: 15, comment: "회원 이름" })
  gym_positiony: string;
}
