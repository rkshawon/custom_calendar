const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const tModel = new Schema(
  {
    total: {
      type: Number,
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    wallet_id: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const transactionModel = mongoose.model("transaction", tModel);
module.exports = transactionModel;
