import fs from "fs";
import path from "path";
import Handlebars from "handlebars";

// Register Handlebars helpers
Handlebars.registerHelper("and", function (a, b) {
  return a && b;
});

// Serialize styles into a format usable by Handlebars templates
export const serializeStyles = (styles) => {
  return Object.entries(styles).reduce((acc, [key, value]) => {
    if (typeof value === "object") {
      acc[key] = Object.entries(value)
        .map(([k, v]) => `${k.replace(/([A-Z])/g, "-$1").toLowerCase()}: ${v}`)
        .join("; ");
    } else {
      acc[key] = value;
    }
    return acc;
  }, {});
};

// Compile a Handlebars template with provided data
export const compileTemplate = (templateName, data) => {
  const templatePath = path.join(
    process.cwd(),
    "src",
    "templates",
    `${templateName}.hbs`
  );

  if (!fs.existsSync(templatePath)) {
    throw new Error(`Template file not found at ${templatePath}`);
  }

  const templateSource = fs.readFileSync(templatePath, "utf-8");
  const compiledTemplate = Handlebars.compile(templateSource);

  return compiledTemplate(data);
};
