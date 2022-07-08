const dotenv = require("dotenv");
const router = require("./server/routes");
const connectDB = require("./server/database/connection");

dotenv.config({ path: "config.env" });
const PORT = process.env.PORT || 5000;

// mongodb connection
connectDB();

router.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
});
