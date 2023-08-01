insert into user(id, name, email, picture, affiliation, army_unit, enlistment_date) values ('110626999320798511586', '박천휘', '9000gnl@gmail.com', 'https://lh3.googleusercontent.com/a/AAcHTtdx2Oj3D7K-TYcOQm2sJBM2XG2my-KwgWG2DNqGnM4XUcc=s96-c', '해병대', '7296', '2023.08.01');
insert into physical_data
      (id, height, ages, inspection_date, body_water, protein, minerals, body_fat, weight, skeletal_muscle_mass, bmi, body_fat_percentage, inbody_score)
values('110626999320798511586', 168.4, 17.7, '2023.07.18. 15:29', 33.6, 9.1, 3.35, 13.0, 59.0, 25.5, 20.8, 22.1, 84);

select * from user;
select * from physical_data;

select name, inbody_score from user u, physical_data p where p.id = u.id order by inbody_score;