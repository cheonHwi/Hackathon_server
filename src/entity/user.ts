import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryColumn,
  Unique,
} from "typeorm";

@Entity()
export default class User {
  @PrimaryColumn({ type: "varchar", comment: "google_oauth id" })
  id: string;

  @Column({ type: "varchar", length: 30, comment: "회원 이름" })
  name: string;

  @Column({ type: "varchar", comment: "소속", nullable: true })
  affiliation: string;

  @Column({ type: "varchar", comment: "부대", nullable: true })
  army_unit: string;

  @Column({ type: "date", comment: "입대일자", nullable: true })
  enlistment_date: Date;

  @Column({ type: "boolean", comment: "상세데이터 기입 여부", default: false })
  is_verified: boolean;

  @CreateDateColumn({ comment: "회원 생성일자" })
  created_at: Date;
}
