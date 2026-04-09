import { Queue } from 'bullmq';

const myQueue = new Queue('myQueue');

const counts = await myQueue.getJobCounts('wait', 'completed', 'failed');
console.log('Counts:', counts);

const waiting = await myQueue.getJobs(['wait'], 0, 100, true);
console.log('Jobs in waiting:', waiting.map(j => ({ id: j.id, name: j.name, data: j.data })));