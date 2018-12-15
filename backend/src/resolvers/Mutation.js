const Mutations = {
  async createItem(parent, args, ctx, info) {
    //TODO implement authentication
    const item = await ctx.db.mutation.createItem(
      {
        data: { ...args }
      },
      info
    );

    return item;
  },

  updateItem(parent, args, ctx, info) {
    // get copy of args
    const updates = { ...args };

    //remove id
    delete updates.id;

    return ctx.db.mutation.updateItem(
      {
        data: updates,
        where: {
          id: args.id
        }
      },
      info
    );
  }
};

module.exports = Mutations;
