### `README.md` (Setup Instructions)

# Pokedex

This guide provides instructions on how to set up and run the Full-Stack Pokedex project locally.

## Prerequisites

Before you begin, ensure you have the following installed on your local machine:
PHP >= 8.1
Composer
Node.js (v18 or later)
NPM or Yarn

## Setup and Installation

1. `Backend` (Laravel API)

First, set up the Laravel server which will provide the data.

## 1. Navigate into the backend directory

cd backend

## 2. Install PHP dependencies

composer install

    Note: This backend acts as a simple proxy to the PokeAPI and does not require a database. You can skip database setup and running php artisan migrate.

## 3. Create a copy of the .env.example file

cp .env.example .env

## 4. Generate a new application key

php artisan key:generate

## 5. **Start the Laravel development server**

php artisan serve

The backend API should now be running and accessible at http://127.0.0.1:8000. 2. Frontend (Next.js App)

Next, set up the `Next.js` frontend which will consume the API.

## 1. In a new terminal, navigate into the frontend directory

cd frontend

## 2. Install JavaScript dependencies

npm install

## 3. Create a local environment file

touch .env.local or cp .env.example .env.local

## 4. Configure the API URL

Open the newly created .env.local file and add the following line. This tells the Next.js app where to find your running Laravel API.

**.env.local**

NEXT_PUBLIC_API_URL=http://localhost:8000/api

## 5. Start the Frontend Development Server

**Start the Next.js app (usually runs on http://localhost:3000)**

npm run dev

Now, open your browser and navigate to http://localhost:3000. You should see the Pokedex application running!
