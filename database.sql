
-- USER is a reserved keyword with Postgres
-- You must use double quotes in every query that user is in:
-- ex. SELECT * FROM "user";
-- Otherwise you will have errors!
CREATE TABLE "user" (
  "id" SERIAL PRIMARY KEY,
  "username" VARCHAR (80) UNIQUE NOT NULL,
  "password" VARCHAR (100) NOT NULL,
  "tasks_completed" INT,
  "goals_achieved" INT,
  "profile_avatar id" INT
);

CREATE TABLE "goal" (
  "id" SERIAL PRIMARY KEY,
  "goal_name" VARCHAR,
  "progress" DECIMAL, 
  "is_accomplished" BOOLEAN,
  "last_update" TIMESTAMP,
  "user_id" INT,
  "plant_avatar_id" INT
);
INSERT INTO "goal" ("goal_name", "progress", "is_accomplished", "last_update", "user_id", "plant_avatar_id")
VALUES ('Write Novel', .25, FALSE,'1999-01-08 04:05:06', 1, 1);


CREATE TABLE "task" (
  "id" SERIAL PRIMARY KEY,
  "task_name" VARCHAR,
  "is_complete" BOOLEAN,
  "goal_id" INT
);
INSERT INTO "task" ("task_name", "is_complete", "goal_id")
VALUES ('Do prewriting research', TRUE, 1),
('Do prewriting research', TRUE, 1),
('Install Grammarly', FALSE, 1),
('Outline Chapter 1', FALSE, 1);


CREATE TABLE "plant_avatar" (
  "id" SERIAL PRIMARY KEY,
  "image_path_stage_0" VARCHAR
  "image_path_stage_1" VARCHAR,
  "image_path_stage_2" VARCHAR,
  "image_path_stage_3" VARCHAR,
  "image_path_stage_4" VARCHAR,
  "image_path_stage_5" VARCHAR,
  "image_path_stage_6" VARCHAR,
  "image_path_stage_7" VARCHAR,
);
INSERT INTO "plant_avatar" ("image_path_stage_0", "image_path_stage_1", "image_path_stage_2", "image_path_stage_3", "image_path_stage_4", "image_path_stage_5", "image_path_stage_6", "image_path_stage_7")
VALUES ('/images/plantAvatars/BlueBramble1.png', '/images/plantAvatars/BlueBramble2.png', '/images/plantAvatars/BlueBramble3.png', '/images/plantAvatars/BlueBramble4.png', '/images/plantAvatars/BlueBramble5.png', '/images/plantAvatars/BlueBramble6.png', '/images/plantAvatars/BlueBramble7.png', '/images/plantAvatars/BlueBramble8.png'),
('/images/plantAvatars/RedBramble1.png', '/images/plantAvatars/RedBramble2.png', '/images/plantAvatars/RedBramble3.png', '/images/plantAvatars/RedBramble4.png', '/images/plantAvatars/RedBramble5.png', '/images/plantAvatars/RedBramble6.png', '/images/plantAvatars/RedBramble7.png', '/images/plantAvatars/RedBramble8.png'),
('/images/plantAvatars/PinkTulip1.png', '/images/plantAvatars/PinkTulip2.png', '/images/plantAvatars/PinkTulip3.png', '/images/plantAvatars/PinkTulip4.png', '/images/plantAvatars/PinkTulip5.png', '/images/plantAvatars/PinkTulip6.png', '/images/plantAvatars/PinkTulip7.png', '/images/plantAvatars/PinkTulip8.png'),
('/images/plantAvatars/PinkVine1.png', '/images/plantAvatars/PinkVine2.png', '/images/plantAvatars/PinkVine3.png', '/images/plantAvatars/PinkVine4.png', '/images/plantAvatars/PinkVine5.png', '/images/plantAvatars/PinkVine6.png', '/images/plantAvatars/PinkVine7.png', '/images/plantAvatars/PinkVine8.png'),
('/images/plantAvatars/RedVine1.png', '/images/plantAvatars/RedVine2.png', '/images/plantAvatars/RedVine3.png', '/images/plantAvatars/RedVine4.png', '/images/plantAvatars/RedVine5.png', '/images/plantAvatars/RedVine6.png', '/images/plantAvatars/RedVine7.png', '/images/plantAvatars/RedVine8.png'),
('/images/plantAvatars/ScarletVine1.png', '/images/plantAvatars/ScarletVine2.png', '/images/plantAvatars/ScarletVine3.png', '/images/plantAvatars/ScarletVine4.png', '/images/plantAvatars/ScarletVine5.png', '/images/plantAvatars/ScarletVine6.png', '/images/plantAvatars/ScarletVine7.png', '/images/plantAvatars/ScarletVine8.png'),
('/images/plantAvatars/YellowTulip1.png', '/images/plantAvatars/YellowTulip2.png', '/images/plantAvatars/YellowTulip3.png', '/images/plantAvatars/YellowTulip4.png', '/images/plantAvatars/YellowTulip5.png', '/images/plantAvatars/YellowTulip6.png', '/images/plantAvatars/YellowTulip7.png', '/images/plantAvatars/YellowTulip8.png');

CREATE TABLE "profile_avatar" (
  "id" SERIAL PRIMARY KEY,
  "image_path" VARCHAR
);
INSERT INTO "profile_avatar" ("image_path")
VALUES ('/images/profileAvatars/Profile1.png'),
('/images/profileAvatars/Profile2.png'),
('/images/profileAvatars/Profile3.png'),
('/images/profileAvatars/Profile4.png');

