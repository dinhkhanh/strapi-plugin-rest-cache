'use strict';

/**
 * @typedef {import('../../types').CacheRouteConfig} CacheRouteConfig
 */

/**
 * Check if a custom route is registered in strapi
 *
 * @param {Strapi} strapi
 * @param {CacheRouteConfig} route
 * @return {boolean}
 */
function routeExists(strapi, route) {
  // check api routes
  const match = strapi.server.listRoutes().find(
    (routeLayer) =>
      routeLayer.methods.includes(route.method) &&
      routeLayer.path.match(new RegExp(`^${route.path}/?`)) // match with optional leading slash
  );

  return Boolean(match);
}

module.exports = { routeExists };
