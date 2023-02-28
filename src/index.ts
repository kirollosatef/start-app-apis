import app from "./configs/app";
import dotenv from "dotenv";

dotenv.config();

const PORT = (process.env.PORT as unknown as Number) || 3000;

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
