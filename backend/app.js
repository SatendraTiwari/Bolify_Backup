import { config } from "dotenv";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import fileUpload from "express-fileupload";
import { connection } from "./database/connection.js";
import { errorMiddleware } from "./middlewares/error.js";
import userRouter from "./router/userRoutes.js";
import auctionItemRouter from "./router/auctionItemRoutes.js";
import bidRouter from "./router/bidRoutes.js";


import commissionRouter from "./router/commissionRoutes.js"
import superAdminRouter from "./router/superAdminRoutes.js"
import { endedAuctionCron } from "./automation/endedAuctionCron.js";

const app = express();
config({
  path: "./config/config.env",
});

// const frontendUrl = process.env.FRONTEND_URL || "http://localhost:8000";
// console.log("Frontend URL:", frontendUrl);

const allowedOrigins = [
  'https://bolify-backup.vercel.app'
];

app.use(cors({
  origin: "https://bolify-backup.vercel.app",
  methods: ["POST", "GET", "PUT", "DELETE"],
  credentials: true
}));


// app.use(
//   cors({
//     origin: frontendUrl,
//     methods: ["POST", "GET", "PUT", "DELETE"],
//     credentials: true,
//   })
// );

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
  })
);

app.use("/api/v1/user", userRouter);
app.use("/api/v1/auctionitem", auctionItemRouter);
app.use("/api/v1/bid", bidRouter);
app.use('/api/v1/commission', commissionRouter);
app.use('/api/v1/superadmin', superAdminRouter);

endedAuctionCron();
connection();
app.use(errorMiddleware);

export default app;
