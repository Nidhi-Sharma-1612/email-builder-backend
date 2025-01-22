const baseStyles = {
  emailContainer: `
    background-color: #f9f9f9;
    max-width: 600px;
    margin: 40px auto;
    border: 1px solid #ddd;
    border-radius: 8px;
    overflow: hidden;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  `,
  emailHeader: `
    background-color: #0056b3;
    color: #ffffff;
    padding: 20px;
    text-align: center;
    font-size: 1.8rem;
    font-weight: bold;
    border-bottom: 1px solid #004494;
  `,
  emailSubheader: `
    text-align: center;
    font-size: 1.2rem;
    color: #555;
    margin: 15px 20px;
    font-style: italic;
  `,
  emailBody: `
    padding: 20px;
    font-size: 1rem;
    color: #444;
    line-height: 1.8;
  `,
  bodyContent: `
    margin-bottom: 20px; /* Add gap between paragraphs */
  `,
  image: `
    max-width: 100%;
    height: auto;
    border-radius: 8px;
    margin: 20px auto; /* Add gap above and below the image */
    display: block;
  `,
  ctaContainer: `
    text-align: center;
    margin: 20px 0; /* Add gap above and below the button */
  `,
  ctaButton: `
    display: inline-block;
    padding: 12px 20px;
    background-color: #007bff;
    color: #ffffff;
    text-decoration: none;
    border-radius: 8px;
    font-weight: bold;
    font-size: 1rem;
    transition: background-color 0.3s ease;
  `,
  emailFooter: `
    background-color: #f4f4f4;
    text-align: center;
    padding: 15px;
    font-size: 0.9rem;
    color: #666;
    border-top: 1px solid #ddd;
  `,
  unsubscribeContainer: `
    margin-top: 10px;
  `,
  unsubscribeLink: `
    color: #007bff;
    text-decoration: none;
    font-size: 0.85rem;
  `,
};

export default baseStyles;
