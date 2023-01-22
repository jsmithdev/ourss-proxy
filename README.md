# ourss-proxy

Simple reverse proxy for lambda

> Written in common as serverless-http doesn't support ESM yet 😢

## Purpose

I use for my podcast pwa <https://ourss.app> when a feed's server fails / doesn't have CORS setup correctly

## Build

`npm run build`

This creates a zip file to upload to AWS Lambda

## Usage

For using client side, here's an example of getting RSS / XML (text) back

- `proxy` is your url the proxy is deployed to
- `url` is the url of the resource you want

```js
async function getTestRss(proxy, url){

    const endpoint = `${proxy}?url=${encodeURIComponent(url)}`;

    const response = await fetch(endpoint);
    
    const data = await response.text();
    
    console.log(`Have ${typeof data} of ${data.length} length`);
}

```

---

Written with haste by [Jamie Smith](https://jsmith.dev)
