import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export default class PhysicalData {
  @PrimaryGeneratedColumn({ type: "int" })
  idx: number;

  @Column({ type: "varchar", comment: "google_oauth id" })
  id: string;

  @Column({ type: "float", comment: "신장", precision: 6, scale: 2 })
  height: number;

  @Column({ type: "int", comment: "나이" })
  ages: number;

  @Column({ type: "datetime", comment: "기입일자" })
  inspection_date: Date;

  // 체성분 분석 5요소.
  @Column({ type: "float", comment: "체수분", precision: 6, scale: 2 })
  body_water: number;

  @Column({ type: "float", comment: "단백질", precision: 6, scale: 2 })
  protein: number;

  @Column({ type: "float", comment: "무기질", precision: 6, scale: 2 })
  minerals: number;

  @Column({ type: "float", comment: "체지방", precision: 6, scale: 2 })
  body_fat: number;

  @Column({ type: "float", comment: "체중", precision: 6, scale: 2 })
  weight: number;

  // 골격근량
  @Column({ type: "float", comment: "골격근량", precision: 6, scale: 2 })
  skeletal_muscle_mass: number;

  // 비만분석 2요소.
  @Column({ type: "int", comment: "bmi 지수" })
  bmi: number;

  @Column({ type: "float", comment: "체지방률", precision: 6, scale: 2 })
  body_fat_percentage: number;

  @Column({ type: "int", comment: "성장/인바디 점수" })
  inbody_score: number;
}
