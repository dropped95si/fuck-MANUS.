# Breakout Screener SaaS Platform

A full-stack application for stock breakout pattern screening with free and premium tiers.

## Features

- **Free vs. Premium Content**: Free section with one featured breakout candidate and premium section with complete list of high-potential candidates
- **User Authentication**: Secure login/registration system with user profile management
- **Payment Processing**: Stripe integration for subscription management
- **Enhanced Visual Features**: Interactive price target indicators, color-coded stop loss and target levels
- **Data Refresh**: Manual refresh button for up-to-date information

## Deployment Instructions for Vercel

1. **Import this repository to Vercel**:
   - Go to https://vercel.com/new
   - Select "Import Git Repository" and connect your GitHub account
   - Import this repository

2. **Configure Environment Variables**:
   - MONGO_URI: Your MongoDB connection string
   - JWT_SECRET: Secret key for JWT authentication
   - STRIPE_SECRET_KEY: Your Stripe secret key
   - PORT: 5000 (default)

3. **Deploy**:
   - Click "Deploy" and wait for the build to complete
   - Your application will be available at the provided Vercel URL

## Project Structure

- `/backend`: Node.js/Express API with MongoDB integration
- `/frontend`: React application with authentication and premium features
- `vercel.json`: Configuration for Vercel deployment

## Local Development

1. Install dependencies:
   ```
   npm install
   cd frontend && npm install
   ```

2. Run the development server:
   ```
   npm run dev
   ```

3. Build for production:
   ```
   npm run build
   ```
