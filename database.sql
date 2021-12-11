
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

CREATE TABLE "task" (
  "id" SERIAL PRIMARY KEY,
  "task_name" VARCHAR,
  "is_complete" BOOLEAN,
  "goal_id" INT
);

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

CREATE TABLE "profile_avatar" (
  "id" SERIAL PRIMARY KEY,
  "image_path" VARCHAR
);