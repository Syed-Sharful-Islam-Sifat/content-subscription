const { default: mongoose } = require("mongoose");
const categoryRepositroy = require("../repository/categoryRepository");
const HttpError = require("../helpers/HttpError");
const { validateId } = require("../validators/CommonValidator");
const userRepository = require("../repository/userRepository");
const { sendEmailToUser } = require("./emailServices");

const getCategory = () => {
  const categories = categoryRepositroy.findMany({ select: "name" });

  return categories;
};

const subscribeToCategory = async (req, res) => {
  const { categoryId } = req.body;

  const { id, email } = req.user;
  await validateId(categoryId);

  const userSubscribedCategory = await userRepository.findSubsCribedCategories({
    id,
  });

  const { subscribedCategories } = userSubscribedCategory;

  if (subscribedCategories.includes(categoryId)) {
    throw new HttpError({
      statusCode: 409,
      message: "You have already subscribed to this category",
    });
  }
  const result = await userRepository.updateOne({
    query: {
      _id: new mongoose.Types.ObjectId(id),
    },
    value: {
      $push: {
        subscribedCategories: new mongoose.Types.ObjectId(categoryId),
      },
    },
  });

  if (result.modifiedCount == 0) {
    throw new HttpError({ statusCode: 404, message: "Category not found" });
  }

  const category = await categoryRepositroy.findOne({
    query: { _id: new mongoose.Types.ObjectId(categoryId) },
    select: "name",
  });

  const mailOptions = {
    from: process.env.Email,
    to: email,
    subject: "Confirmation email from content-subscription",
    text: `You have successfuly subscribed to ${category.name} contents. You will get ${category.name} related content from now`,
  };
  await sendEmailToUser({ mailOptions });
  res.message =
    "You have successfully subscribed to selected category, for confirmation check your email";
};

module.exports = { getCategory, subscribeToCategory };
