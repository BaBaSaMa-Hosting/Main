import { readFileSync } from 'fs';
import { join } from 'path';
import vhost from 'fastify-vhost';
import Fastify from 'fastify';
import fastifyStatic from 'fastify-static';

const fastify = Fastify ({
    logger: true,
    https: {
        allowHTTP1: true,
        key: readFileSync('/etc/letsencrypt/live/babasama.com/privkey.pem'),
        cert: readFileSync('/etc/letsencrypt/live/babasama.com/fullchain.pem')
    }
});

fastify.get('/', async (request, reply) => {
    reply.code(200).send('Hello World');
});

fastify.register(fastifyStatic, {
    root: join(__dirname, 'public'),
    prefix: '/'
});

fastify.register(vhost, {
    upstream: "http://babasama.com:3001",
    host: 'portfolio.babasama.com'
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

const start = async() => {
    await fastify.register(require('middie'))
    fastify.use(require('cors')())
    await fastify.listen(443, '0.0.0.0')
    .then((address) => console.log(`server is listening on ${address}`))
    .catch(err => {
        console.log('error starting server: ', err);
        process.exit(1);
    });
}
start();
