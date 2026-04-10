# BullMQ + Redis + Node.js

A study project to learn and demonstrate the use of [BullMQ](https://docs.bullmq.io/), a Node.js job queue library built on Redis.

## About

This project demonstrates the complete lifecycle of job queue management, covering:

- Scheduling jobs into the queue
- Asynchronous job processing by workers
- Real-time event monitoring
- Queue statistics
- Retrying failed jobs

## Prerequisites

- [Node.js](https://nodejs.org/) v18 or higher
- [Docker](https://www.docker.com/) and Docker Compose

## Installation

```bash
# Install dependencies
npm install

# Start Redis via Docker
docker compose up -d
```

## Usage

```bash
node index.js <option>
```

| Option | Description | File |
|--------|-------------|------|
| `1` | Add jobs to the queue | `src/scheduler.js` |
| `2` | Start a worker to process jobs from the queue | `src/worker.js` |
| `3` | Display queue statistics | `src/stats.js` |
| `4` | Retry failed or completed jobs | `src/retry.js` |
| `5` | Listen to queue events in real time | `src/listener.js` |

### Basic flow

```bash
# Terminal 1 — start the worker (keeps running, waiting for jobs)
node index.js 2

# Terminal 2 — add jobs to the queue
node index.js 1

# Terminal 2 — check queue statistics
node index.js 3
```

## Project structure

```
bullMQ/
├── docker-compose.yml   # Starts Redis on port 6379
├── index.js             # Entry point with CLI menu
├── package.json
└── src/
    ├── scheduler.js     # Creates and enqueues jobs
    ├── worker.js        # Consumes and processes jobs from the queue
    ├── stats.js         # Queries job counts and waiting jobs
    ├── retry.js         # Reprocesses failed or completed jobs
    └── listener.js      # Listens to queue events via QueueEvents
```

## Concepts covered

**Queue (`scheduler.js`)** — creates a queue and adds jobs with a payload and options like `removeOnComplete`.

**Worker (`worker.js`)** — processes jobs asynchronously. Uses `IORedis` with `maxRetriesPerRequest: null` for BullMQ compatibility.

**Stats (`stats.js`)** — queries job counts by state (`wait`, `completed`, `failed`) and lists waiting jobs.

**Retry (`retry.js`)** — fetches a job by ID and re-queues it, whether it failed or already completed.

**QueueEvents (`listener.js`)** — listens to real-time events such as `waiting`, `active`, `completed`, and `failed`.

## Main dependencies

| Package | Version | Role |
|---------|---------|------|
| `bullmq` | ^5.73.3 | Core job queue library |
| `ioredis` | ^5.10.1 | Redis client used internally |

## Redis

Redis runs via Docker and persists data in a named volume (`redis_data`):

```bash
# Start
docker compose up -d

# Stop
docker compose down

# Stop and delete all data
docker compose down -v
```
