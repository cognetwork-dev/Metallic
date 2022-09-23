import { prefix } from './config.js';

function getRequestUrl(rawUrl, isFirstRequest, origin) {
    const url = rawUrl.split(prefix)[1]

    if (isFirstRequest)
        return new URL(url);

    //const noProtogen = url.replace(/https?:\/\//g, '');

   // return new URL(`${origin}/${noProtogen}`);

   return new URL(url);
}

export { getRequestUrl };