-- Your SQL goes here
CREATE TABLE posts (
  id SERIAL PRIMARY KEY,
  title VARCHAR(20) NOT NULL,
  body VARCHAR(20) NOT NULL,
  published BOOLEAN NOT NULL DEFAULT False
)
