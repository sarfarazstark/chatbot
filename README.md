# This is a gemini-api powered chatbot application built with Laravel, Inertia and React

Follow these steps to install and set up the Laravel Inertia project on your local machine.

## Project Stack

- Laravel ![Laravel](https://img.shields.io/badge/Laravel-8.x-red)
- Inertia.js ![Inertia.js](https://img.shields.io/badge/Inertia.js-0.8.x-darkblue)
- React ![React](https://img.shields.io/badge/React-17.x-blue)
- Tailwind CSS ![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-2.x-skyblue)
- Sqlite ![Sqlite](https://img.shields.io/badge/Sqlite-3.x-yellow)
- Gemini API ![Gemini API](https://img.shields.io/badge/Gemini%20API-1.x-blue)
- Showdown (for markdown) ![Showdown](https://img.shields.io/badge/Showdown-1.x-red)

## Prerequisites

Ensure you have the following installed:

- PHP >= 7.3
- Composer
- Node.js & npm
- Git
- A web server (e.g., Apache, Nginx, or Laravel Valet)

## Steps

1. **Clone the Repository**

```sh
git clone https://github.com/sarfarazstark/chatbot.git
cd chatbot
```

2. **Install PHP Dependencies**

```sh
composer install
```

3. **Install Node.js Dependencies**

```sh
npm install
```

4. **Set Up Environment Variables**
    - Copy the `.env.example` file to `.env`

```sh
cp .env.example .env
```

- Update the `.env` file with your database and other configurations.
- Add the following line to the `.env` file to use the Inertia stack:

```sh
APP_NAME=Chatbot
APP_URL=http://chatbot.local # Update with your local URL or IP
GEMINI_API_KEY=your_api_key
```

1. **Generate Application Key**

```sh
php artisan key:generate
```

6. **Run Migrations**

```sh
php artisan migrate
```

7. **Build Frontend Assets**

```sh
npm run dev
```

8. **Serve the Application**

```sh
php artisan serve
```

Your application should now be running at `http://localhost:8000`.

## Troubleshooting

- Ensure your `.env` file is correctly configured.
- Check if all services (database, web server) are running.
- Review the Laravel and Inertia documentation for additional help.
