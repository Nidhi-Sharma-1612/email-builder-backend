import express from "express";
import {
  getEmailLayout,
  uploadImage,
  uploadEmailConfig,
  renderAndDownloadTemplate,
  getSettingsStyles,
} from "../controllers/emailController.js";

const router = express.Router();

// Route to get the HTML layout
router.get("/email-layout", getEmailLayout);

// Route to get the initial styles for settings
router.get("/settings-styles", getSettingsStyles);

// Route to upload an image
router.post("/uploadImage", uploadImage);

// Route to save the email template configuration
router.post("/uploadEmailConfig", uploadEmailConfig);

// Route to render the template and download the output HTML
router.post("/renderAndDownloadTemplate", renderAndDownloadTemplate);

export default router;
