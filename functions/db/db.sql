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
  title VARCHAR(80) NOT NULL,
  tagline VARCHAR(100) NOT NULL,
  details VARCHAR(5000),
  funding_goal REAL NOT NULL,
  funding_received REAL NOT NULL DEFAULT 0,
  deadline DATE NOT NULL,
  img_url VARCHAR(2048),
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

INSERT INTO projects (
  title,
  tagline,
  details,
  funding_goal,
  deadline,
  img_url,
  user_id )
  VALUES (
    'Test Project 1',
    'The best idea ever',
    'Lorem ipsum dolor sit amet. Et atque dolor ut quibusdam blanditiis eos ducimus aliquam et veritatis iste quo dicta omnis vel aliquid quisquam aut quidem possimus? Et ipsam animi et magni temporibus nam vitae quod hic dolores harum hic quos incidunt sed unde nesciunt ut ducimus quia! Rem magnam reprehenderit sit molestiae repellat vel quaerat quis. Vel nesciunt vero in voluptate architecto aut omnis nesciunt At tempora nihil vel accusamus laudantium aut porro ipsa in esse dolor.',
    1500000,
    '12-31-2022',
    'http://placeimg.com/300/200/any',
    1
  );