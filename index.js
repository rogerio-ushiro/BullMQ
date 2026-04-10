
if (!process.argv[2]) {
    console.log(`
╔══════════════════════════════════════════════════════╗
║                                                      ║
║        Welcome to BullMQ + Redis + Node.js           ║
║                                                      ║
╠══════════════════════════════════════════════════════╣
║                                                      ║
║   Usage: node index.js <option>                      ║
║   Example: node index.js 1                           ║
║                                                      ║
║    1 — add jobs to the queue                         ║
║    2 — run and keep processing jobs from the queue   ║
║    3 — get queue statistics                          ║
║    4 — retry failed jobs                             ║
║    5 — keep listening for jobs                       ║
║                                                      ║
╚══════════════════════════════════════════════════════╝
`);
} else {
    switch (process.argv[2]) {
        case '1':
            await import('./src/scheduler.js');
            break;
        case '2':
            await import('./src/worker.js');
            break;
        case '3':
            await import('./src/stats.js');
            break;
        case '4':
            await import('./src/retry.js');
            break;
        case '5 ':
            await import('./src/listener.js');
            break;
        default:
            console.log('Unknown argument. Please, try again.');
            break;
    }
}