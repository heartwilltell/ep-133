/**
 * Cloudflare Worker for EP-133 Frontend
 * Serves static assets and handles routing for Astro SSG site
 */

export default {
  async fetch(request, env, _ctx) {
    const url = new URL(request.url);
    const isProd = env.ENVIRONMENT === 'production';

    // Enhanced security headers
    const securityHeaders = {
      'X-Frame-Options': 'DENY',
      'X-Content-Type-Options': 'nosniff',
      'Referrer-Policy': 'strict-origin-when-cross-origin',
      'Permissions-Policy': 'camera=(), microphone=(), geolocation=()',
      'X-XSS-Protection': '1; mode=block',
      // Content Security Policy
      'Content-Security-Policy': [
        "default-src 'self'",
        "script-src 'self' 'unsafe-inline' 'unsafe-eval'",
        "style-src 'self' 'unsafe-inline'",
        "img-src 'self' data: https:",
        "font-src 'self' data:",
        "connect-src 'self' " + env.PAYLOAD_URL,
        "frame-ancestors 'none'",
        "base-uri 'self'",
        "form-action 'self'"
      ].join('; '),
    };

    // Add HSTS header for production HTTPS
    if (isProd && url.protocol === 'https:') {
      securityHeaders['Strict-Transport-Security'] = 'max-age=31536000; includeSubDomains; preload';
    }

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
        response = new Response(response.body, {
          ...response,
          status: 404,
          statusText: 'Not Found'
        });
      }

      // Clone response and add security headers
      response = new Response(response.body, response);
      Object.entries(securityHeaders).forEach(([key, value]) => {
        response.headers.set(key, value);
      });

      // Enhanced caching headers for different asset types
      const pathname = url.pathname.toLowerCase();

      // Long-term cache for versioned assets
      if (pathname.match(/\.(js|css|woff|woff2|ttf|eot)$/)) {
        response.headers.set('Cache-Control', 'public, max-age=31536000, immutable');
      }
      // Long-term cache for images
      else if (pathname.match(/\.(png|jpg|jpeg|gif|svg|webp|avif|ico)$/)) {
        response.headers.set('Cache-Control', 'public, max-age=31536000, immutable');
      }
      // Medium cache for HTML
      else if (pathname.match(/\.html?$/) || !pathname.includes('.')) {
        response.headers.set('Cache-Control', 'public, max-age=3600, must-revalidate');
      }
      // Short cache for other files
      else {
        response.headers.set('Cache-Control', 'public, max-age=1800');
      }

      return response;
    } catch (error) {
      console.error('Worker error:', error);
      return new Response('Internal Server Error', {
        status: 500,
        headers: securityHeaders
      });
    }
  },
};
