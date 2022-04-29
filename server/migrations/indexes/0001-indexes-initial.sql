CREATE TABLE IF NOT EXISTS collection_tag_idx
(
    tag        TEXT    NOT NULL,
    collection INTEGER NOT NULL
);

CREATE TABLE IF NOT EXISTS page_tag_idx
(
    tag  TEXT    NOT NULL,
    page INTEGER NOT NULL
);

CREATE TABLE IF NOT EXISTS collection_heads_idx
(
    collection INTEGER NOT NULL,
    page       INTEGER NOT NULL
);

CREATE TABLE IF NOT EXISTS collection_tails_idx
(
    collection INTEGER NOT NULL,
    page       INTEGER NOT NULL
);
