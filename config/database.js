const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

mongoose
  .connect("mongodb://127.0.0.1/todo-list")
  .then(() => {
    console.log("Conectado ao banco");
  })
  .catch((err) => {
    console.log(err);
  });

  //user:password@127.0.0.1:27017/test'