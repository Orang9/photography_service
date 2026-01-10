import express from "express";
import cors from "cors";
import userRouter from "./routes/user_route.js";
import photographerRouter from "./routes/photographer_route.js";
import scheduleRouter from "./routes/schedule_route.js";
import transactionRouter from "./routes/transaction_route.js";
import packageRouter from "./routes/package_route.js";
import jobRouter from "./routes/job_route.js";
import resultRouter from "./routes/result_route.js";
import resulteFileRouter from "./routes/resultfile_route.js";
import errorMiddleware from "./middlewares/error_middleware.js";
import connectMongoDB from "./config/mongo.js";
import portfolioRoutes from "./routes/portofolio_route.js";
import reviewRoutes from "./routes/review_route.js";

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
app.use(express.json());

connectMongoDB();

app.use("/api/users", userRouter);
app.use("/api/photographers", photographerRouter);
app.use("/api/schedules", scheduleRouter);
app.use("/api/transactions", transactionRouter);
app.use("/api/packages", packageRouter);
app.use("/api/jobs", jobRouter);
app.use("/api/results", resultRouter);
app.use("/api/resultfiles", resulteFileRouter);
app.use("/api/portfolios", portfolioRoutes);
app.use("/api/reviews", reviewRoutes);

app.use(errorMiddleware);

export default app;
