const { createChatGPTAnswer } = require("../controllers/GetChatGPT");

const router = require("express").Router();

router.post("/", createChatGPTAnswer);


module.exports = router;