const express = require("express");
const morgan = require("morgan");

const app = express();

const booksRouter = require("./resources/Books/router");
const petsRouter = require("./resources/Pets/router");

app.use(morgan("dev"));
app.use(express.json());

//Routes
app.use("/books", booksRouter);
app.use("/pets", petsRouter);

app.all("*", (req, res) => {
  res.json({ msg: true });
});

//run server
const port = 3030;

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
