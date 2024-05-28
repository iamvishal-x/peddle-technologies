import { Request, Response, Router } from "express";
import productRoutes from "./product.route";

const router = Router();

router.get("/health-check", (req: Request, res: Response) => res.status(200).send("OK"));
router.use("/product", productRoutes);

export default router;
