import fs from "fs";
import path from "path";
import EmailTemplate from "../models/EmailTemplate.js";
import upload from "../config/multerConfig.js";
import logger from "../utils/logger.js";
import baseStyles from "../config/styles.js";
import { compileTemplate, serializeStyles } from "../utils/handlebarsUtils.js";

// Get email layout
export const getEmailLayout = async (req, res) => {
  try {
    const layoutPath = path.join(
      process.cwd(),
      "src",
      "templates",
      "layout.hbs"
    );

    if (!fs.existsSync(layoutPath)) {
      console.error("Layout file not found at:", layoutPath);
      return res.status(404).json({ error: "Layout file not found" });
    }

    const layout = fs.readFileSync(layoutPath, "utf-8");

    return res.status(200).json({ layout, styles: baseStyles });
  } catch (error) {
    console.error("Error fetching email layout:", error.message);
    res.status(500).json({ error: "Error fetching email layout" });
  }
};

// Get current settings styles
export const getSettingsStyles = async (req, res) => {
  try {
    // You can customize this logic to fetch settings from a database if required
    const settingsStyles = {
      layout: "src/templates/layout.hbs", // Example layout path
      styles: baseStyles, // Include base styles
    };

    return res.status(200).json(settingsStyles);
  } catch (error) {
    console.error("Error fetching settings styles:", error.message);
    res.status(500).json({
      error: "Error fetching settings styles",
      details: error.message,
    });
  }
};

// Upload Image
export const uploadImage = (req, res) => {
  upload.single("image")(req, res, (err) => {
    if (err) {
      logger.error(`Error uploading image: ${err.message}`);
      return res
        .status(500)
        .json({ error: "Image upload failed", details: err.message });
    }

    if (!req.file) {
      logger.warn("No file uploaded");
      return res.status(400).json({ error: "No file uploaded." });
    }

    const imageUrl = `${req.protocol}://${req.get("host")}/uploads/${
      req.file.filename
    }`;
    logger.info("Image uploaded successfully", { imageUrl });
    return res
      .status(200)
      .json({ message: "Image uploaded successfully", imageUrl });
  });
};

// Save Email Template
export const uploadEmailConfig = async (req, res) => {
  try {
    const { title, content, footer, image } = req.body;

    const emailTemplate = new EmailTemplate({
      title,
      content,
      footer,
      image,
    });

    const savedTemplate = await emailTemplate.save();
    logger.info("Email template saved successfully", { id: savedTemplate._id });
    return res.status(201).json({
      message: "Email template saved successfully",
      emailTemplate: savedTemplate,
    });
  } catch (error) {
    logger.error(`Error saving email template: ${error.message}`);
    return res
      .status(500)
      .json({ error: "Error saving email template", details: error.message });
  }
};

export const renderAndDownloadTemplate = async (req, res) => {
  try {
    const {
      title = "No Title Provided",
      subheader = "",
      content = "No Content Provided",
      footer = "No Footer Provided",
      image = "",
      ctaText = "",
      ctaUrl = "",
      unsubscribeUrl = "",
      styles = {},
    } = req.body;

    const serializedStyles = serializeStyles({
      emailContainer: baseStyles.emailContainer,
      emailHeader: baseStyles.emailHeader,
      emailSubheader: baseStyles.emailSubheader,
      emailBody: baseStyles.emailBody,
      emailFooter: baseStyles.emailFooter,
      ctaButton: baseStyles.ctaButton,
      image: baseStyles.image,
      unsubscribeContainer: baseStyles.unsubscribeContainer,
      unsubscribeLink: baseStyles.unsubscribeLink,
      ...styles,
    });

    const html = compileTemplate("layout", {
      title,
      subheader,
      content,
      footer,
      image,
      ctaText: ctaText && ctaUrl ? ctaText : null,
      ctaUrl: ctaText && ctaUrl ? ctaUrl : null,
      unsubscribeUrl,
      styles: serializedStyles,
    });

    const outputsDir = path.join(process.cwd(), "src", "outputs");
    if (!fs.existsSync(outputsDir)) {
      fs.mkdirSync(outputsDir, { recursive: true });
    }

    const outputFilePath = path.join(outputsDir, `email-${Date.now()}.html`);
    fs.writeFileSync(outputFilePath, html);

    res.download(outputFilePath, "email-template.html", (err) => {
      if (err) {
        res.status(500).json({ error: "Error downloading file" });
      }
      fs.unlinkSync(outputFilePath);
    });
  } catch (error) {
    console.error("Error rendering template:", error.message);
    res.status(500).json({ error: "Error rendering template" });
  }
};
