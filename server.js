import "dotenv/config";
import app from "./src/app.js";
import connectDB from "./src/config/db.js";

const PORT = process.env.PORT || 4000;

(async () => {
  await connectDB();

  app.listen(PORT, (POR) => console.log(`Server is running on http://localhost:${PORT}/`));
})();
