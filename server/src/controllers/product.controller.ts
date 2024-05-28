import { Request, Response, NextFunction } from "express";
import { PrismaClient } from "@prisma/client";
import ApiError from "../utils/ApiError";
import HttpStatus from "http-status";

const prisma = new PrismaClient();

export const getProductById = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { id } = req.params;

  try {
    const product = await prisma.product.findUnique({
      where: { id: Number(id) },
    });

    if (!product) {
      throw new ApiError(HttpStatus.NOT_FOUND, "Product not found");
    }

    res.status(HttpStatus.OK).json({ success: true, data: product });
  } catch (error) {
    next(error);
  }
};

export const getAllProducts = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const products = await prisma.product.findMany();
    res.status(HttpStatus.OK).json({ success: true, data: products });
  } catch (error) {
    next(error);
  }
};

export const createProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { thumbnail, name, price, description, upc12, discount, units, inStock, brandName } =
    req.body;

  try {
    const newProduct = await prisma.product.create({
      data: {
        thumbnail,
        name,
        price,
        description,
        upc12,
        discount,
        units,
        inStock,
        brandName,
      },
    });

    res.status(HttpStatus.CREATED).json({ success: true, data: newProduct });
  } catch (error) {
    next(error);
  }
};

export const updateProductById = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { id } = req.params;
  const { thumbnail, name, price, description, upc12, discount, units, inStock, brandName } =
    req.body;

  try {
    const updatedProduct = await prisma.product.update({
      where: { id: Number(id) },
      data: {
        thumbnail,
        name,
        price,
        description,
        upc12,
        discount,
        units,
        inStock,
        brandName,
      },
    });

    if (!updatedProduct) {
      throw new ApiError(HttpStatus.NOT_FOUND, "Product not found");
    }

    res.status(HttpStatus.OK).json({ success: true, data: updatedProduct });
  } catch (error) {
    next(error);
  }
};
