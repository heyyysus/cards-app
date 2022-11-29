CREATE TABLE Users (
    user_id SERIAL PRIMARY KEY,
    username VARCHAR(30),
    email VARCHAR(30),
    hash_digest VARCHAR(60)
);