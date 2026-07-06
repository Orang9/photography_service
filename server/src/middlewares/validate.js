import Joi from "joi";

export const validateRequest = (schema) => {
  return (req, res, next) => {
    const { error } = schema.validate(req.body, { abortEarly: false, allowUnknown: true });
    
    if (error) {
      const errorMessage = error.details.map((detail) => detail.message).join(", ");
      return res.status(400).json({
        success: false,
        message: `Validation Error: ${errorMessage}`,
      });
    }
    
    next();
  };
};

export const transactionUpdateSchema = Joi.object({
  status: Joi.string()
    .valid(
      "awaiting_schedule_approval",
      "unpaid",
      "awaiting_dp_verification",
      "dp_paid",
      "awaiting_final_verification",
      "fully_paid",
      "rejected"
    )
    .optional(),
});

export const jobUpdateSchema = Joi.object({
  status: Joi.string()
    .valid("assigned", "in progress", "editing", "completed")
    .required(),
}).required();
