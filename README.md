# Open Case

This is an open-source case-management application built using:

- **Frontend:** HTML, CSS (Bootstrap), JavaScript, jQuery, Underscore.js, Backbone.js
- **Backend:** Node.js, Express.js, PostgreSQL

## Features

- Add new tasks with a title and description.
- View a list of tasks.
- Tasks are persisted in a PostgreSQL database.
- Uses a RESTful API for communication between the frontend and backend.

## Setup

### Prerequisites

- Node.js and npm installed
- PostgreSQL installed and running

### Installation

1.  **Clone the repository:**

    ```bash
    git clone https://github.com/conor-dowdall/open-case.git
    cd open-case
    ```

2.  **Install server-side dependencies:**

    ```bash
    npm install
    ```

3.  **Create the PostgreSQL database:**

    - Create a database named `open_case_dev` in PostgreSQL.
    - Adjust the database connection settings in `src/server.js` if necessary.

4.  **Run the server:**

    ```bash
    npm start
    ```

    The server will start on port 3000.

5.  **Open the application in your browser:**

    Open `public/index.html` in your browser, or navigate to `http://localhost:3000` if you are serving the `public` directory with your webserver.

## Configuration

- **Database:** The database connection settings are in `src/server.js`. You can configure the host, port, database name, user, and password.

## API Endpoints

- `GET /api/tasks`: Get all tasks.
- `GET /api/tasks/:id`: Get a single task by ID.
- `POST /api/tasks`: Create a new task.
- `PUT /api/tasks/:id`: Update an existing task.
- `DELETE /api/tasks/:id`: Delete a task.
