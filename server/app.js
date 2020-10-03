var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
// graphql and cors setup
var { graphqlHTTP } = require("express-graphql");
var schema = require("./graphql/bookSchemas");
var cors = require("cors");

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");

var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

// connect graphql and use cors
app.use("*", cors());
app.use(
  "/graphql",
  cors(),
  graphqlHTTP({
    schema: schema,
    rootValue: global,
    graphiql: true,
  })
);

// mongoose connection setup
var mongoose = require("mongoose");
const mongoURI =
  "mongodb://localhost:27017/hitech?readPreference=primary&appname=MongoDB%20Compass&ssl=false";

mongoose
  .connect(mongoURI, {
    promiseLibrary: require("bluebird"),
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("connection successful"))
  .catch((err) => console.error(err));

app.use("/", indexRouter);
app.use("/users", usersRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
