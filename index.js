require('dotenv').config()

const express = require("express")
const app = express()
const PORT = process.env.PORT || 80

const cors = require("cors")
const rateLimit = require("express-rate-limit")

// Imported Routes
const ChatGPTRoute = require("./src/routes/ChatGPT.js")

const requestRateLimit = rateLimit({
    windowMs: 10 * 60 * 1000, // 10 Minutes
    max: 50,
    standardHeaders: true,
    legacyHeaders: false,
})

app.use(express.json())

const environment = process.env.ENVIRONMENT;
let origin;

if (environment === "dev") {
    origin = "https://codepen.io";
} else if (environment === "prod") {
    origin = "https://codepen.io";
} else {
    origin = "https://codepen.io";
}

app.use(cors({ origin: origin, credentials: true }))

app.listen(PORT, () => {
    console.log(`Starting ChatGPT on port ${PORT}`)
})

// Routes
app.use("/api/chatgpt", /*AuthAccessToken,*/ ChatGPTRoute)
