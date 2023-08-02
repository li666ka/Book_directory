USE booklist;

INSERT INTO authors (full_name, born_at, died_at, info, image_file, created_at)
VALUES ('Jack London',
        '1876-01-12',
        '1916-11-22',
        'John Griffith Chaney, better known as Jack London, was an American novelist, journalist and activist. A pioneer of commercial fiction and American magazines, he was one of the first American authors to become an international celebrity and earn a large fortune from writing. He was also an innovator in the genre that would later become known as science fiction.',
        '5c3a2129-86b8-4a57-9036-caaa741eddd0.jpg',
        '2004-06-19 00:00:00'),

       ('Mark Twain',
        '1835-11-30',
        '1910-04-21',
        'Samuel Langhorne Clemens, known by his pen name Mark Twain, was an American writer, humorist, entrepreneur, publisher, and lecturer. He was lauded as the "greatest humorist the United States has produced", and William Faulkner called him "the father of American literature". His novels include The Adventures of Tom Sawyer (1876) and its sequel, Adventures of Huckleberry Finn (1884), the latter of which has often been called the "Great American Novel".',
        '61fbac7f-3c7b-4243-8152-efac765bdb0a.jpg',
        '2015-02-20 00:00:00'),

       ('Stephen King',
        '1947-09-21',
        NULL,
        'Stephen Edwin King is an American author of horror, supernatural fiction, suspense, crime, science-fiction, and fantasy novels. Described as the "King of Horror", a play on his surname and a reference to his high standing in pop culture, his books have sold more than 350 million copies,[3] and many have been adapted into films, television series, miniseries, and comic books. King has published 64 novels, including seven under the pen name Richard Bachman, and five non-fiction books. He has also written approximately 200 short stories, most of which have been published in book collections',
        'cdca67fc-f84a-469f-8cbb-1f3727fe0b2f.jpg',
        '2020-04-03 00:00:00'),

       ('Taras Shevchenko',
        '1814-03-09',
        '1861-03-10',
        'Taras Hryhorovych Shevchenko, also known as Kobzar Taras, or simply Kobzar (a kobzar is a bard in Ukrainian culture), was a Ukrainian poet, writer, artist, public and political figure, folklorist and ethnographer.',
        'a7627274-207d-4c25-a97b-12879d2cbbfa.jpg',
        '2010-04-02 00:00:00'),

       ('Olha Kobylianska',
        '1863-11-27',
        '1942-03-21',
        'Olha Yulianivna Kobylianska was a Ukrainian modernist writer and feminist.',
        '9c0f4801-eaf5-40f0-915a-7b3233ea6b06.jpg',
        '09-12-10 00:00:00')
;

