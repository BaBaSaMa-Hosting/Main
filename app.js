const BABASAMA_COM_KEY_PATH = '/etc/letsencrypt/live/babasama.com/privkey.pem';
const BABASAMA_COM_CERT_PATH = '/etc/letsencrypt/live/babasama.com/fullchain.pem';

const fs = require('fs');
const path = require('path');
const vhost = require('fastify-vhost');
const fastify_http = require('fastify')({
    logger: true
});
const fastify = require('fastify')({
    logger: true,
    https: {
        allowHTTP1: true,
        key: fs.readFileSync(BABASAMA_COM_KEY_PATH),
        cert: fs.readFileSync(BABASAMA_COM_CERT_PATH)
    }
});

fastify_http.get("/", async (request, reply) => {
    reply.redirect(`https://${request.hostname}`)
});

fastify.register(require('fastify-static'), {
    root: path.join(__dirname, 'public'),
    prefix: '/'
});

fastify.addHook('onRequest', async (request, reply) => {
    if (request.raw.socket.servername === "home-management.app") {
        return reply.redirect(`https://home-management.app:3001${request.raw.url}`);
    }
})

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
    upstream: "http://babasama.com:3001",
    host: 'home-management.babasama.com'
});

const start = async () => {
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