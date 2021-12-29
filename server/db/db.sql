DROP TABLE IF EXISTS users CASCADE;
CREATE TABLE users (
  id SERIAL NOT NULL PRIMARY KEY,
  auth_id VARCHAR(50) NOT NULL UNIQUE,
  username VARCHAR(30) NOT NULL UNIQUE,
  first_name VARCHAR(50),
  last_name VARCHAR(50),
  email VARCHAR(100) NOT NULL,
  cardholder_name	VARCHAR(100),
  card_number VARCHAR(64),
  card_exp_date DATE,
  billing_address1 VARCHAR(100),
  billing_address2 VARCHAR(100),
  billing_city VARCHAR(100),
  billing_state VARCHAR(10),
  billing_postal_code VARCHAR(15),
  billing_country VARCHAR(40)
);

DROP TABLE IF EXISTS projects CASCADE;
CREATE TABLE projects (
  id SERIAL NOT NULL PRIMARY KEY,
  title VARCHAR(100) NOT NULL,
  tagline VARCHAR(200) NOT NULL,
  description VARCHAR(2000),
  funding REAL NOT NULL,
  deadline DATE NOT NULL,
  user_id SERIAL NOT NULL REFERENCES users(id)
);

DROP TABLE IF EXISTS users_projects;
CREATE TABLE users_projects (
  id SERIAL NOT NULL PRIMARY KEY,
  user_funding REAL NOT NULL,
  project_id SERIAL NOT NULL REFERENCES projects(id),
  user_id SERIAL NOT NULL REFERENCES users(id)
);


INSERT INTO users (
  username,
  auth_id,
  email,
  cardholder_name,
  card_number,
  card_exp_date,
  billing_address1,
  billing_address2,
  billing_city,
  billing_state,
  billing_postal_code,
  billing_country )
  VALUES (
    'aTest123',
    '1234567',
    'adam@email.com',
    'Adam Apple',
    '1234567980',
    '2024-03-01',
    '123 Main St',
    '123',
    'Fullerton',
    'CA',
    '92832',
    'USA');


UPDATE users
    SET (
      first_name,
      last_name,
      email,
      cardholder_name,
      card_number,
      card_exp_date,
      billing_address1,
      billing_address2,
      billing_city,
      billing_state,
      billing_postal_code,
      billing_country
    ) = (
      'Adam',
      'Apple',
      'adam@email.com',
      'Adam Apple',
      '1234567980',
      '2024-03-01',
      '123 Main St',
      '123',
      'Fullerton',
      'CA',
      '92832',
      'USA')
  WHERE id = 1;

-- SELECT * FROM projects
--   LEFT JOIN (
--     SELECT project_id,
--     TRUNC(SUM(funding)) as total_funding
--     FROM users_projects
--     GROUP BY project_id
--   ) users_projects on users_projects.project_id = projects.id;