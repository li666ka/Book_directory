USE library;

INSERT INTO authors (full_name, born_at, died_at, img_url, info, created_at)
VALUES ('Jack London', '1876-01-12', '1916-11-22', '/Jack_London/Jack_London.jpg',
        'John Griffith Chaney, better known as Jack London, was an American novelist, journalist and activist. A pioneer of commercial fiction and American magazines, he was one of the first American authors to become an international celebrity and earn a large fortune from writing. He was also an innovator in the genre that would later become known as science fiction.',
        '2004-06-19 00:00:00'),

       ('Mark Twain', '1835-11-30', '1910-04-21', '/Mark_Twain/Mark_Twain.jpg',
        'Samuel Langhorne Clemens, known by his pen name Mark Twain, was an American writer, humorist, entrepreneur, publisher, and lecturer. He was lauded as the "greatest humorist the United States has produced", and William Faulkner called him "the father of American literature". His novels include The Adventures of Tom Sawyer (1876) and its sequel, Adventures of Huckleberry Finn (1884), the latter of which has often been called the "Great American Novel".',
        '2015-02-20 00:00:00'),

       ('Stephen King', '1947-09-21', NULL, '/Stephen_King/Stephen_King.jpg',
        'Stephen Edwin King is an American author of horror, supernatural fiction, suspense, crime, science-fiction, and fantasy novels. Described as the "King of Horror", a play on his surname and a reference to his high standing in pop culture, his books have sold more than 350 million copies,[3] and many have been adapted into films, television series, miniseries, and comic books. King has published 64 novels, including seven under the pen name Richard Bachman, and five non-fiction books. He has also written approximately 200 short stories, most of which have been published in book collections',
        '2020-04-03 00:00:00'),

       ('Taras Shevchenko', '1814-03-09', '1861-03-10', '/Taras_Shevchenko/Taras_Shevchenko.jpg',
        'Taras Hryhorovych Shevchenko, also known as Kobzar Taras, or simply Kobzar (a kobzar is a bard in Ukrainian culture), was a Ukrainian poet, writer, artist, public and political figure, folklorist and ethnographer.',
        '2010-04-02 00:00:00'),

       ('Olha Kobylianska', '1863-11-27', '1942-03-21', '/Olha_Kobylianska/Olha_Kobylianska.jpg',
        'Olha Yulianivna Kobylianska was a Ukrainian modernist writer and feminist.', '09-12-10 00:00:00')
;

