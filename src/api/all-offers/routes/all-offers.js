module.exports = {
  routes: [
    {
      method: "GET",
      path: "/all-offers",
      handler: "all-offers.getAll",
      config: {
        auth: false,
      },
    },
  ],
};
