BEGIN TRANSACTION;

-- the password for both users is "password"
INSERT INTO users (username,password_hash,role) VALUES ('user','$2a$08$UkVvwpULis18S19S5pZFn.YHPZt3oaqHZnDwqbCW9pft6uFtkXKDC','ROLE_USER'); -- 1
INSERT INTO users (username,password_hash,role) VALUES ('admin','$2a$08$UkVvwpULis18S19S5pZFn.YHPZt3oaqHZnDwqbCW9pft6uFtkXKDC','ROLE_ADMIN'); -- 2
INSERT INTO users (username,password_hash,role) VALUES ('anotheruser','$2a$08$UkVvwpULis18S19S5pZFn.YHPZt3oaqHZnDwqbCW9pft6uFtkXKDC','ROLE_USER'); -- 3

-- ========================
-- TAGS
-- ========================
INSERT INTO tags (name) VALUES ('math');  -- 1
INSERT INTO tags (name) VALUES ('algebra'); -- 2
INSERT INTO tags (name) VALUES ('geometry'); -- 3
INSERT INTO tags (name) VALUES ('calculus');-- 4
INSERT INTO tags (name) VALUES ('science');-- 5
INSERT INTO tags (name) VALUES ('biology');-- 6
INSERT INTO tags (name) VALUES ('chemistry');-- 7
INSERT INTO tags (name) VALUES ('physics');-- 8
INSERT INTO tags (name) VALUES ('history');-- 9
INSERT INTO tags (name) VALUES ('geography');-- 10
INSERT INTO tags (name) VALUES ('english');-- 11
INSERT INTO tags (name) VALUES ('vocabulary');-- 12
INSERT INTO tags (name) VALUES ('spanish');-- 13
INSERT INTO tags (name) VALUES ('french');-- 14
INSERT INTO tags (name) VALUES ('german');-- 15
INSERT INTO tags (name) VALUES ('mandarin');-- 16
INSERT INTO tags (name) VALUES ('japanese');-- 17
INSERT INTO tags (name) VALUES ('italian');-- 18
INSERT INTO tags (name) VALUES ('grammar');-- 19
INSERT INTO tags (name) VALUES ('phonetics');-- 20
INSERT INTO tags (name) VALUES ('asl');-- 21
INSERT INTO tags (name) VALUES ('coding interview');-- 22
INSERT INTO tags (name) VALUES ('programming');-- 23
INSERT INTO tags (name) VALUES ('java');-- 24
INSERT INTO tags (name) VALUES ('sql');-- 25
INSERT INTO tags (name) VALUES ('html');-- 26
INSERT INTO tags (name) VALUES ('css');-- 27
INSERT INTO tags (name) VALUES ('javascript');-- 28
INSERT INTO tags (name) VALUES ('spring boot');-- 29
INSERT INTO tags (name) VALUES ('react.js');-- 30
INSERT INTO tags (name) VALUES ('jdbc');-- 31
INSERT INTO tags (name) VALUES ('music theory');-- 32
INSERT INTO tags (name) VALUES ('art history');-- 33
INSERT INTO tags (name) VALUES ('photography');-- 34
INSERT INTO tags (name) VALUES ('cooking');-- 35
INSERT INTO tags (name) VALUES ('sports trivia');-- 36
INSERT INTO tags (name) VALUES ('chess strategies');-- 37
INSERT INTO tags (name) VALUES ('trivia');-- 38
INSERT INTO tags (name) VALUES ('world capitals');-- 39
INSERT INTO tags (name) VALUES ('turtles');-- 40
INSERT INTO tags (name) VALUES ('pokemon');-- 41

