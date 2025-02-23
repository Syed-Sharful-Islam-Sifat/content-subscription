const { default: mongoose } = require("mongoose");
const User = require("../../models/User");
const getCommonRepository = require("./commonRepository");
const commonRepository = require("./commonRepository");
const HttpError = require("../helpers/HttpError");

const userRepository = {
  createUser: async ({ userName, email, hashedPassword }) => {
    const user = await User.create({
      userName,
      email,
      password: hashedPassword,
    });

    return user;
  },

  findSubsCribedCategories: async ({ id }) => {
    const subscribedCategories = await userRepository.findOne({
      query: { _id: new mongoose.Types.ObjectId(id) },
      select: "subscribedCategories",
    });

    return subscribedCategories;
  },

  findSubscribedCategoriesWithDetails: async (userId) => {
    const result = await User.aggregate([
      {
        $match: {
          _id: new mongoose.Types.ObjectId(userId),
        },
      },
      {
        $unwind: {
          path: "$subscribedCategories",
          preserveNullAndEmptyArrays: true,
        },
      },

      {
        $lookup: {
          from: "categories",
          localField: "subscribedCategories",
          foreignField: "_id",
          as: "subscribedDetails",
        },
      },

      {
        $unwind: {
          path: "$subscribedDetails",
          preserveNullAndEmptyArrays: true,
        },
      },

      {
        $group: {
          _id: "$_id",
          subscribedCategories: {
            $addToSet: "$subscribedDetails",
          },
        },
      },

      {
        $project: {
          _id: 0,
          subscribedCategories: 1,
        },
      },
    ]);

    if (!Array.isArray(result)) {
      throw new HttpError({
        statusCode: 500,
        message: "Internal server error",
      });
    }

    return result[0];
  },

  ...getCommonRepository(User),
};

module.exports = userRepository;
