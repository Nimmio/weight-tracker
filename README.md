# Weight Tracker

## Description

Weight Tracker is a single-user application designed to help you effortlessly log and monitor your weight over time. Keep track of your progress with a simple and intuitive interface.

## Technologies Used

- Tanstack Start: A powerful full-stack framework for React.
- Tanstack React Query: For efficient data fetching, caching, and state management.
- Shadcn/UI: A collection of re-usable components built with Radix UI and Tailwind CSS.
- Prisma: A next-generation ORM for Node.js and TypeScript.
- PostgreSQL: A powerful, open-source relational database.
- Docker: For containerization of the application and its services.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

Make sure you have Docker installed on your system.
If you plan to run in development mode, you will also need Node.js (LTS recommended) and pnpm installed.

### Installation and Setup

#### Clone the repository:

```bash
git clone https://github.com/your-username/weight-tracker.git
cd weight-tracker
```

#### Running the Application

You have two primary ways to run the application:

#### 1. With Docker (Recommended for Production/Easy Setup)

This is the quickest way to get the application fully operational, including the database.

**Important Security Note:** Before running, it is highly recommended to change the default PostgreSQL password defined in the docker-compose.yml file. Look for the POSTGRES_PASSWORD environment variable within the db service definition and update it to a strong, unique password.

```bash
docker compose up --build
```

Once the services are up and running, the application should be accessible in your web browser. Typically, it will be available at http://localhost:3000, but check your console output for the exact URL.

#### 2. In Development Mode (For Contribution/Local Development)

To run the application in a local development environment (e.g., if you want to make changes to the code), you'll need to set up your environment variables and dependencies.

Configure Environment Variables:
Rename .env.example to .env in the root of the project:

```bash
mv .env.example .env
```

Open the newly created .env file and adjust the values as needed for your local PostgreSQL database connection and other configurations.

Install Dependencies:

```bash
pnpm install
```

Run Development Server:

```bash
pnpm run dev
```

This will start the development server, usually accessible at http://localhost:3000. Hot-reloading will be enabled for a smoother development experience.

## Usage

After starting the application using either method, navigate to the provided URL in your browser. You'll be able to:

- Log your weight: Easily add new weight entries.
- View your history: See a chronological list of your weight logs.
- Track progress: Monitor trends and changes in your weight over time.
