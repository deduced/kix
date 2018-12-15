const { forwardTo } = require("prisma-binding");

const Query = {
  //Forwards query to db. Works since query is same in prisma as in yoga
  items: forwardTo("db"),
  item: forwardTo("db")

  //Does same as above but verbose (no forwarding)
  // async items(parent, args, ctx, info) {
  //   const items = await ctx.db.query.items();

  //   return items;
  // }
};

module.exports = Query;
