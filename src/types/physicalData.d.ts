export interface PhysicalDataJson {
  id: string;
  height: number;
  ages: number;
  inspection_date: Date;
  body_water: number;
  protein: number;
  minerals: number;
  body_fat: number;
  weight: number;
  skeletal_muscle_mass: number;
  bmi: number;
  body_fat_percentage: number;
  inbody_score: number;
}

export interface Oauth2Data {
  id: string;
  email: string;
  verified_email: boolean;
  name: string;
  given_name: string;
  family_name: string;
  picture: string;
  locale: string;
}

export interface UserData {
  id: string;
  name: string;
  affiliation: null | string;
  army_unit: null | string;
  enlistment_date: null | Date;
  is_verified: boolean;
}
// ('110626999320798511586', 168.4, 17.7, 2023.07.18. 15:29, 33.6, 9.1, 3.35, 13.0, 59.0, 25.5, 20.8, 22.1, 84)

// {
//   id: '1231412'
//   height: '168.4',
//   ages: '17.7',
//   inspection_date: '2023.07.18.15:29',
//   body_water: '33.6',
//   protein: '9.1',
//   minerals: '3.35',
//   body_fat: '13.0',
//   weight: '59.0',
//   skeletal_muscle_mass: '25.5',
//   bmi: '20.8',
//   body_fat_percentage: '22.1',
//   inbody_score: '84',
// }
