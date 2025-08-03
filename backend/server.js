const { app, express } = require("./controller/utils/confServer");
const dotenv = require("dotenv");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const fileUpload = require("express-fileupload");

const corsOptions = {
  origin: `${process.env.FRONTEND_URL}`,
  credentials: true,
};

dotenv.config();
app.use(cors(corsOptions));
app.use(express.json());
app.use(fileUpload());
app.use(cookieParser());
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

const apiRoutes = require("./routes/apiRoutes");

app.use("/api/v1", apiRoutes);

module.exports = app;