-- ========================
-- CARDS
-- ========================
INSERT INTO card (user_id, front, back) VALUES
(1, 'Method', 'In Java, a method is a block of code that performs a specific task and is defined within a class'), -- 1
(1, 'Boolean', 'A variable that is true or false'), -- 2
(1, 'Double', 'A type of variable that can contain fractions as well as integers'), -- 3
(1, 'String', 'A type of variable that contains a sequence of characters (words)'), -- 4
(1, 'Class', 'A blueprint which describes methods, functions, and constructors'), -- 5
(1, 'Encapsulation', 'Wrapping data in a single unit'), -- 6
(1, 'Polymorphism', 'The same class name that we give many functions'), -- 7
(1, 'Inheritance', 'Transferring the properties of one class to another'), -- 8
(3, 'Omelette du Fromage', 'Cheese omelette'), -- 9
(3, 'Merci', 'Thank you'), -- 10
(3, 'Excusez-moi', 'Excuse me'), -- 11
(3, 'What is object-oriented programming?', 'Object-oriented programming (OOP) is a computer programming model that organizes software design around data, or objects, rather than functions and logic'), -- 12
(3, 'What is a loop used for in programming?', 'In programming, the purpose of a loop is to repeat a block of code multiple times'), -- 13
(3, 'Carapace', 'The top of a turtle shell'), -- 14
(3, 'Where do some turtles breathe from', 'Their butts'); -- 15

-- ========================
-- DECKS
-- ========================
INSERT INTO deck (user_id, title, description) VALUES
(1, 'Java Basics', 'Key Java programming concepts'), -- deck_id 1
(3, 'French Phrases', 'Common French words and phrases'), -- deck_id 2
(3, 'Mixed Knowledge', 'Programming and turtle trivia'), -- deck_id 3
(3, 'Pokemon', 'All about Pokemon'),
(1, 'CSS', 'Cascading Style Sheets basics'),
(1, 'Sports Trivia', 'Fun questions about sports'),
(1, 'General Trivia', 'A variety of fun trivia questions');

-- ========================
-- CARD-DECK LINKS
-- ========================
-- Deck 1: cards 1–8
INSERT INTO card_deck (card_id, deck_id) VALUES
(1, 1), (2, 1), (3, 1), (4, 1), (5, 1), (6, 1), (7, 1), (8, 1);

-- Deck 2: cards 9–11
INSERT INTO card_deck (card_id, deck_id) VALUES
(9, 2), (10, 2), (11, 2);

-- Deck 3: cards 12–15
INSERT INTO card_deck (card_id, deck_id) VALUES
(12, 3), (13, 3), (14, 3), (15, 3);

-- ========================
-- CARD-TAGS LINKS (existing)
-- ========================
-- Java-related cards
INSERT INTO card_tags (card_id, tag_id) VALUES
(1, 24), (2, 24), (3, 24), (4, 24), (5, 24), (6, 24), (7, 24), (8, 24),
(12, 24), (13, 24);

-- French-related cards
INSERT INTO card_tags (card_id, tag_id) VALUES
(9, 14), (10, 14), (11, 14);

-- Turtle-related cards
INSERT INTO card_tags (card_id, tag_id) VALUES
(14, 40), (15, 40);

-- ========================
-- NEW CARDS
-- ========================
INSERT INTO card (user_id, front, back) VALUES
(3, 'The pokemon Turtwig is based off a turtle. Which generation of Pokemon was Turtwig introduced in?', 'Generation IV'), -- 16
(3, 'The Pokemon name TATSUGIRI is an anagram of which English word?', 'Guitarist'), -- 17
(1, 'What does CSS stand for?', 'Cascading Style Sheets'), -- 18
(1, 'In CSS, how do you center a div horizontally?', 'Use margin: 0 auto;'), -- 19
(1, 'How do you select all paragraph elements in CSS?', 'p { ... }'), -- 20
(3, 'Which country won the FIFA World Cup in 2018?', 'France'), -- 21
(3, 'In basketball, how many points is a free throw worth?', '1'), -- 22
(1, 'What is the only U.S. state that can be typed in using only one row of a standard “QWERTY” keyboard?', 'Alaska'), -- 23
(1, 'Weighing around eight pounds, this is the human body''s largest organ?', 'The skin'), -- 24
(1, 'How many states does the Appalachian Trail cross?', '14'), -- 25
(1, 'What do you call a group of flamingos?', 'A flamboyance'), -- 26
(1, 'Relative to the internet, what does “URL” stand for?', 'Uniform resource locator'), -- 27
(1, 'Which country is the largest in the world?', 'Russia'), -- 28
(1, 'M&M’S Fruit Chews would eventually become what popular candy?', 'Starburst'), -- 29
(1, 'What is the fifth sign of the zodiac?', 'Leo'), -- 30
(1, 'What was America’s first national park?', 'Yellowstone National Park'), -- 31
(1, 'How many elements are currently on the periodic table?', '118'), -- 32
(1, 'What is the largest bone in the human body?', 'Femur'), -- 33
(1, 'How many colors are in a rainbow?', 'Seven'), -- 34
(1, 'How many staircases are located in Hogwarts?', '142'), -- 35
(1, 'What animal has the biggest eyes?', 'Giant Squid'), -- 36
(1, 'The unicorn is the national animal of which country?', 'Scotland'); -- 37

