# Opportunities Search Application

This project is a Next.js application that allows users to search for opportunities based on NAICS code and IT-related terms using Algolia for enhanced search functionality. It uses Tailwind CSS for styling and Material-UI for the UI components.

## Features

- Fetch and display opportunities from Supabase
- Search and filter opportunities based on NAICS code and IT-related terms
- Use Algolia for fast and efficient search
- Material-UI dropdown for NAICS code selection with a clear button
- Tailwind CSS for styling

## Prerequisites

- Node.js (>= 14.x)
- npm or yarn
- Supabase account
- Algolia account

## Setup

## Clone the Repository:

git clone <repository-url>
cd opportunities-search-app


## Install Dependencies:

npm install
# or
yarn install


## Set Up Environment Variables: 
Create a .env.local file in the root directory of your project and add the necessary environment variables for Supabase and Algolia.


## Set Up Supabase: 
Ensure your Supabase project has a table named opportunities with the necessary columns (id, title, description, naics_code, created_at).

## Sync Data to Algolia: 
Create a script to fetch data from Supabase and sync it to Algolia. Run the script to sync your data :

node scripts/syncToAlgolia.js

## Run the Development Server: Start the Next.js development server:

npm run dev
# or
yarn dev

## Access the Application: Open your browser and navigate to http://localhost:3000/search to use the Opportunities Search Application.
