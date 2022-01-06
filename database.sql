
CREATE TABLE "profile_avatar_hat"  (
  "id" SERIAL PRIMARY KEY,
  "image_path" VARCHAR
);
INSERT INTO "profile_avatar_hat" ("image_path")
VALUES  ('/images/profileAvatars/Blank.png'), 
        ('/images/profileAvatars/Hat1.png'),
        ('/images/profileAvatars/Hat2.png'),
        ('/images/profileAvatars/Hat3.png'),
        ('/images/profileAvatars/Hat4.png'),
        ('/images/profileAvatars/Hat5.png'),
        ('/images/profileAvatars/Hat6.png');

CREATE TABLE "profile_avatar_hair"  (
  "id" SERIAL PRIMARY KEY,
  "image_path" VARCHAR
);
INSERT INTO "profile_avatar_hair" ("image_path")
VALUES  ('/images/profileAvatars/Blank.png'), 
        ('/images/profileAvatars/Hair1.png'),
        ('/images/profileAvatars/Hair2.png'),
        ('/images/profileAvatars/Hair3.png'),
        ('/images/profileAvatars/Hair4.png'),
        ('/images/profileAvatars/Hair5.png'),
        ('/images/profileAvatars/Hair6.png'),
        ('/images/profileAvatars/Hair7.png'),
        ('/images/profileAvatars/Hair8.png'),
        ('/images/profileAvatars/Hair1b.png'),
        ('/images/profileAvatars/Hair2b.png'),
        ('/images/profileAvatars/Hair3b.png'),
        ('/images/profileAvatars/Hair2c.png'),
        ('/images/profileAvatars/Hair9b.png'),
        ('/images/profileAvatars/Hair3c.png'),
        ('/images/profileAvatars/Hair4c.png'),
        ('/images/profileAvatars/Hair5b.png'),
        ('/images/profileAvatars/Hair4b.png'),
        ('/images/profileAvatars/Hair6b.png'),
        ('/images/profileAvatars/Hair7b.png'),
        ('/images/profileAvatars/Hair8b.png'),
        ('/images/profileAvatars/Hair9c.png'),
        ('/images/profileAvatars/Hair10.png'),
        ('/images/profileAvatars/Hair10b.png');


CREATE TABLE "profile_avatar_eyebrows"  (
  "id" SERIAL PRIMARY KEY,
  "image_path" VARCHAR
);
INSERT INTO "profile_avatar_eyebrows" ("image_path")
VALUES  ('/images/profileAvatars/Blank.png'), 
        ('/images/profileAvatars/Eyebrows1.png'),
        ('/images/profileAvatars/Eyebrows2.png'),
        ('/images/profileAvatars/Eyebrows3.png'),
        ('/images/profileAvatars/Eyebrows4.png'),
        ('/images/profileAvatars/Eyebrows5.png');

CREATE TABLE "profile_avatar_eyes"  (
  "id" SERIAL PRIMARY KEY,
  "image_path" VARCHAR
);
INSERT INTO "profile_avatar_eyes" ("image_path")
VALUES  ('/images/profileAvatars/Eyes1.png'),
        ('/images/profileAvatars/Eyes2.png'),
        ('/images/profileAvatars/Eyes3.png'),
        ('/images/profileAvatars/Eyes4.png'),
        ('/images/profileAvatars/Eyes8.png'),
        ('/images/profileAvatars/Eyes5.png'),
        ('/images/profileAvatars/Eyes6.png'),
        ('/images/profileAvatars/Eyes7.png'),
        ('/images/profileAvatars/Eyes9.png');

CREATE TABLE "profile_avatar_nose"  (
  "id" SERIAL PRIMARY KEY,
  "image_path" VARCHAR
);
INSERT INTO "profile_avatar_nose" ("image_path")
VALUES  ('/images/profileAvatars/Blank.png'),
        ('/images/profileAvatars/Nose1.png'),
        ('/images/profileAvatars/Nose2.png'),
        ('/images/profileAvatars/Nose3.png'),
        ('/images/profileAvatars/Nose5.png'),
        ('/images/profileAvatars/Nose4.png');

CREATE TABLE "profile_avatar_detail"  (
  "id" SERIAL PRIMARY KEY,
  "image_path" VARCHAR
);
INSERT INTO "profile_avatar_detail" ("image_path")
VALUES  ('/images/profileAvatars/Blank.png'),
        ('/images/profileAvatars/Detail1.png'),
        ('/images/profileAvatars/Detail2.png'),
        ('/images/profileAvatars/Detail4.png'),
        ('/images/profileAvatars/Detail3.png');

