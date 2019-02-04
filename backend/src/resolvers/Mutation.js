const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

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
  },
  async deleteItem(parent, args, ctx, info) {
    const where = { id: args.id };

    //Find item
    const item = await ctx.db.query.item({ where }, `{id, title}`);

    //TODO Check if user owns item or has permissions to delete

    //delete it
    return ctx.db.mutation.deleteItem(
      {
        where
      },
      info
    );
  },
  async signup(parent, args, ctx, info) {
    // avoids issues with login if people use mixed case or all caps
    args.email = args.email.toLowerCase();

    // hash the password
    const password = await bcrypt.hash(args.password, 10);

    //create user in the database
    const user = await ctx.db.mutation.createUser(
      {
        data: {
          ...args,
          password,
          permissions: { set: ["USER"] }
        }
      },
      info
    );
    // Create the JWT token for user
    const token = jwt.sign({ userId: user.id }, process.env.APP_SECRET);

    // Set the jwt as a cookie on response
    ctx.response.cookie("token", token, {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24 * 365 // 1=year cookie
    });

    // Return User to browser
    return user;
  }
};

module.exports = Mutations;
