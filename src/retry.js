import { Queue, Job } from 'bullmq';

const queue = new Queue('myQueue');

// Get a failed job by ID
const job = await Job.fromId(queue, 'job-id');

// Retry a failed job (default state is 'failed')
await job.retry();

// Retry a completed job
await job.retry('completed');