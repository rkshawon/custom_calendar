const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const wModel = new Schema(
  {
    Amount: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

const walletModel = mongoose.model("wallet", wModel);
module.exports = walletModel;
