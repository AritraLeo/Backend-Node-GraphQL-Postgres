---

# Backend-Node-GraphQL-Postgres

This repository contains the backend of a social media app built with **Node.js**, **GraphQL**, and **PostgreSQL**. The backend is containerized using **Docker** for easy setup and management. The service is designed for reusability in various projects.

## Setup Instructions

### 1. Run PostgreSQL Server in Docker

Start the Postgres server using Docker Compose:

```bash
docker compose up -d
```

### 2. Check Running Containers

Verify that the Postgres container is running:

```bash
docker ps
```

### 3. Access the PostgreSQL Container

To enter the running container, use:

```bash
docker exec -it [container-id] bash
```

Replace `[container-id]` with the ID from the `docker ps` output.

### 4. Connect to the PostgreSQL Database

Once inside the container:

```bash
su postgres
psql
```

### 5. PostgreSQL Commands

- List all databases:

  ```bash
  \l
  ```

- Connect to a specific database:

  ```bash
  \c [database-name]
  ```

- Display information about tables:

  ```bash
  \d
  ```

- Enable cross-column display (to view more columns in query results):

  ```bash
  \x
  ```

Now you can execute your queries on the database!

---
