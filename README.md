# Email Builder Backend

This repository contains the backend code for the Email Builder project. It provides APIs and logic to handle email templates, including saving and rendering email templates, image uploads, and storage integration.

## Deployed Link

The backend is deployed and accessible at:

- **API Base URL**: [https://your-backend-url.onrender.com](https://email-builder-backend-ooff.onrender.com/api/emails)

## Project Features

- Save email templates with title, content, footer, and styles.
- Handle image uploads using Supabase storage.
- Provide endpoints for rendering email templates and downloading them.
- Fully integrated with a frontend built using React.

## Technologies Used

- **Node.js**: JavaScript runtime for backend development.
- **Express.js**: Web framework for building APIs.
- **Supabase**: Storage for uploading and retrieving images.
- **MongoDB**: Database for storing email templates.
- **Mongoose**: Object Data Modeling (ODM) library for MongoDB.
- **Winston**: Logger for error tracking and debugging.

## How to Set Up the Project Locally

1. **Clone the Repository**

   ```bash
   git clone https://github.com/yourusername/email-builder-backend.git
   cd email-builder-backend
   ```

2. **Install Dependencies**

   ```bash
   npm install
   ```

3. **Set Up Environment Variables**
   Create a `.env` file in the root directory and add the following variables:

   ```
   PORT=5000
   MONGO_URI=your-mongodb-connection-string
   SUPABASE_URL=your-supabase-url
   SUPABASE_ANON_KEY=your-supabase-anon-key
   SUPABASE_BUCKET_NAME=email-images
   ```

4. **Run the Development Server**

   ```bash
   npm run dev
   ```

5. **Build the Project**
   To build the project for production:

   ```bash
   npm run build
   ```

6. **Run the Production Server**
   ```bash
   npm start
   ```

## API Endpoints

- **POST** `/api/emails/uploadEmailConfig`: Save an email template configuration.
- **POST** `/api/emails/uploadImage`: Upload an image to Supabase storage.
- **GET** `/api/emails/renderAndDownloadTemplate`: Render and download email templates.
- **GET** `/api/emails/email-layout`: Fetch the base html layout.

## Deployment

The backend is deployed on Render. To deploy the project:

1. Push the code to your GitHub repository.
2. Create a new Render service.
3. Connect your GitHub repository to the Render service.
4. Set the build and start commands:
   - Build Command: `npm install`
   - Start Command: `npm start`
5. Add the required environment variables in the Render dashboard.
