<div align="center">
<img height="150px" src="https://raw.githubusercontent.com/cognetwork-dev/Metallic/main/src/assets/logo.svg">
<h1>Metallic</h1>
<h3>A powerful web proxy built for speed and customization.</h3>
<p>Access the web with this stylish web proxy made in Preact supporting many sites. Metallic was originally created for <a href="https://github.com/titaniumnetwork-dev">TN</a>'s proxathon where it won 2nd place!</p>
</div>

<p align="center">
<a href="https://glitch.com/edit/#!/import/github/cognetwork-dev/Metallic"><img height="30px" src="https://raw.githubusercontent.com/FogNetwork/Tsunami/main/deploy/glitch2.svg"><img></a>
<a href="https://railway.app/new/template?template=https://github.com/cognetwork-dev/Metallic"><img height="30px" src="https://raw.githubusercontent.com/FogNetwork/Tsunami/main/deploy/railway2.svg"><img></a>
<a href="https://app.koyeb.com/deploy?type=git&repository=github.com/cognetwork-dev/Metallic&branch=main&name=Metallic"><img height="30px" src="https://raw.githubusercontent.com/FogNetwork/Tsunami/main/deploy/koyeb2.svg"><img></a>
</p>

## Features
- Modern, clean design
- Support for many popular sites
- Customizable interface
- Mobile support
- Expansive library of themes

## Setup

> [!TIP]
> Run `npm install` to install the required dependencies.

**Run**

Run `npm start` to start the server. If no build if found, Metallic will attempt to build.

**Build**

Run `npm run build` to build app for production into the `build` folder.

**Development**

Run `npm run dev` to run the app in development mode. Rammerhead will not work in this mode.

## Configuration

**Themes**

Themes can be changed from the [/src/themes.json](https://github.com/cognetwork-dev/Metallic/blob/main/src/themes.json) file. The file should be an array of objects using the format below.

> [!IMPORTANT]  
> Themes file will validated before building, starting the server, or starting the dev server.

```json
{
    "name": "string", /* Display name of theme */
    "id": "string", /* Unique ID of theme */
    "theme": {
        "background": "string", /* Background color of site */
        "secondary": "string", /* Buttons and inputs */
        "primary": "string", /* Icons amd logo */
        "text": "string", /* Text color */
        "textInverse": "string", /* Text color for buttons and inputs */
        "font": "string" /* Font for website (default is Roboto) */
    },
    "custom": {
        "selector": {
            "property": "string"
        }
    }
}
```

## Changelog/Roadmap
Check out the [changelog and roadmap](https://github.com/cognetwork-dev/Metallic/blob/main/CHANGELOG.md)

## License
Metallic uses the MIT license.
