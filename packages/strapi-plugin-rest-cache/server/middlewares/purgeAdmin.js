/**
 * @param {{ }} options
 * @param {{ strapi: import('@strapi/strapi').Strapi }} context
 */
module.exports = (options, { strapi }) => {
  const cacheConfig = strapi
    .plugin('strapi-plugin-rest-cache')
    .service('cacheConfig');

  return async (ctx, next) => {
    // uid:
    // - application::sport.sport
    // - plugins::users-permissions.user
    const { model: uid, ...params } = ctx.params;

    if (!uid) {
      await next();
      return;
    }

    if (!cacheConfig.isCached(uid)) {
      await next();
      return;
    }

    await next();

    if (!(ctx.status >= 200 && ctx.status <= 300)) return;

    await cacheConfig.clearCache(uid, params);
  };
};