INSERT INTO books (author_id, title, img_url, description, url, created_at)
VALUES (1, 'Hearts of Three', '/Jack_London/Hearts_of_Three/Hearts_of_Three.jpg',
        'It is an action-packed adventure novel about discovering treasure in foreign lands. A descendant of the pirate Henry Morgan, Francis Morgan overcomes great obstacles in the jungle to find the treasure, only to return to New York to find his family''s fortune threatened-a real Indiana Jones years before his time.',
        '/Jack_London/Hearts_of_Three/Hearts_of_Three.pdf', '2022-05-04 00:00:00'),

       (1, 'The Son of the Wolf', '/Jack_London/The_Son_of_the_Wolf/The_Son_of_the_Wolf.jpg',
        '"The Son Of The Wolf" is a collection of short stories, all with a common subject - the northern part of the American continent, the pursuit of gold during the rush in Yukon, and mainly the dealings between the locals (Native Americans) and the European settlers.',
        '/Jack_London/The_Son_of_the_Wolf/The_Son_of_the_Wolf.pdf', '2022-03-11 00:00:00'),

       (1, 'A Son of the Sun', '/Jack_London/A_Son_of_the_Sun/A_Son_of_the_Sun.jpg',
        'David Grief is a forty-year-old English adventurer who came to the South seas years ago and became rich. As a businessman he owns offices in Sydney, but he is rarely there. Since his wealth spreads over a lot of islands, Grief has some adventures while going among these islands.',
        '/Jack_London/A_Son_of_the_Sun/A_Son_of_the_Sun.pdf', '2023-06-14 00:00:00'),

       (2, 'The Adventures of Tom Sawyer', '/Mark_Twain/The_Adventures_of_Tom_Sawyer/The_Adventures_of_Tom_Sawyer.jpg',
        'The Adventures of Tom Sawyer (1876) and 4. The Adventures of Huckleberry Finn (1884) represent Twain’s rise to literary prominence and maturation as an artist, displaying his genius for dialogue and dialect, unforgettable characters and prescient social commentary cloaked in the awesome spiritual presence of the Mississippi River (to appreciate fully Twain’s devotion to the river, go on to read Life on the Mississippi (1883)). Twain’s love for the river started as a boy, growing up within sight of the Mississippi, and his affair deepened with his stint, cut short by the Civil War, as a river boat pilot. He saw and recalled all matter of humanity from those formative years and poured all of it into these three volumes.',
        '/Mark_Twain/The_Adventures_of_Tom_Sawyer/The_Adventures_of_Tom_Sawyer.pdf', '2003-08-05 00:00:00'),

       (2, 'Roughing It', '/Mark_Twain/Roughing_It/Roughing_It.jpg',
        'Roughing It (1872) is Twain’s second book, a comedic romp through the Wild West with hilarious sketches of the author’s misadventures. The book recounts Twain’s flight from Hannibal to the silver mines of Nevada at the outset of the Civil War. We read of his encounters with Mormons and Pony Express riders, gunslingers and stagecoach drivers along his way. He eventually finds himself in San Francisco and the California goldfields, where he strikes pay dirt with the mining camp tall tale, “The Celebrated Jumping Frog of Calaveras County.” Twain’s West has been mostly ignored in subsequent popular depictions of the frontier, which concentrate on the bold-faced named outlaws, lawmen, and Indians like Jesse James, Wyatt Earp, and Crazy Horse. This is classic early Twain: rowdy, rambunctious and very funny.',
        '/Mark_Twain/Roughing_It/Roughing_It.pdf', '2023-07-23 00:00:00'),

       (3, 'The Shining', '/Stephen_King/The_Shining/The_Shining.jpg',
        'The Shining is a 1977 horror novel by American author Stephen King. It is King''s third published novel and first hardback bestseller; its success firmly established King as a preeminent author in the horror genre. The setting and characters are influenced by King''s personal experiences, including both his visit to The Stanley Hotel in 1974 and his struggle with alcoholism. The novel was adapted into a 1980 film of the same name. The book was followed by a sequel, Doctor Sleep, published in 2013, which was adapted into a film of the same name.',
        '/Stephen_King/The_Shining/The_Shining.pdf', '2020-01-04 00:00:00'),

       (3, 'Doctor Sleep', '/Stephen_King/Doctor_Sleep/Doctor_Sleep.jpg',
        'Doctor Sleep is a 2013 horror novel by American writer Stephen King and the sequel to his 1977 novel The Shining. The book reached the first position on The New York Times Best Seller list for print and ebook fiction (combined), hardcover fiction, and ebook fiction. Doctor Sleep won the 2013 Bram Stoker Award for Best Novel.',
        '/Stephen_King/Doctor_Sleep/Doctor_Sleep.pdf', '2023-03-19 00:00:00'),

       (3, 'The Green Mile', '/Stephen_King/The_Green_Mile/The_Green_Mile.jpg',
        'The Green Mile is a 1996 serial novel by American writer Stephen King. It tells the story of death row supervisor Paul Edgecombe''s encounter with John Coffey, an unusual inmate who displays inexplicable healing and empathetic abilities. The serial novel was originally released in six volumes before being republished as a single-volume work. The book is an example of magical realism.',
        '/Stephen_King/The_Green_Mile/The_Green_Mile.pdf', '2014-05-15 00:00:00'),

       (4, 'Kateryna', '/Taras_Shevchenko/Kateryna/Kateryna.jpg',
        'A story about the unhappy love of a village girl, Katri, who unfortunately fell in love with an officer. Kateryna''s acquaintance with the officer Ivan, his departure and the birth of an illegitimate son in Katra, which caused the condemnation of the entire village.',
        '/Taras_Shevchenko/Kateryna/Kateryna.pdf', '2019-04-07 00:00:00'),

       (4, 'A Dream', '/Taras_Shevchenko/A_Dream/A_Dream.jpg',
        'This is a satire on the despotic regime of Nicholas I. The epigraph to the poem "The Dream" defines the poet''s tasks: to reveal the truth to people, that is, to tell the truth about a society of evil and violence.',
        '/Taras_Shevchenko/A_Dream/A_Dream.pdf', '2021-09-11 00:00:00'),

       (5, 'Valse melancolique', '/Olha_Kobylianska/Valse_melancolique/Valse_melancolique.jpg',
        'The novel depicts the life of three talented intellectuals who rent a house together for study and work: Marta (teacher), Hanna (artist), Sofia (pianist). Each of them strives to find their happiness, to reveal their rich spiritual powers to the fullest. The work begins with the confession of Martha, on whose behalf the story is told. She introduces the reader to the world of music, which is associated with the character of Sofia''s friend. The story of acquaintance follows.',
        '/Olha_Kobylianska/Valse_melancolique/Valse_melancolique.pdf', '2023-08-25 00:00:00')
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
       (1, 'test_user', '$2b$10$MuhF.fcelwibTCxc.L2xFOROQufzjyZs/khKiVZBMn5BjjL79qqvS', '2023-01-18 00:00:00')
;
