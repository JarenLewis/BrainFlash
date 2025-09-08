BEGIN TRANSACTION;

DROP TABLE IF EXISTS users, card_deck, deck, card, tags, card_tags CASCADE;

CREATE TABLE users (
	user_id SERIAL,
	username varchar(50) NOT NULL UNIQUE,
	password_hash varchar(200) NOT NULL,
	role varchar(50) NOT NULL,
	CONSTRAINT PK_user PRIMARY KEY (user_id)
);

CREATE TABLE deck (
    deck_id SERIAL,
    user_id int REFERENCES users(user_id),
    title varchar(30) NOT NULL,
    description varchar(400) NOT NULL,
    CONSTRAINT PK_deck PRIMARY KEY (deck_id)
);

CREATE TABLE card (
    card_id SERIAL,
    user_id int REFERENCES users(user_id),
    front varchar(400) NOT NULL,
    back varchar(400) NOT NULL,
    has_image boolean NOT NULL DEFAULT FALSE,
    CONSTRAINT PK_card PRIMARY KEY (card_id)
);

CREATE TABLE card_deck (
    card_id int REFERENCES card(card_id) ON DELETE CASCADE,
    deck_id int REFERENCES deck(deck_id) ON DELETE CASCADE

);

CREATE TABLE tags (
    tag_id SERIAL,
    name VARCHAR(200) NOT NULL,
    CONSTRAINT PK_tags PRIMARY KEY (tag_id)
);

CREATE TABLE card_tags (
    card_id int REFERENCES card(card_id) ON DELETE CASCADE,
    tag_id int REFERENCES tags(tag_id) ON DELETE CASCADE
);

COMMIT TRANSACTION;