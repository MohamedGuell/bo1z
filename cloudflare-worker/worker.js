// Cloudflare Worker Reverse Proxy for BO1 Zombies
// Allows playing at work / school by bypassing domain filters and CORS restrictions.

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    // Handle CORS preflight
    if (request.method === 'OPTIONS') {
      return new Response(null, {
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET, HEAD, POST, OPTIONS',
          'Access-Control-Allow-Headers': '*',
          'Access-Control-Max-Age': '86400',
        },
      });
    }

    // Route /packs/ to R2 cdn.vel.gg, and everything else to vel.gg
    let targetUrl;
    if (url.pathname.startsWith('/packs/')) {
      targetUrl = 'https://cdn.vel.gg' + url.pathname + url.search;
    } else {
      // Forward path to vel.gg
      targetUrl = 'https://vel.gg' + url.pathname + url.search;
    }

    const modifiedHeaders = new Headers(request.headers);
    modifiedHeaders.set('Origin', 'https://vel.gg');
    modifiedHeaders.set('Referer', 'https://vel.gg/bo1z/');

    try {
      const response = await fetch(targetUrl, {
        method: request.method,
        headers: modifiedHeaders,
        body: request.method !== 'GET' && request.method !== 'HEAD' ? request.body : undefined,
        redirect: 'follow',
      });

      const newHeaders = new Headers(response.headers);
      newHeaders.set('Access-Control-Allow-Origin', '*');
      newHeaders.set('Access-Control-Allow-Methods', 'GET, HEAD, POST, OPTIONS');
      newHeaders.set('Access-Control-Allow-Headers', '*');
      newHeaders.set('Cross-Origin-Opener-Policy', 'same-origin');
      newHeaders.set('Cross-Origin-Embedder-Policy', 'require-corp');
      newHeaders.set('Cross-Origin-Resource-Policy', 'cross-origin');

      return new Response(response.body, {
        status: response.status,
        statusText: response.statusText,
        headers: newHeaders,
      });
    } catch (err) {
      return new Response(`Proxy Error: ${err.message}`, { status: 502 });
    }
  },
};
