# QuickNotes Data Model

## Entities

### Users

| Column | Type | Key |
|----------|----------|----------|
| id | INTEGER | Primary Key |
| username | TEXT | |
| email | TEXT | UNIQUE |

### Notes

| Column | Type | Key |
|----------|----------|----------|
| id | INTEGER | Primary Key |
| user_id | INTEGER | Foreign Key |
| title | TEXT | |
| body | TEXT | |
| created_at | DATETIME | |

### Tags

| Column | Type | Key |
|----------|----------|----------|
| id | INTEGER | Primary Key |
| name | TEXT | UNIQUE |

### Note_Tags

| Column | Type | Key |
|----------|----------|----------|
| note_id | INTEGER | Foreign Key |
| tag_id | INTEGER | Foreign Key |

---

## Relationships

### One-to-Many

A user can create many notes.

One note belongs to one user.

### Many-to-Many

A note can have many tags.

A tag can belong to many notes.

The note_tags table is a join table that connects notes and tags.

---

## SQL Schema

```sql
CREATE TABLE users (
    id INTEGER PRIMARY KEY,
    username TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL
);

CREATE TABLE notes (
    id INTEGER PRIMARY KEY,
    user_id INTEGER NOT NULL,
    title TEXT NOT NULL,
    body TEXT,
    created_at DATETIME,
    FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE tags (
    id INTEGER PRIMARY KEY,
    name TEXT UNIQUE NOT NULL
);

CREATE TABLE note_tags (
    note_id INTEGER,
    tag_id INTEGER,
    PRIMARY KEY (note_id, tag_id),
    FOREIGN KEY (note_id) REFERENCES notes(id),
    FOREIGN KEY (tag_id) REFERENCES tags(id)
);
```

---

## Example Queries

### Get all notes for a user

```sql
SELECT *
FROM notes
WHERE user_id = 1;
```

### Get notes and their tags

```sql
SELECT n.title, t.name
FROM notes n
JOIN note_tags nt
ON n.id = nt.note_id
JOIN tags t
ON nt.tag_id = t.id;
```

### Count notes per user

```sql
SELECT user_id, COUNT(*) AS note_count
FROM notes
GROUP *Y user_id;
```

---

## Index Reco*mendation

```sql
CREATE INDEX idx*notes_user_id
ON notes(user_id);
`*`

This index improves performance*when retrieving notes for a specif*c user.

---

## SQL or NoSQL?

I *ould choose SQL for QuickNotes because the relationships between users, notes and tags are highly structured. SQL databases provide foreign keys, joins and strong data consistency, which are important for maintaining accurate relationships between records. NoSQL could work for simple document storage, but SQL is a better fit because of the relational nature of the data.