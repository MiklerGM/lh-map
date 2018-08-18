SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_with_oids = false;

\c chronist;


-- COPY lhtable (id, title) FROM stdin;
-- 1  'One text'
-- 2  'Two text'
-- \.

DROP TABLE posts CASCADE;
DROP TABLE languages CASCADE;

CREATE TABLE posts (
  id         INTEGER PRIMARY KEY,
  title      TEXT,
  languages  TEXT[]
);

CREATE TABLE languages (
  id      INTEGER PRIMARY KEY,
  name    TEXT
);

INSERT INTO posts (id, title, languages)
  VALUES (1, 'One easy trick to learn graphql', '{"United States", "Somalia", "Russia"}'),
         (2, '10 ways to shock your friends with ReactJS', '{"Somalia", "Russia"}');

INSERT INTO languages (id, name)
  VALUES (1, 'United States'),
         (2, 'Russia'),
         (3, 'Somalia');

