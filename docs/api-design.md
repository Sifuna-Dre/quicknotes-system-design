# QuickNotes API Design

## Endpoints

### List Notes

- Method: GET
- Path: /notes
- Description: Returns all notes for the authenticated user.
- Success Status: 200 OK

### Get One Note

- Method: GET
- Path: /notes/{id}
- Description: Returns a specific note.
- Success Status: 200 OK

### Create Note

- Method: POST
- Path: /notes
- Description: Creates a new note.
- Success Status: 201 Created

Request Example:

```json
{
  "title": "Study JavaScript",
  "body": "Review arrays and objects."
}
```

Response Example:

```json
{
  "id": 101,
  "title": "Study JavaScript",
  "body": "Review arrays and objects.",
  "createdAt": "2026-09-29T10:00:00Z"
}
```

### Update Note

- Method: PUT
- Path: /notes/{id}
- Description: Updates an existing note.
- Success Status: 200 OK

### Delete Note

- Method: DELETE
- Path: /notes/{id}
- Description: Deletes a note.
- Success Status: 204 No Content

### List Notes by Tag

- Method: GET
- Path: /notes?tag=study
- Description: Returns notes with a specific tag.
- Success Status: 200 OK

## List Notes Response Example

```json
[
  {
    "id": 1,
    "title": "Shopping List",
    "body": "Milk and Bread"
  },
  {
    "id": 2,
    "title": "Meeting Notes",
    "body": "Project planning session"
  }
]
```

## Error Codes

### 400 Bad Request

```json
{
  "error": "Validation failed"
}
```

### 401 Unauthorized

```json
{
  "error": "Authentication required"
}
```

### 403 Forbidden

```json
{
  "error": "Access denied"
}
```

### 404 Not Found

```json
{
  "error": "Note not found"
}
```

### 500 Internal Server Error

```json
{
  "error": "Unexpected server error"
}
```