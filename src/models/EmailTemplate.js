import mongoose from "mongoose";

const EmailTemplateSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
    maxlength: 100,
    minlength: 3,
  },
  content: {
    type: String,
    required: true,
    trim: true,
  },
  footer: {
    type: String,
    required: true,
    trim: true,
  },
  image: {
    type: String,
    default: null,
    trim: true,
  }, // Optional field for an image URL
  ctaText: {
    type: String,
    default: null,
    trim: true,
  }, // Optional Call-to-Action button text
  ctaUrl: {
    type: String,
    default: null,
    trim: true,
  }, // Optional Call-to-Action URL
  isActive: {
    type: Boolean,
    default: true,
  }, // For soft-deleting or enabling/disabling templates
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

// Middleware to update `updatedAt` before saving
EmailTemplateSchema.pre("save", function (next) {
  this.updatedAt = Date.now();
  next();
});

const EmailTemplate = mongoose.model("EmailTemplate", EmailTemplateSchema);

export default EmailTemplate;
