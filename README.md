<div align="center">
<img height="150px" src="https://raw.githubusercontent.com/Metallic-Web/Metallic/main/src/assets/logo.svg">
<h1>Metallic</h1>
<h3>A powerful web proxy build for speed and customization.</h3>
<p>Access the web with this stylish new web proxy service made in React supporting many sites. Metallic was originally created for <a href="https://github.com/titaniumnetwork-dev">TN</a>'s proxathon where it won 2nd place!</p>
</div>

<p align="center">
<a href="https://repl.it/github/Metallic-Web/Metallic"><img height="30px" src="https://raw.githubusercontent.com/FogNetwork/Tsunami/main/deploy/replit2.svg"><img></a>
<a href="https://glitch.com/edit/#!/import/github/Metallic-Web/Metallic"><img height="30px" src="https://raw.githubusercontent.com/FogNetwork/Tsunami/main/deploy/glitch2.svg"><img></a>
<a href="https://railway.app/new/template?template=https://github.com/Metallic-Web/Metallic"><img height="30px" src="https://raw.githubusercontent.com/FogNetwork/Tsunami/main/deploy/railway2.svg"><img></a>
<a href="https://app.koyeb.com/deploy?type=git&repository=github.com/Metallic-Web/Metallic&branch=main&name=Metallic"><img height="30px" src="https://raw.githubusercontent.com/FogNetwork/Tsunami/main/deploy/koyeb2.svg"><img></a>
</p>

## Features
- Simple clean design
- Support for many popular sites
- Customizable interface
- Mobile support
- Expansive library of themes

## Setup
### Run
Run `npm start` to start a webserver and the Bare server. You may deploy Metallic by using an external bare server and a static file host. Metallic must be built before attempting to start.

### Build
Run `npm run build` to build app for production to the `build` folder.

### Development
Run `npm run dev` to run the app in development mode.

### Deploy
Click a button at the top of this page and follow the directions for an easy way to host Metallic.

## Configuration

### Obfuscation
File: [/src/consts.js](https://github.com/Metallic-Web/Metallic/blob/main/src/consts.js)

`const obfuscation = true | false;` - Choose to obfuscate text

### Block List
File: [/blocklist/block.json](https://github.com/Metallic-Web/Metallic/blob/main/blocklist/block.json)

`[host, sub.host, host...]` - An Array of hostnames to block (also include subdomains)

### Github and Discord
File: [/src/consts.js](https://github.com/Metallic-Web/Metallic/blob/main/src/consts.js)

`const github = "string";` - Update the Github links

`const discord = "string";` - Update the Discord link

### Bare Servers
File: [/src/consts.js](https://github.com/Metallic-Web/Metallic/blob/main/src/consts.js)

`const bareServerURL = new URL(url);` - Main bare server and Stomp bare server


File: [/public/uv/uv.config.js](https://github.com/Metallic-Web/Metallic/blob/main/public/uv/uv.config.js)

`bare: url,` - Ultraviolet bare server


File: [/public/dip/dip.config.js](https://github.com/Metallic-Web/Metallic/blob/main/public/dip/dip.config.js)

`bare: {`

`    version: 1 | 2,` - DIP bare version

`    path: url,` - DIP bare server

`}`


File: [/public/aero/config.js](https://github.com/Metallic-Web/Metallic/blob/main/public/aero/config.js)

`const backends = [url];` - Aero bare server


## Changelog/Roadmap
Check out the [changelog](https://github.com/Metallic-Web/Metallic/blob/main/CHANGELOG.md) and the [roadmap](https://github.com/orgs/Metallic-Web/projects/1/views/1).

## Pages
Pages are is the order of 1, 2, 3 etc.

- `/` - Home
- `1.html` - Apps
- `2.html` - Games
- `3 (and 3.html)` - Redirects to /3/1.html
    - `3/1.html` - Search
    - `3/2.html` - Tab
    - `3/3.html` - Appearance
    - `3/4.html` - UI
- `4.html` - Privacy
- `5.html` - Credits
- `6.html` - Support
- `*` - Error

## License
Metallic uses the MIT license.
