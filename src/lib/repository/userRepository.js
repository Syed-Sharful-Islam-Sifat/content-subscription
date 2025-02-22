const User = require("../../models/User");

const userRepository = {
  findOne: async ({ query, select }) => {
    return await User.findOne(query).select(select);
  },

  createUser: async ({ userName, email, hashedPassword }) => {
    const user = await User.create({
      userName,
      email,
      password: hashedPassword,
    });

    return user;
  },
};

module.exports = userRepository;
