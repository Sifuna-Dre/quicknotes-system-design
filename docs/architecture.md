# QuickNotes Architecture

## Functional Requirements

- Users can create notes.
- Users can view notes.
- Users can delete notes.
- Users can search notes.
- Users can organize notes using tags.

## Non-Functional Requirements

- High availability
- Fast response times
- Scalability
- Data durability
- Security

---

## Load Estimate

### Users

1,000,000 users

### Reads Per Second

Assume each user reads 20 notes per day.

20,000,000 reads per day

20,000,000 ÷ 86,400

≈ 231 reads per second

Peak traffic (5×):

≈ 1,155 reads per second

### Writes Per Second

Assume each user creates 2 notes per day.

2,000,000 writes per day

2,000,000 ÷ 86,400

≈ 23 writes per second

### Storage Per Year

Assume each note averages 1 KB.

2,000,000 notes/day × 365

= 730,000,000 notes/year

Approximately 730 GB per year

---

## Architecture Diagram

```text
                     +--------+
                     | Client |
                     +--------+
                          |
                          v
                     +--------+
                     |  DNS   |
                     +--------+
                          |
                          v
                     +--------+
                     |  CDN   |
                     +--------+
                          |
                          v
                  +---------------+
                  | Load Balancer |
                  +---------------+
                     /         \
                    /           \
                   v             v
           +-------------+ +-------------+
           | App Server 1| | App Server 2|
           +-------------+ +-------------+
                    \           /
                     \         /
                      v       v
                    +---------+
                    |  Cache  |
                    +---------+
                         |
                         v
              +-------------------+
              | Primary Database  |
              +-------------------+
                         |
                         v
              +-------------------+
              |   Read Replica    |
              +-------------------+

                         |
                         v
                    +---------+
                    | Queue   |
                    +---------+
                         |
                         v
                    +---------+
                    | Worker  |
                    +---------+
```

## Component Explanations

### Client

The client displays notes and sends requests to the server.

### DNS

DNS converts the application domain name into an IP address.

### CDN

The CDN serves frequently accessed content closer to users.

### Load Balancer

The load balancer distributes traffic across multiple servers.

### App Servers

App servers process requests and business logic.

### Cache

The cache reduces database load by storing frequently requested data.

### Primary Database

The primary database stores application data.

### Read Replica

The read replica handles read traffic and reduces pressure on the primary database.

### Queue

The queue stores background jobs.

### Worker

Workers process background tasks asynchronously.

---

## GET /notes Flow

1. Client sends a request.
2. DNS resolves the application domain.
3. Request passes through the CDN.
4. Load balancer routes traffic.
5. App server checks the cache.
6. If cache miss occurs, data is loaded from the database.
7. Response is returned to the user.
8. Cache is updated.

---

## POST /notes Flow

1. Client submits a new note.
2. Request reaches an app server.
3. Validation is performed.
4. Note is stored in the primary database.
5. Cache is updated or invalidated.
6. Success response is returned.

---

## Trade-Offs

### Cache vs Freshness

Caching improves speed but users may temporarily see stale data.

### Read Replicas vs Consistency

Read replicas improve scalability but may briefly lag behind the primary database.

---

## Avoiding Single Points of Failure

- Multiple application servers prevent a single server failure from taking down the system.
- A load balancer distributes traffic if one server becomes unavailable.
- Read replicas provide redundancy for the database.
- Cached content can continue serving users during temporary backend issues.