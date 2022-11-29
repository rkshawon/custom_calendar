const WalletModel = require("../modal/wallet");
const TransactionModel = require("../modal/transaction");
const moment = require("moment");

const getAllWalletInfo = async (req, res) => {
  try {
    const data = await WalletModel.find(req.params.id);
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json(err);
  }
};

const getWalletInfo = async (req, res) => {
  try {
    const data = await WalletModel.findById(req.params.id);
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json(err);
  }
};

const addAmountToWallet = async (req, res) => {
  try {
    const wallet = new WalletModel({
      Amount: req.body.amount,
    });
    const data = await wallet.save();
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json(err);
  }
};

const updateAmountToWallet = async (req, res) => {
  try {
    const wdata = await WalletModel.findById(req.params.id);
    let newAmount = wdata.Amount + req.body.amount;
    await WalletModel.findByIdAndUpdate(req.params.id, {
      Amount: newAmount,
    });
    res.status(200).json("Update Successfull");
  } catch (err) {
    res.status(500).json(err);
  }
};

const addTransaction = async (req, res) => {
  try {
    const transaction = new TransactionModel({
      total: req.body.total,
      wallet_id: req.body.wallet_id,
      type: req.body.type,
      date: new Date(),
    });
    const tdata = await transaction.save();
    const wdata = await WalletModel.findById(req.body.wallet_id);
    let newAmount = wdata.Amount - req.body.total;
    await WalletModel.findByIdAndUpdate(req.body.wallet_id, {
      Amount: newAmount,
    });
    res.status(200).json(tdata);
  } catch (err) {
    res.status(500).json(err);
  }
};
const modifyData = (data) => {
  const mdata = data.map((d) => {
    const { total: amount, type, date, _id } = d;
    return {
      amount,
      type,
      date: moment(date).format("YYYY-MM-DD"),
      _id,
    };
  });
  return mdata;
};
const getTransactionList = async (req, res) => {
  try {
    const data = await TransactionModel.find({
      wallet_id: req.params.id,
    });
    const modifiedData = modifyData(data);
    res.status(200).json(modifiedData);
  } catch (err) {
    res.status(500).json(err);
  }
};

module.exports = {
  getAllWalletInfo,
  getWalletInfo,
  addAmountToWallet,
  updateAmountToWallet,
  addTransaction,
  getTransactionList,
};
