import express from "express";
import cors from "cors";
import userRouter from "./routes/user_route.js";
import photographerRouter from "./routes/photographer_route.js";
import scheduleRouter from "./routes/schedule_route.js";
import transactionRouter from "./routes/transaction_route.js";
import packageRouter from "./routes/package_route.js";
import jobeRouter from "./routes/job_route.js";
import resulteRouter from "./routes/result_route.js";
import resulteFileRouter from "./routes/resultfile_route.js";
import errorMiddleware from "./middlewares/error_middleware.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/users", userRouter);
app.use("/api/photographers", photographerRouter);
app.use("/api/schedules", scheduleRouter);
app.use("/api/transactions", transactionRouter);
app.use("/api/packages", packageRouter);
app.use("/api/jobs", jobeRouter);
app.use("/api/results", resulteRouter);
app.use("/api/resultfiles", resulteFileRouter);

app.use(errorMiddleware);

export default app;
