import { Column, CreateDateColumn, Entity, PrimaryColumn } from "typeorm";

@Entity()
export default class User {
  @PrimaryColumn({ type: "varchar", comment: "google_oauth id" })
  id: number;

  @Column({ type: "varchar", length: 30, comment: "회원 이름" })
  name: string;

  @Column({ type: "varchar" })
  email: string;

  @Column({ type: "varchar", comment: "프로필 사진 주소" })
  picture: string;

  @CreateDateColumn({ comment: "회원 생성일자" })
  created_at: Date;
}
