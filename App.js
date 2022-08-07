if (process.env) require("dotenv").config();

const express = require("express");
const app = express();
const port = process?.env?.PORT || 3000;
const cors = require("cors");

const userRouter = require("./routes/userRouter");
const drugRouter = require("./routes/drugRouter");
const orderRouter = require("./routes/orderRouter");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
    res.send("Hello World!");
});

app.use("/users", userRouter);
app.use("/drugs", drugRouter);
app.use('/orders', orderRouter)

app.listen(port, () => {
    console.log(`App listening on port ${port}`);
});
