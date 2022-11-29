const express = require("express");
const router = express.Router();
const walletController = require("../controller/walletController");

router.get("/wallet/:id", walletController.getWalletInfo);
router.get("/wallet", walletController.getAllWalletInfo);
router.post("/wallet", walletController.addAmountToWallet);
router.put("/wallet/:id", walletController.updateAmountToWallet);

router.post("/transaction", walletController.addTransaction);
router.get("/transaction/:id", walletController.getTransactionList);

module.exports = router;
