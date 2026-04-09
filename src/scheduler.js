import { Queue } from 'bullmq';

const myQueue = new Queue('myQueue');

async function addJobs() {
    await myQueue.add('myJobName', { foo: 'bar' }
        , { removeOnComplete: 15 }
    )
}

await addJobs();
process.exit(0);