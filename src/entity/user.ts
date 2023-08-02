import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryColumn,
  PrimaryGeneratedColumn,
} from "typeorm";

@Entity()
export default class User {
  @PrimaryColumn({ type: "varchar", comment: "google_oauth id" })
  id: number;

  //
  // @PrimaryGeneratedColumn()
  // idx: number;

  @Column({ type: "varchar", length: 30, comment: "회원 이름" })
  name: string;

  @Column({ type: "varchar", comment: "소속" })
  affiliation: string;

  @Column({ type: "varchar", comment: "부대" })
  army_unit: string;

  @Column({ type: "date", comment: "입대일자" })
  enlistment_date: Date;

  @CreateDateColumn({ comment: "회원 생성일자" })
  created_at: Date;
}
