const express = require( "express" );
const cors = require( "cors" );
const dotenv = require("dotenv");
const routes = require( "./routes/routes" );
const connectDb = require("./configDB/connectdb");
const app = express();
app.use(express.json());
app.use(cors());
const port = 5000;
dotenv.config();
connectDb();
app.use( express.urlencoded( { extended: false } ) );
app.set("view engine", "jade");
app.use("/",routes)

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message,
      status: error.status,
    },
  });
});
app.listen(port);
