import { app } from "./app.js";
import {DB_NAME} from './constants.js';
import {connectDB} from 'handle-backbone';

const uri = `${process.env.MONGODB_URI}/${DB_NAME}`;
const PORT = process.env.PORT || 8000;

connectDB(uri)
  .then(() => {
    app.on("error", (error) => {
      console.error("Err: App is not listening", error);
      throw error;
    });
    app.listen(PORT, () => {
      console.log(`Server is running at port: ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("MongoDB connection failed: ", err);
    throw err;
  });