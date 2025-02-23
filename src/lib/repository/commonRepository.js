const { default: mongoose } = require("mongoose");
const { findById } = require("../../models/User");

const getCommonRepository = (Model) => ({
  findOne: async ({ query = {}, select = {} }) => {
    return await Model.findOne(query).select(select);
  },

  findMany: async ({ query = {}, select = {} }) => {
    return await Model.find(query).select(select);
  },

  findById: async ({ id, select = {} }) => {
    return await Model.findById(id).select(select);
  },

  updateOne: async ({ query = {}, value = {}, options = {} }) => {
    return await Model.updateOne(query, value, options);
  },
});
module.exports = getCommonRepository;
