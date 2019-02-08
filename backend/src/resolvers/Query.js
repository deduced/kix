const { forwardTo } = require("prisma-binding");

const Query = {
  //Forwards query to db. Works since query is same in prisma as in yoga
  items: forwardTo("db"),
  item: forwardTo("db"),
  itemsConnection: forwardTo("db"),
  me: function(parent, args, ctx, info) {
    // userId should be parsed and passed in by express middleware if user logged in
    // exits if no userId
    if (!ctx.request.userId) {
      return null;
    }

    return ctx.db.query.user(
      {
        where: { id: ctx.request.userId }
      },
      info
    );
  }
};

module.exports = Query;
