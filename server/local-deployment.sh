#!/bin/bash

psql+=( psql --username postgres)


"${psql[@]}" --username postgres <<-EOSQL
	CREATE DATABASE chronist ;
EOSQL
echo

"${psql}" --username postgres  <<-EOSQL
	ALTER USER "postgres" WITH PASSWORD 'postgres';
EOSQL

psql+=( --dbname chronist)

for i in ./initdb/*
do
	echo "$0: running $i"; "${psql[@]}" -f "$i";
	echo "${psql[@]} -f"
done