INSERT INTO books (author_id, title, description, image_file, book_file, created_at)
VALUES
    -- Jack_London
    (1, 'Hearts of Three',
     'It is an action-packed adventure novel about discovering treasure in foreign lands. A descendant of the pirate Henry Morgan, Francis Morgan overcomes great obstacles in the jungle to find the treasure, only to return to New York to find his family''s fortune threatened-a real Indiana Jones years before his time.',
     'ecb93dfc-abc5-415b-8644-15b927040472.jpg',
     '59367480-b9ad-491c-9c93-ef51b32a7084.pdf',
     '2022-05-04 00:00:00'),

    (1, 'The Son of the Wolf',
     '"The Son Of The Wolf" is a collection of short stories, all with a common subject - the northern part of the American continent, the pursuit of gold during the rush in Yukon, and mainly the dealings between the locals (Native Americans) and the European settlers.',
     'a37bef38-44c4-41e5-8885-0f5449987f9e.jpg',
     'b68838da-91a0-4af9-b29d-0b817c4da792.pdf',
     '2022-03-11 00:00:00'),

    (1, 'A Son of the Sun',
     'David Grief is a forty-year-old English adventurer who came to the South seas years ago and became rich. As a businessman he owns offices in Sydney, but he is rarely there. Since his wealth spreads over a lot of islands, Grief has some adventures while going among these islands.',
     '9180f1e7-e6be-48b6-8f47-2ee5cfc2ca1a.jpg',
     '3fc5d41c-7f81-4440-9d21-7fdeb8df329e.pdf',
     '2023-06-14 00:00:00'),
    -- End

    -- Mark Twain
    (2, 'The Adventures of Tom Sawyer',
     'The Adventures of Tom Sawyer (1876) and 4. The Adventures of Huckleberry Finn (1884) represent Twain’s rise to literary prominence and maturation as an artist, displaying his genius for dialogue and dialect, unforgettable characters and prescient social commentary cloaked in the awesome spiritual presence of the Mississippi River (to appreciate fully Twain’s devotion to the river, go on to read Life on the Mississippi (1883)). Twain’s love for the river started as a boy, growing up within sight of the Mississippi, and his affair deepened with his stint, cut short by the Civil War, as a river boat pilot. He saw and recalled all matter of humanity from those formative years and poured all of it into these three volumes.',
     '08c45044-43c3-43a4-8677-09281861a30a.jpg',
     'db352322-0427-4707-ba6b-512391094f1f.pdf',
     '2003-08-05 00:00:00'),

    (2, 'Roughing It',
     'Roughing It (1872) is Twain’s second book, a comedic romp through the Wild West with hilarious sketches of the author’s misadventures. The book recounts Twain’s flight from Hannibal to the silver mines of Nevada at the outset of the Civil War. We read of his encounters with Mormons and Pony Express riders, gunslingers and stagecoach drivers along his way. He eventually finds himself in San Francisco and the California goldfields, where he strikes pay dirt with the mining camp tall tale, “The Celebrated Jumping Frog of Calaveras County.” Twain’s West has been mostly ignored in subsequent popular depictions of the frontier, which concentrate on the bold-faced named outlaws, lawmen, and Indians like Jesse James, Wyatt Earp, and Crazy Horse. This is classic early Twain: rowdy, rambunctious and very funny.',
     '720a43ed-a410-451a-8108-5fa8cd0138f7.jpg',
     'ca161bc0-13b7-4ce6-8f6b-dbde8b9525dd.pdf',
     '2023-07-23 00:00:00'),
    -- End

    -- Stephen King
    (3, 'The Shining',
     'The Shining is a 1977 horror novel by American author Stephen King. It is King''s third published novel and first hardback bestseller; its success firmly established King as a preeminent author in the horror genre. The setting and characters are influenced by King''s personal experiences, including both his visit to The Stanley Hotel in 1974 and his struggle with alcoholism. The novel was adapted into a 1980 film of the same name. The book was followed by a sequel, Doctor Sleep, published in 2013, which was adapted into a film of the same name.',
     '0fabea9d-f6b0-40a0-9808-114ceb7fbb6f.jpg',
     '27b5efba-f922-4418-8c49-2ee441f3bbc1.pdf',
     '2020-01-04 00:00:00'),

    (3, 'Doctor Sleep',
     'Doctor Sleep is a 2013 horror novel by American writer Stephen King and the sequel to his 1977 novel The Shining. The book reached the first position on The New York Times Best Seller list for print and ebook fiction (combined), hardcover fiction, and ebook fiction. Doctor Sleep won the 2013 Bram Stoker Award for Best Novel.',
     'fde92a2b-72a8-4c94-978d-c4285515e095.jpg',
     '0e6a0725-2427-47b3-9182-4e653fc4a5d4.pdf',
     '2023-03-19 00:00:00'),

    (3, 'The Green Mile',
     'The Green Mile is a 1996 serial novel by American writer Stephen King. It tells the story of death row supervisor Paul Edgecombe''s encounter with John Coffey, an unusual inmate who displays inexplicable healing and empathetic abilities. The serial novel was originally released in six volumes before being republished as a single-volume work. The book is an example of magical realism.',
     '107f4003-73c2-4288-bd18-e576123e8449.jpg',
     '835ead82-d805-4390-9945-9fd933e8e272.pdf',
     '2014-05-15 00:00:00'),
    -- End

    -- Taras_Shevchenko
    (4, 'Kateryna',
     'A story about the unhappy love of a village girl, Katri, who unfortunately fell in love with an officer. Kateryna''s acquaintance with the officer Ivan, his departure and the birth of an illegitimate son in Katra, which caused the condemnation of the entire village.',
     'ef1de38c-54f5-4afc-915b-854b45e22597.jpg',
     'eb87feba-64e2-41b4-9070-27649123ab7a.pdf',
     '2019-04-07 00:00:00'),

    (4, 'A Dream',
     'This is a satire on the despotic regime of Nicholas I. The epigraph to the poem "The Dream" defines the poet''s tasks: to reveal the truth to people, that is, to tell the truth about a society of evil and violence.',
     '1bc76755-cdfc-497a-8945-f629c9da93f4.jpg',
     'eda32b0a-aec8-4f1a-a3b9-1f8c447f71e4.pdf',
     '2021-09-11 00:00:00'),
    -- End

    -- Olha Kobylianska
    (5, 'Valse melancolique',
     'The novel depicts the life of three talented intellectuals who rent a house together for study and work: Marta (teacher), Hanna (artist), Sofia (pianist). Each of them strives to find their happiness, to reveal their rich spiritual powers to the fullest. The work begins with the confession of Martha, on whose behalf the story is told. She introduces the reader to the world of music, which is associated with the character of Sofia''s friend. The story of acquaintance follows.',
     '4a97eb37-721c-4bc1-847b-3ae49cfd869d.jpg',
     'c57e8de2-29e0-4f78-b10e-90f9d61c7e8c.pdf',
     '2023-08-25 00:00:00')
    -- End
