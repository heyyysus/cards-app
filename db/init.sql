CREATE TYPE credential_services AS ENUM ('google', 'apple');

CREATE TABLE IF NOT EXISTS users (
    user_id SERIAL PRIMARY KEY,
    username VARCHAR(30) NOT NULL,
    email VARCHAR(30) NOT NULL,
    profile_img VARCHAR(255),
    credentials_provider credential_services NOT NULL
);

CREATE TABLE IF NOT EXISTS courses (
    course_id SERIAL PRIMARY KEY,
    course_subject VARCHAR(255),
    course_no VARCHAR(10),
    course_name VARCHAR(255) NOT NULL,
    instructor_name VARCHAR(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS groups (
    group_id SERIAL PRIMARY KEY,
    group_name VARCHAR(30) NOT NULL,
    group_img VARCHAR(255),
    description VARCHAR(500),
    course_id INT REFERENCES courses(course_id)
);
