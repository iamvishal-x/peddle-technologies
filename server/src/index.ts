import express, { Application, NextFunction, Request, Response } from "express";
import cors from "cors";
import indexRoutes from "./routes/index.routes";
import HttpStatus from "http-status";
import ApiError from "./utils/ApiError";
import { errorConverter, errorHandler } from "./middlewares/error";

const app: Application = express();
const PORT: string | number = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());

app.get("/", (req: Request, res: Response) => res.status(200).send("Welcome to server"));

app.use("/api", indexRoutes);

// catch 404 and forward to error handler
app.use((req: Request, res: Response, next: NextFunction) => {
  const err = new ApiError(HttpStatus.NOT_FOUND, "Api not found");
  return next(err);
});

// convert error to ApiError, if needed
app.use(errorConverter);

// handle error
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

export default app;
