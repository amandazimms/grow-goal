
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
  "image_path_stage_1" VARCHAR,
  "image_path_stage_2" VARCHAR,
  "image_path_stage_3" VARCHAR,
  "image_path_stage_4" VARCHAR,
  "image_path_stage_5" VARCHAR,
  "image_path_stage_6" VARCHAR,
  "image_path_stage_7" VARCHAR,
  "image_path_stage_8" VARCHAR
);
INSERT INTO "plant_avatar" ("image_path_stage_1", "image_path_stage_2", "image_path_stage_3", "image_path_stage_4", "image_path_stage_5", "image_path_stage_6", "image_path_stage_7", "image_path_stage_8")
VALUES ('/images/plantAvatars/PH0.png', '/images/plantAvatars/PH1.png', '/images/plantAvatars/PH2.png', '/images/plantAvatars/PH3.png', '/images/plantAvatars/PH4.png', '/images/plantAvatars/PH5.png', '/images/plantAvatars/PH6.png', '/images/plantAvatars/PH7.png');


CREATE TABLE "profile_avatar" (
  "id" SERIAL PRIMARY KEY,
  "image_path" VARCHAR
);
INSERT INTO "profile_avatar" ("image_path")
VALUES ('/images/profileAvatars/Profile1.png'),
('/images/profileAvatars/Profile2.png'),
('/images/profileAvatars/Profile3.png'),
('/images/profileAvatars/Profile4.png');

