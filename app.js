const fs = require('fs');
const path = require('path');
const vhost = require('fastify-vhost');
const fastify = require('fastify') ({
    logger: true,
    https: {
        allowHTTP1: true,
        key: fs.readFileSync('/etc/letsencrypt/live/babasama.com/privkey.pem'),
        cert: fs.readFileSync('/etc/letsencrypt/live/babasama.com/fullchain.pem')
    }
});

const fastify_http = require('fastify') ({
    logger: true
});

fastify_http.get('/', async (request, reply) => {
    if (request.hostname === "babasama.com") {
        reply.redirect(`https://www.${request.hostname}`)
    }
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

fastify.register(vhost, {
    upstream: "http://babasama.com:3002",
    host: 'phantom.babasama.com'
});

fastify.register(vhost, {
    upstream: "http://babasama.com:3003",
    host: 'api.babasama.com'
});

fastify.register(vhost, {
    upstream: "http://babasama.com:3004",
    host: 'notification.babasama.com'
});

fastify.register(vhost, {
    upstream: "http://babasama.com:3005",
    host: 'storage.babasama.com'
});

const start = async() => {
    await fastify.register(require('middie'))
    fastify.use(require('cors')())
    await fastify.listen(443, '0.0.0.0')
    .then((address) => console.log(`server is listening on ${address}`))
    .catch(err => {
        console.log('error starting server: ', err);
        process.exit(1);
    });

    await fastify_http.listen(80, '0.0.0.0')
    .then((address) => console.log(`server is listening on ${address}`))
    .catch(err => {
        console.log('error starting server: ', err);
        process.exit(1);
    });
}
start();
