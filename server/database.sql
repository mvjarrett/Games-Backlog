CREATE DATABASE tere;

CREATE TABLE backlog(
    game_id SERIAL PRIMARY KEY,
    user_id INTEGER,
    sys VARCHAR, 
    title_name VARCHAR,
    genre VARCHAR,
    played BOOLEAN,
    playing BOOLEAN,
    wishlist BOOLEAN
);