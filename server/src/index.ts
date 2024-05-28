import express, { Application, Request, Response } from "express";
import cors from "cors";

const app: Application = express();
const PORT: string | number = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());

app.get("/", (req: Request, res: Response) => res.status(200).send("Welcome to server"));

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

export default app;
