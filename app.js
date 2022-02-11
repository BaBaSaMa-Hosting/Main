const BABASAMA_COM_KEY_PATH = '/etc/letsencrypt/live/babasama.com/privkey.pem';
const BABASAMA_COM_CERT_PATH = '/etc/letsencrypt/live/babasama.com/fullchain.pem';
const HOMEMANAGEMENT_APP_KEY_PATH = '/etc/letsencrypt/live/home-management.app/privkey.pem';
const HOMEMANAGEMENT_APP_CERT_PATH = '/etc/letsencrypt/live/home-management.app/fullchain.pem';

const fs = require('fs');
const path = require('path');
const vhost = require('fastify-vhost');
const https = require('https');
const serverFactory = (handler, opts) => {
    t.ok(opts.serverFactory)

    console.log(handler);

    const options = {
        key: fs.readFileSync(BABASAMA_COM_KEY_PATH),
        cert: fs.readFileSync(BABASAMA_COM_CERT_PATH)
    }

    const server = https.createServer(options, (req, res) => {
        handler(req, res)
    })

    return server
}

const fastify = require('fastify') ({logger: true, serverFactory});

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