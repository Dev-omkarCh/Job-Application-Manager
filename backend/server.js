import express, { urlencoded } from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";

import connectDb from "./db/connectDb.js";
import authRoutes from "./routes/auth.routes.js";
import userRoute from "./routes/user.routes.js";

const app = express();

dotenv.config();
const PORT = process.env.PORT || 5000;

app.use(cors({
  origin : '*',
  credentials : true,
  methods : ["GET","POST"]
}));

app.use(express.json())>
app.use(urlencoded({extended:true}));
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoute);


app.listen(PORT,()=>{
        console.log(`App is running at http://localhost:${PORT}`);
        connectDb();
});