;

INSERT INTO genres (name)
VALUES ('adventure'),
       ('novel'),
       ('collection'),
       ('satire'),
       ('autobiographical'),
       ('horror'),
       ('psychological'),
       ('magic realism'),
       ('poem'),
       ('comedy'),
       ('novella'),
       ('music')
;

INSERT INTO books_genres (book_id, genre_id)
VALUES (1, 1),
       (1, 2),
       (2, 1),
       (2, 3),
       (3, 1),
       (3, 2),
       (4, 1),
       (4, 2),
       (4, 4),
       (5, 1),
       (5, 2),
       (5, 5),
       (6, 2),
       (6, 6),
       (6, 7),
       (7, 2),
       (7, 6),
       (8, 2),
       (8, 8),
       (9, 9),
       (10, 9),
       (10, 10),
       (11, 11),
       (11, 12)
;

INSERT INTO roles (name)
VALUES ('user'),
       ('moderator'),
       ('admin')
;

INSERT INTO statuses (name)
VALUES ('planned'),
       ('reading'),
       ('dropped'),
       ('on hold'),
       ('completed')
;

INSERT INTO users (role_id, username, password, created_at)
VALUES (3, 'admin', '$2b$10$A0wPUFoa9YzvbfcJCONnQujDovH3fd8/DJ0Dnle/HUAOX4.KwWDUi', '2023-01-11 00:00:00'),
       (1, 'user1', '$2b$10$MuhF.fcelwibTCxc.L2xFOROQufzjyZs/khKiVZBMn5BjjL79qqvS', '2023-01-18 00:00:00'),
       (1, 'user2', '$2b$10$MuhF.fcelwibTCxc.L2xFOROQufzjyZs/khKiVZBMn5BjjL79qqvS', '2023-01-18 00:00:00')
;

INSERT INTO booklist_items (user_id, book_id, status_id)
VALUES
    -- user1
    (2, 7, 1),
    (2, 8, 5),
    -- user 2
    (3, 9, 2),
    (3, 11, 4)
;

INSERT INTO reviews (user_id, book_id, score, comment, created_at)
VALUES
    -- user1
    (2, 8, 8, 'Love King and his horrors', '2023-01-11 00:00:00'),
    -- user 2
    (3, 9, 7, 'Feel so upset', '2023-01-11 00:00:00'),
    (3, 11, 10, null, '2023-01-11 00:00:00')
;
