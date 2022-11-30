const WalletModel = require("../modal/wallet");
const TransactionModel = require("../modal/transaction");
const moment = require("moment");

let current = moment().format("YYYY-MM-DD").toString();
const pastSeven = moment(current)
  .subtract(30, "days")
  .format("YYYY-MM-DD")
  .toString();

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
      date: new Date(req.body.date),
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
// const filterData = (data) => {
//   const mdata = data.map((d) => {
//     const { total: amount, type, date, _id } = d;
//     return {
//       amount,
//       type,
//       date: moment(date).format("YYYY-MM-DD"),
//       _id,
//     };
//   });
//   return mdata;
// };

const modifyData = (sdate, edate, month, data) => {
  // let current = moment().format("YYYY-MM-DD").toString();
  // const pastSeven = moment(current)
  //   .subtract(30, "days")
  //   .format("YYYY-MM-DD")
  //   .toString();

  let sd = moment(sdate || pastSeven, "YYYY-MM-DD");
  let ed = moment(edate || current, "YYYY-MM-DD");

  const numberOfDays = moment(month, "YYYY-MM").daysInMonth();
  const dateDifference = moment.duration(ed.diff(sd)).asDays();

  const newDateArray = [];
  if (month) {
    for (let i = 0; i < numberOfDays; i++) {
      const dates = moment(month)
        .add(i, "days")
        .format("YYYY-MM-DD")
        .toString();
      newDateArray.push(dates);
    }
  } else
    for (let i = 0; i <= dateDifference; i++) {
      const dates = moment(sdate || pastSeven)
        .add(i, "days")
        .format("YYYY-MM-DD")
        .toString();
      newDateArray.push(dates);
    }

  const checkAmount = (date) => {
    let total_amount = 0;
    let employee_salary_amount = 0;
    let office_expense_amount = 0;

    data?.forEach((element) => {
      // if (category !== "all") {
      //   if (
      //     category === element.type &&
      //     date === moment(element.date).format("YYYY-MM-DD")
      //   ) {
      //     total_amount += element.total;
      //     office_expense_amount += element.total;
      //     employee_salary_amount += element.total;
      //   }
      // } else {
      if (date === moment(element.date).format("YYYY-MM-DD")) {
        if (element.type === "employee salary")
          employee_salary_amount += element.total;
        if (element.type === "office expense")
          office_expense_amount += element.total;
        total_amount += element.total;
      }
    });
    return { total_amount, employee_salary_amount, office_expense_amount };
  };
  const finalArray = [];
  newDateArray?.forEach((date) => {
    const getAmount = checkAmount(date);
    finalArray.push({ ...getAmount, date });
  });
  return finalArray;
};

const getTransactionList = async (req, res) => {
  let sdate = req.query.sdate;
  let edate = req.query.edate;
  let month = req.query.month;
  let start, end;

  if (month) {
    start = new Date(month + "-01");
    const numberOfDays = moment(month, "YYYY-MM").daysInMonth();
    end = new Date(month + "-" + numberOfDays);
  } else {
    start = new Date(sdate || pastSeven);
    end = new Date(edate || current);
  }

  try {
    const data = await TransactionModel.find({
      wallet_id: req.params.id,
      date: {
        $gte: start,
        $lt: end,
      },
    });

    const modifiedData = modifyData(sdate, edate, month, data);
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
