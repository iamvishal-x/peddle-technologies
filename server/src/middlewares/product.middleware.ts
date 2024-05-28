import Joi from "joi";

const createProductSchemaValidator = {
  body: Joi.object({
    thumbnail: Joi.string().uri().required(),
    name: Joi.string().required().min(3).max(100),
    price: Joi.number().integer().required().min(0).max(99999),
    currency: Joi.string().valid("INR", "ZAR", "USD").required(),
    description: Joi.string().allow("").default("").max(200).optional(),
    upc12: Joi.string().length(12).pattern(/^\d+$/).required().messages({
      "string.length": "UPC must be exactly 12 characters long",
      "string.pattern.base": "UPC must contain only numbers",
    }),
    discount: Joi.number().min(0).max(100).optional(),
    units: Joi.number().integer().min(0).required(),
    inStock: Joi.boolean().required(),
    brandName: Joi.string().required().max(15).min(3),
  })
    .required()
    .not({})
    .messages({ "any.invalid": "Invalid Product Body" }),
};

const updateProductSchemaValidator = {
  params: Joi.object({
    id: Joi.string().required().messages({ "any.invalid": "Invalid Id Passed" }),
  }),
  body: Joi.object({
    thumbnail: Joi.string().uri().optional(),
    name: Joi.string().optional().min(3).max(100),
    price: Joi.number().integer().optional(),
    currency: Joi.string().valid("INR", "ZAR", "USD").optional(),
    description: Joi.string().allow("").optional().max(200),
    upc12: Joi.string().length(12).pattern(/^\d+$/).optional().messages({
      "string.length": "UPC must be exactly 12 characters long",
      "string.pattern.base": "UPC must contain only numbers",
    }),
    discount: Joi.number().min(0).max(100).optional(),
    units: Joi.number().integer().min(0).optional(),
    inStock: Joi.boolean().optional(),
    brandName: Joi.string().optional().max(15).min(3),
  })
    .required()
    .not({})
    .messages({ "any.invalid": "Invalid Product Body" }),
};

const getProductSchemaValidator = {
  params: Joi.object({
    id: Joi.string().required().messages({ "any.invalid": "Invalid Id Passed" }),
  }),
};

export default {
  createProductSchemaValidator,
  updateProductSchemaValidator,
  getProductSchemaValidator,
};
