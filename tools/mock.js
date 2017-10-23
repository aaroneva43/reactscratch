/* eslint-disable no-console */
import jsonServer from 'json-server';
import enableDestroy from 'server-destroy';
import chokidar from 'chokidar';
import path from 'path';
import fs from 'fs';
import _ from 'lodash';

let server = null;
const db = './app/api/db.json';
const middlewares = jsonServer.defaults();
let router = jsonServer.router('./app/api/db.json');
const token = "7xPJPuVfTse2pFHc5Pfu";

function isAuthorized(req) {
    return req.get("Authorization") == token;
}

function start() {
    const app = jsonServer.create();
    app.use(middlewares);
    app.use(function (req, res, next) {
        if (req.originalUrl == "/api/v1/auth") {
            return res.send({
                access_token: token
            });
        }
        if (req.originalUrl == '/db' || true/* isAuthorized(req) */) { // add your authorization logic here
            // continue to Mock Server router
            next();
        } else {
            res.sendStatus(401);
        }
    });
    // Add this before app.use(router)
    app.use(jsonServer.rewriter({
        '/api/v1/': '/'
    }));

    app.use(router);
    app.use(jsonServer.router('./app/api/routes.json'));
    server = app.listen(4000, function () {
        console.log('Mock Server is running');
    });
    // Enhance with a destroy function
    enableDestroy(server);
}

// Watch .js or .json file
// Since lowdb uses atomic writing, directory is watched instead of file
chokidar
    .watch(path.dirname(db))
    .on('change', function (file) {
        const obj = JSON.parse(fs.readFileSync(file));
        const isDatabaseDifferent = !_.isEqual(obj, router.db.getState());
        if (isDatabaseDifferent) {
            console.log('File was changed, Reloading...');
            server && server.destroy();
            router = jsonServer.router(obj);
            start();
        }
    });

start();
