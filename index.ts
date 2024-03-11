import { createServer } from 'node:http';
import express from 'express';
import fs from "fs";
import { execSync } from "child_process";
import chalk from "chalk";
import path from 'path';
import { createBareServer } from '@tomphttp/bare-server-node';
//@ts-ignore
import { epoxyPath } from "@mercuryworkshop/epoxy-transport";
import wisp from "wisp-server-node";
import { Request, Response } from "express";
//@ts-ignore
import { Socket, Head } from "ws";
import createRammerhead from 'rammerhead/src/server/index.js';
import pages from "./src/pages.json";
import themes from "./src/themes.json";

const __dirname = path.resolve();

if (!fs.existsSync("build")) {
	console.log("No build found. Building...");
	execSync("npm run build");
	console.log("Built!");
}

const port = process.env.PORT || 8080;

const rh = createRammerhead();

const rammerheadScopes = [
	"/rammerhead.js",
	"/hammerhead.js",
	"/transport-worker.js",
	"/task.js",
	"/iframe-task.js",
	"/worker-hammerhead.js",
	"/messaging",
	"/sessionexists",
	"/deletesession",
	"/newsession",
	"/editsession",
	"/needpassword",
	"/syncLocalStorage",
	"/api/shuffleDict"
];

const rammerheadSession = /^\/[a-z0-9]{32}/;

function shouldRouteRh(req: Request) {
	const url = new URL(req.url, 'http://0.0.0.0');
	return (
		rammerheadScopes.includes(url.pathname) ||
		rammerheadSession.test(url.pathname)
	);
}

function routeRhRequest(req: Request, res: Response) {
	rh.emit("request", req, res);
}

function routeRhUpgrade(req: Request, socket: Socket, head: Head) {
	rh.emit("upgrade", req, socket, head);
}

const app = express();

app.use(express.static("build"));
app.use("/epoxy/", express.static(epoxyPath));

app.use((req: Request, res: Response) => {
	if (pages.includes(req.url)) {
		return res.sendFile(__dirname + "/build/index.html");
	} else {
		return res.status(404).sendFile(__dirname + "/build/index.html");
	}
});

const server = createServer();

const bare = createBareServer('/bare/');

server.on('request', (req: Request, res: Response) => {
	if (bare.shouldRoute(req)) {
		bare.routeRequest(req, res);
	} else if (shouldRouteRh(req)) {
		routeRhRequest(req, res);
	} else {
		app(req, res);
	}
});

server.on('upgrade', (req: Request, socket: Socket, head: Head) => {
	if (req.url && req.url.endsWith("/wisp/")) {
    	wisp.routeRequest(req, socket, head);
	} else if (bare.shouldRoute(req)) {
		bare.routeUpgrade(req, socket, head);
	} else if (shouldRouteRh(req)) {
		routeRhUpgrade(req, socket, head);
	} else {
		socket.end();
	}
});

server.on('listening', () => {
	const theme = chalk.hex(themes.filter((theme) => theme.id = "default")[0].theme.primary);
	console.log(`${chalk.bold(theme('Metallic'))}`)

	console.log(
		`- ${chalk.bold('Local:')} http://localhost:${port}`
	);

	if (process.env.REPL_SLUG && process.env.REPL_OWNER) {
		console.log(
			`- ${chalk.bold('Replit:')} https://${process.env.REPL_SLUG}.${process.env.REPL_OWNER}.repl.co`
		);
	}

	if (process.env.HOSTNAME && process.env.GITPOD_WORKSPACE_CLUSTER_HOST) {
		console.log(
			`- ${chalk.bold('Gitpod:')} https://${port}-${process.env.HOSTNAME}.${process.env.GITPOD_WORKSPACE_CLUSTER_HOST}`
		);
	}
});

server.listen({
	port: port
});