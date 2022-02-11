const BABASAMA_COM_KEY_PATH = '/etc/letsencrypt/live/babasama.com/privkey.pem';
const BABASAMA_COM_CERT_PATH = '/etc/letsencrypt/live/babasama.com/fullchain.pem';
const HOMEMANAGEMENT_APP_KEY_PATH = '/etc/letsencrypt/live/home-management.app/privkey.pem';
const HOMEMANAGEMENT_APP_CERT_PATH = '/etc/letsencrypt/live/home-management.app/fullchain.pem';

const fs = require('fs');
const path = require('path');
const vhost = require('fastify-vhost');
const fastify = require('fastify')({
    logger: true,
    https: {
        allowHTTP1: true,
        key: fs.readFileSync(BABASAMA_COM_KEY_PATH),
        cert: fs.readFileSync(BABASAMA_COM_CERT_PATH)
    }
});

const fastify_http = require('fastify')({
    logger: true
});

fastify_http.get('/', async (request, reply) => {
    reply.redirect(`https://${request.hostname}`)
});

fastify.register(require('fastify-static'), {
    root: path.join(__dirname, 'public'),
    prefix: '/'
});

fastify.addHook('preParsing', async (request, reply, payload) => {
    let new_payload = payload;

    console.log(payload);
    if (request.hostname.includes("babasama.com")) {
        new_payload.server.key = fs.readFileSync(BABASAMA_COM_KEY_PATH);
        new_payload.server.cert = fs.readFileSync(BABASAMA_COM_CERT_PATH);
    } else if (request.hostname.includes("home-management.app")) {
        new_payload.server.key = fs.readFileSync(HOMEMANAGEMENT_APP_KEY_PATH);
        new_payload.server.cert = fs.readFileSync(HOMEMANAGEMENT_APP_CERT_PATH);
    }

    return new_payload;
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