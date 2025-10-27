module.exports = {
  async getAll(ctx) {
    const home = await strapi.db
      .query("api::home-screen-offer.home-screen-offer")
      .findOne();

    const checkout = await strapi.db
      .query("api::checkout-offers.checkout-offers")
      .findOne();

    // ✅ Parse pagination parameters (compatible with ?pagination[page]=1&pagination[pageSize]=10)
    const { page = 1, pageSize = 10 } = ctx.query.pagination || ctx.query;

    const pageNum = Number(page);
    const limit = Number(pageSize);
    const start = (pageNum - 1) * limit;

    // ✅ Get total count
    const total = await strapi.db.query("api::offer-pages.offer-pages").count();

    // ✅ Get paginated records
    const allPages = await strapi.entityService.findMany(
      "api::offer-pages.offer-pages",
      {
        populate: { item: true },
        start,
        limit,
      }
    );

    // ✅ Compute pagination metadata
    const pageCount = Math.ceil(total / limit);

    ctx.body = {
      home_screen_offer: { data: home, meta: {} },
      checkout_offers: { data: checkout, meta: {} },
      all_offer_pages: {
        data: allPages,
        meta: {
          pagination: {
            page: pageNum,
            pageSize: limit,
            pageCount,
            total,
          },
        },
      },
    };
  },
};
