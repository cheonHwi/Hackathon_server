import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from "typeorm";

@Entity()
export default class User {
  @PrimaryGeneratedColumn()
  idx: number;

  @Column({ type: "varchar", length: 30, comment: "회원 아이디" })
  id: string;

  @CreateDateColumn({ comment: "회원 생성일자" })
  created_at: Date;
}