CREATE TABLE "profile_avatar_mouth"  (
  "id" SERIAL PRIMARY KEY,
  "image_path" VARCHAR
);
INSERT INTO "profile_avatar_mouth" ("image_path")
VALUES  ('/images/profileAvatars/Mouth1.png'),
        ('/images/profileAvatars/Mouth2.png'),
        ('/images/profileAvatars/Mouth3.png'),
        ('/images/profileAvatars/Mouth4.png'),
        ('/images/profileAvatars/Mouth6.png'),
        ('/images/profileAvatars/Mouth5.png');

CREATE TABLE "profile_avatar_head"  (
  "id" SERIAL PRIMARY KEY,
  "image_path" VARCHAR
);
INSERT INTO "profile_avatar_head" ("image_path")
VALUES  ('/images/profileAvatars/Head1.png'),
        ('/images/profileAvatars/Head2.png'),
        ('/images/profileAvatars/Head3.png'),
        ('/images/profileAvatars/Head4.png'),
        ('/images/profileAvatars/Head5.png'),
        ('/images/profileAvatars/Head6.png'),
        ('/images/profileAvatars/Head7.png');

CREATE TABLE "profile_avatar_body"  (
  "id" SERIAL PRIMARY KEY,
  "image_path" VARCHAR
);
INSERT INTO "profile_avatar_body" ("image_path")
VALUES  ('/images/profileAvatars/Body1.png'),
        ('/images/profileAvatars/Body2.png'),
        ('/images/profileAvatars/Body3.png'),
        ('/images/profileAvatars/Body4.png'),
        ('/images/profileAvatars/Body5.png'),
        ('/images/profileAvatars/Body6.png'),
        ('/images/profileAvatars/Body7.png'),
        ('/images/profileAvatars/Body8.png'),
        ('/images/profileAvatars/Body9.png'),
        ('/images/profileAvatars/Body10.png'),
        ('/images/profileAvatars/Body11.png'),
        ('/images/profileAvatars/Body12.png');              
        

CREATE TABLE "user" (
  "id" SERIAL PRIMARY KEY,
  "username" VARCHAR (80) UNIQUE NOT NULL,
  "password" VARCHAR (100) NOT NULL,
  "tasks_completed" INT,
  "goals_achieved" INT,
  "profile_avatar_id" INT REFERENCES profile_avatar (id) DEFAULT 1
);

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

CREATE TABLE "goal" (
  "id" SERIAL PRIMARY KEY,
  "goal_name" VARCHAR,
  "visibility" VARCHAR,
  "progress" DECIMAL, 
  "is_accomplished" BOOLEAN,
  "last_update" TIMESTAMP,
  "user_id" INT REFERENCES "user" (id) ON DELETE CASCADE,
  "plant_avatar_id" INT REFERENCES "plant_avatar" (id) ON DELETE RESTRICT,
  "like_count" INT DEFAULT 0
);
INSERT INTO "goal" ("goal_name", "visibility", "progress", "is_accomplished", "last_update", "user_id", "plant_avatar_id", "like_count")
VALUES ('Write Novel', 'followers' .25, FALSE,'1999-01-08 04:05:06', 1, 1, 17);

CREATE TABLE "task" (
  "id" SERIAL PRIMARY KEY,
  "task_name" VARCHAR,
  "is_complete" BOOLEAN,
  "goal_id" INT REFERENCES "goal" (id) ON DELETE CASCADE,
);
INSERT INTO "task" ("task_name", "is_complete", "goal_id")
VALUES ('Do prewriting research', TRUE, 1),
('Do prewriting research', TRUE, 1),
('Install Grammarly', FALSE, 1),
('Outline Chapter 1', FALSE, 1);

CREATE TABLE "followers" (
  "id" SERIAL PRIMARY KEY,
  "followee_id" INT REFERENCES "user" (id) ON DELETE CASCADE,
  "follower_id" INT REFERENCES "user" (id) ON DELETE CASCADE
);

CREATE TABLE "likes" (
  "id" SERIAL PRIMARY KEY,
  "goal_id" INT REFERENCES "goal" (id) ON DELETE CASCADE,
  "liked_by" INT REFERENCES "user" (id) ON DELETE CASCADE
);
-- todo add placeholder/beginning data to followers, likes tables