-- ========================
-- LINK NEW CARDS TO DECKS
-- ========================
-- Pokemon deck
INSERT INTO card_deck (card_id, deck_id) VALUES
(16, (SELECT deck_id FROM deck WHERE title='Pokemon')),
(17, (SELECT deck_id FROM deck WHERE title='Pokemon'));

-- CSS deck
INSERT INTO card_deck (card_id, deck_id) VALUES
(18, (SELECT deck_id FROM deck WHERE title='CSS')),
(19, (SELECT deck_id FROM deck WHERE title='CSS')),
(20, (SELECT deck_id FROM deck WHERE title='CSS'));

-- Sports Trivia deck
INSERT INTO card_deck (card_id, deck_id) VALUES
(21, (SELECT deck_id FROM deck WHERE title='Sports Trivia')),
(22, (SELECT deck_id FROM deck WHERE title='Sports Trivia'));

-- General Trivia deck
INSERT INTO card_deck (card_id, deck_id)
SELECT c.card_id, d.deck_id
FROM card c
JOIN deck d ON d.title = 'General Trivia'
WHERE c.front IN (
    'What is the only U.S. state that can be typed in using only one row of a standard “QWERTY” keyboard?',
    'Weighing around eight pounds, this is the human body''s largest organ?',
    'How many states does the Appalachian Trail cross?',
    'What do you call a group of flamingos?',
    'Relative to the internet, what does “URL” stand for?',
    'Which country is the largest in the world?',
    'M&M’S Fruit Chews would eventually become what popular candy?',
    'What is the fifth sign of the zodiac?',
    'What was America’s first national park?',
    'How many elements are currently on the periodic table?',
    'What is the largest bone in the human body?',
    'How many colors are in a rainbow?',
    'How many staircases are located in Hogwarts?',
    'What animal has the biggest eyes?',
    'The unicorn is the national animal of which country?'
);

-- ========================
-- CARD-TAGS LINKS (NEW)
-- ========================

-- Pokemon cards
INSERT INTO card_tags (card_id, tag_id) VALUES
(16, 41), -- Turtwig
(17, 41); -- Tatsugiri

-- CSS cards
INSERT INTO card_tags (card_id, tag_id) VALUES
(18, 27), -- CSS acronym
(19, 27), -- Center div
(20, 27); -- Select all paragraphs

-- Sports trivia cards
INSERT INTO card_tags (card_id, tag_id) VALUES
(21, 36), -- FIFA World Cup
(22, 36); -- Basketball free throw

-- General trivia cards
INSERT INTO card_tags (card_id, tag_id) VALUES
(23, 38), -- Alaska
(24, 5),  -- Skin -> science
(25, 38), -- Appalachian Trail
(26, 38), -- Flamingos
(27, 23), -- URL -> programming
(28, 10), -- Russia
(29, 38), -- Starburst
(30, 38), -- Zodiac
(31, 9),  -- Yellowstone
(32, 7),  -- Periodic table
(33, 5),  -- Femur
(34, 5),  -- Rainbow
(35, 38), -- Hogwarts
(36, 5),  -- Giant Squid
(37, 10); -- Scotland

COMMIT TRANSACTION;
