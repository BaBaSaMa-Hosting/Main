const path = require('path');
const vhost = require('fastify-vhost');
const fastify = require('fastify')({
    logger: true
});

fastify.register(require('fastify-static'), {
    root: path.join(__dirname, 'public'),
    prefix: '/'
});

fastify.get('/', async (request, reply) => {
    reply.code(200).sendFile('index.html');
});

fastify.get('/about_me', async (request, reply) => {
    reply.code(200).sendFile('about_me.html');
});

fastify.get('/projects', async (request, reply) => {
    reply.code(200).sendFile('projects.html');
});

fastify.get('/learn', async (request, reply) => {
    reply.code(200).sendFile('learn.html');
});

const start = async () => {
    await fastify.register(require('middie'))
    fastify.use(require('cors')())
    await fastify.listen(3001, '0.0.0.0')
        .then((address) => console.log(`server is listening on ${address}`))
        .catch(err => {
            console.log('error starting server: ', err);
            process.exit(1);
        });
}
start();
