/**
 * Modified from https://www.npmjs.com/package/vite-plugin-generate-file
 */

import fs, { writeFile } from 'fs';
import path, { resolve, relative } from 'path';
// @ts-ignore
import ejs from 'ejs';
// @ts-ignore
import * as mime from 'mime-types';

function ensureDirectoryExistence(filePath: any) {
    const dirname = path.dirname(filePath);
    if (fs.existsSync(dirname)) {
        return;
    }
    ensureDirectoryExistence(dirname);
    fs.mkdirSync(dirname);
}

const listTemplate = "<!DOCTYPE html>\n<html lang=\"en\">\n<head>\n    <meta charset=\"UTF-8\">\n    <title>Generate File List</title>\n<body>\n<h1>Generate File List</h1>\n<div>\n    <ul>\n        <% Object.keys(generateFiles).forEach(key => { %>\n            <li><a href='<%= key %>'><%= generateFiles[key].output %></a></li>\n        <% }) %>\n    </ul>\n</div>\n</body>\n</html>\n";

let config: any;
let distPath: any;
const generateFileMap = /* @__PURE__ */ new Map();
function normalizeOption(option: any) {
    const generateFileOption = {
        output: "./output.txt",
        template: "",
        ...option
    };
    const fullPath = resolve(distPath, generateFileOption.output);
    const relativePath = `/${relative(distPath, fullPath)}`;
    const contentType = generateFileOption.contentType || mime.lookup(generateFileOption.output || "") || "text/plain";
    return {
        ...generateFileOption,
        contentType,
        fullPath,
        relativePath
    };
}
function generateContent(option: any) {
    return option.data;
}
function generateFile(option: any) {
    const filePath = option.fullPath;
    const fileContent = generateContent(option);
    ensureDirectoryExistence(filePath);
    writeFile(filePath, fileContent, { flag: "w" }, (error) => {
        if (error) {
            throw error;
        }
        console.log(`Generate File to ${filePath}`);
    });
}
function configureServer(server: any) {
    // @ts-ignore
    server.middlewares.use("/__generate_file_list", (req: any, res: any) => {
        res.writeHead(200, { "Content-Type": "text/html" });
        res.write(
            ejs.render(listTemplate, {
                generateFiles: Object.fromEntries(generateFileMap)
            })
        );
        res.end();
    });
    server.middlewares.use((req: any, res: any, next: any) => {
        const uri = new URL(req.originalUrl, `http://${req.headers.host}`);
        const pathname = uri.pathname;
        if (generateFileMap.has(pathname)) {
            const option = generateFileMap.get(pathname);
            const content = generateContent(option);
            res.writeHead(200, {
                "Content-Type": option.contentType
            });
            res.write(content);
            res.end();
        } else {
            next();
        }
    });
    const _print = server.printUrls;
    server.printUrls = () => {
        let host = `${config.server.https ? "https" : "http"}://localhost:${config.server.port || "80"}`;
        const url = server.resolvedUrls?.local[0];
        if (url) {
            try {
                const u = new URL(url);
                host = `${u.protocol}//${u.host}`;
            } catch (error) {
                console.warn("Parse resolved url failed:", error);
            }
        }
        _print();
        const colorUrl = (url2: any) => url2.replace(/:(\d+)\//, (_: any, port: any) => `:${port}/`);
        console.log(
            `  ${"\u279C"}  ${"Generate File List"}: ${colorUrl(
                `${host}/__generate_file_list/`
            )}`
        );
    };
}
function PluginGenerateFile(options: any) {
    return {
        name: "vite-plugin-generate-file",
        configResolved(resolvedConfig: any) {
            config = resolvedConfig;
            distPath = resolve(config.root, config.build.outDir);
            if (Array.isArray(options)) {
                options.forEach((option) => {
                    const simpleOption = normalizeOption(option);
                    generateFileMap.set(simpleOption.relativePath, simpleOption);
                });
            } else {
                const simpleOption = normalizeOption(options);
                generateFileMap.set(simpleOption.relativePath, simpleOption);
            }
        },
        closeBundle() {
            if (config.command === "serve") {
                return;
            }
            //@ts-ignore
            for (const option of generateFileMap.values()) {
                generateFile(option);
            }
        },
        configureServer
    };
}

export { PluginGenerateFile as generateFile };