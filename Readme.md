# Login and User CRUD Application

This project is a simple login application with user CRUD functionalities. It utilizes a Node.js server with Express.js, PostgreSQL database for user storage, and Angular for the frontend with Angular Material for UI components.

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) installed
- [Angular CLI](https://angular.io/cli) installed
- [PostgreSQL](https://www.postgresql.org/) installed and running

### Installation

1. **Client (Angular App) Setup:**

   Navigate to the `client` directory and install dependencies:

   ```bash
   cd client
   npm install
   ```

2. **Server (Node.js/Express App) Setup:**

   Navigate to the `server` directory and install dependencies:

   ```bash
   cd server
   npm install
   ```

### Database Migration

1. In the `server` directory, run the following command to execute Sequelize migrations and create the necessary tables in PostgreSQL:

   ```bash
   npx sequelize-cli db:migrate
   ```

   This will add a demo user to the database with the following credentials:
   - Username: demoUser
   - Password: demoPassword

### Running the Application

1. **Start the Server:**

   In the `server` directory, run:

   ```bash
   npm start
   ```

   The server will run on `http://localhost:3000`.

2. **Start the Client:**

   In the `client` directory, run:

   ```bash
   ng serve
   ```

   The Angular app will be accessible at `http://localhost:4200`.

3. **Access the Application:**

   Open your browser and navigate to `http://localhost:4200/login`. Use the demo credentials (demoUser/demoPassword) to log in.

## User List and CRUD Operations

Upon successful login, you will be redirected to the User List component. Here, you can update the status (active/inactive) of users.

### Adding Migration

To add a migration for a new model, run the following command in the `server` directory:

```bash
npx sequelize-cli migration:generate --name your_migration_name
```

## Additional Notes

- **Sequelize CLI:** If you need to perform additional migrations or model changes, use the Sequelize CLI commands. Refer to the [Sequelize CLI documentation](https://sequelize.org/master/manual/migrations.html) for more details.