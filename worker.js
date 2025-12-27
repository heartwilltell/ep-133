/**
 * Cloudflare Worker for EP-133 Frontend
 * Serves static assets and handles routing for Astro SSG site
 */

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);

    // Security headers
    const securityHeaders = {
      'X-Frame-Options': 'DENY',
      'X-Content-Type-Options': 'nosniff',
      'Referrer-Policy': 'strict-origin-when-cross-origin',
      'Permissions-Policy': 'camera=(), microphone=(), geolocation=()',
    };

    try {
      // Get the asset from the site bucket
      let response = await env.ASSETS.fetch(request);

      // If not found, try with .html extension (for clean URLs)
      if (response.status === 404 && !url.pathname.includes('.')) {
        const htmlPath = url.pathname.endsWith('/')
          ? `${url.pathname}index.html`
          : `${url.pathname}.html`;

        const htmlRequest = new Request(
          new URL(htmlPath, url.origin),
          request
        );
        response = await env.ASSETS.fetch(htmlRequest);
      }

      // If still not found, try the 404 page
      if (response.status === 404) {
        const notFoundRequest = new Request(
          new URL('/404.html', url.origin),
          request
        );
        response = await env.ASSETS.fetch(notFoundRequest);
      }

      // Clone response and add security headers
      response = new Response(response.body, response);
      Object.entries(securityHeaders).forEach(([key, value]) => {
        response.headers.set(key, value);
      });

      // Add caching headers for static assets
      if (url.pathname.match(/\.(js|css|png|jpg|jpeg|gif|svg|woff|woff2|ttf|ico)$/)) {
        response.headers.set('Cache-Control', 'public, max-age=31536000, immutable');
      } else {
        response.headers.set('Cache-Control', 'public, max-age=3600, must-revalidate');
      }

      return response;
    } catch (error) {
      return new Response('Internal Server Error', {
        status: 500,
        headers: securityHeaders
      });
    }
  },
};
