CREATE TABLE IF NOT EXISTS collection
(
    /* Primary key */
    id            INTEGER PRIMARY KEY ASC AUTOINCREMENT,
    /* Creation time */
    creation_time INTEGER NOT NULL,
    /* JSON tags */
    tags          TEXT    NOT NULL,
    description   TEXT    NOT NULL,
    /* Misc JSON data */
    data          TEXT    NOT NULL,
    /* Original JSON data */
    original      TEXT    NOT NULL
);

CREATE TABLE IF NOT EXISTS post
(
    /* Primary key */
    id            INTEGER PRIMARY KEY ASC AUTOINCREMENT,
    /* Creation time */
    creation_time INTEGER NOT NULL,
    /* Optional collection */
    collection    INTEGER NULL REFERENCES collection (id) ON DELETE SET NULL,
    /* Rating (Explicit=0, Questionable=1, Safe=2) */
    rating        INTEGER NOT NULL CHECK (rating >= 0 AND rating <= 2),
    /* File name */
    file_name     TEXT    NOT NULL,
    /* JSON tags */
    tags          TEXT    NOT NULL,
    /* Description */
    description   TEXT    NOT NULL,
    /* Misc JSON data */
    data          TEXT    NOT NULL,
    /* Original JSON data */
    original      TEXT    NOT NULL
);

CREATE TABLE IF NOT EXISTS post_chain
(
    id         INTEGER PRIMARY KEY ASC AUTOINCREMENT,
    left_post  INTEGER NOT NULL REFERENCES post (id),
    right_post INTEGER NOT NULL REFERENCES post (id)
);

-- CREATE TRIGGER IF NOT EXISTS post_chain_update
--     BEFORE UPDATE OF left_post, right_post
--     ON post_chain
--     WHEN NOT EXISTS(
--             SELECT c.id
--             FROM collection c
--             WHERE id = (SELECT p1.collection from post p1 WHERE p1.id = left_post)
--               AND id = (SELECT p2.collection from post p2 WHERE p2.id = right_post)
--         )
-- BEGIN
--     RAISE (FAIL, 'Posts are from different collections');
-- END;
