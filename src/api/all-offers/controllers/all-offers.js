module.exports = {
  async getAll(ctx) {
    // Home screen offer
    const homeEntries = await strapi.entityService.findMany(
      "api::home-screen-offer.home-screen-offer",
      {
        populate: "*",
        limit: 1,
      }
    );
    const home = homeEntries?.[0] || null;

    // Checkout offer with CouponItem populated
    const checkoutEntries = await strapi.entityService.findMany(
      "api::checkout-offers.checkout-offers",
      {
        populate: {
          CouponItem: true, // 👈 ensures relation/component is included
        },
        limit: 1,
      }
    );
    const checkout = checkoutEntries?.[0] || null;

    // Offer pages pagination
    const { page = 1, pageSize = 10 } = ctx.query.pagination || ctx.query;
    const pageNum = Number(page);
    const limit = Number(pageSize);
    const start = (pageNum - 1) * limit;

    const total = await strapi.db.query("api::offer-pages.offer-pages").count();

    const allPages = await strapi.entityService.findMany(
      "api::offer-pages.offer-pages",
      {
        populate: { item: true },
        start,
        limit,
      }
    );

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
