# Book Manager

A web application for managing a collection of books. This project was built with Laravel and React (Inertia.js), featuring a responsive UI and comprehensive testing.

## Tech Stack

- **Backend**: Laravel 12
- **Frontend**: React with TypeScript, Tailwind CSS
- **Database**: SQLite (default), MySQL (optional)
- **Testing**: PHPUnit for PHP, Jest for React components

## API Documentation

When running locally or in development/staging environments, API documentation is available at:
- http://localhost/api/docs (when running locally)
- https://immense-crag-13349-b3769a5192d4.herokuapp.com/api/docs (on Heroku)

The documentation is built with Swagger UI and provides a complete reference of all available API endpoints.

## Prerequisites

- PHP 8.2 or higher
- Composer
- Node.js and npm
- SQLite (or MySQL if preferred)

## Setup and Installation

### Option 1: Standard Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/book-manager.git
   cd book-manager
   ```

2. Install PHP dependencies:
   ```bash
   composer install
   ```

3. Install JavaScript dependencies:
   ```bash
   npm install
   ```

4. Copy the environment file and generate a key:
   ```bash
   cp .env.example .env
   php artisan key:generate
   ```

5. Create a SQLite database:
   ```bash
   touch database/database.sqlite
   ```

6. Run the migrations to set up the database:
   ```bash
   php artisan migrate
   ```

7. (Optional) Seed the database with sample data:
   ```bash
   php artisan db:seed --class=BookSeeder
   ```

8. Build the frontend assets:
   ```bash
   npm run build
   ```

9. Start the development server:
   ```bash
   # In one terminal window, start the Laravel server
    php artisan serve
    
    # In another terminal window, start the Vite development server
    npm run dev
   ```

10. Visit `http://localhost:8000` in your browser

### Option 2: Docker Installation

1. Make sure you have Docker and Docker Compose installed

2. Clone the repository:
   ```bash
   git clone https://github.com/your-username/book-manager.git
   cd book-manager
   ```

3. Copy the environment file:
   ```bash
   cp .env.example .env
   ```

4. Start Laravel Sail:
   ```bash
   ./vendor/bin/sail up -d
   ```

5. Install dependencies and set up the application:
    ```bash
    ./vendor/bin/sail composer install
    ./vendor/bin/sail artisan key:generate
    ./vendor/bin/sail artisan migrate
    ./vendor/bin/sail artisan db:seed --class=BookSeeder
    ./vendor/bin/sail npm install
    ./vendor/bin/sail npm run build
    ```

6. Visit `http://localhost` in your browser

## Development Workflow

For development, you can run the following commands:

1. Start the Laravel development server:
   ```bash
   php artisan serve
   ```

2. In a separate terminal, start the Vite development server for frontend assets:
   ```bash
   npm run dev
   ```

3. Or use the combined development command:
   ```bash
   composer dev
   ```

## Running Tests

### Running PHP Tests

```bash
# Run all tests
php artisan test

# Run only unit tests
php artisan test --testsuite=Unit

# Run only feature tests
php artisan test --testsuite=Feature
```

### Running JavaScript Tests

```bash
# Run all JavaScript tests
npm run test

# Run tests in watch mode
npm run test -- --watch
```

### Running Code Quality Checks

```bash
# PHP code quality
composer pint
vendor/bin/phpstan analyse

# JavaScript code quality
npm run lint
npm run format:check
```
