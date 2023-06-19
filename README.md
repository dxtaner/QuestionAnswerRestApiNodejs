QuestionAnswerRestApiNodejs
============

Installation
------------

To install the required dependencies, run the following command:

    npm install

Configuration
-------------

Create a `.env` file in the project root directory and provide the following environment variables:

    PORT=<port_number>

Replace `<port_number>` with the desired port number for your application.

Database Configuration
----------------------

The application requires a MongoDB database. Update the connection details in the `./helpers/database/connectDatabase.js` file.

Usage
-----

To start the application, run the following command:

    npm start

The application will be accessible at `http://localhost:<port_number>`, where `<port_number>` is the value provided in the `.env` file.

Router.js Description File
==========================

This file defines a routing mechanism used in an Express.js application. The router is used to route incoming requests to the appropriate handler functions.

Requirements
------------

This code assumes the following modules are installed:

*   `express`: Express.js framework.
*   `auth`: A module used for authentication operations.
*   `admin`: A module used to manage admin operations.
*   `user`: A module used to manage user operations.
*   `question`: A module used to manage question operations.

Creating the Router
-------------------

    const express = require("express");
    const auth = require("./auth");
    const admin = require("./admin");
    const user = require("./user");
    const question = require("./question");
    
    const router = express.Router();
    

In this section, the `express` module and the required modules are imported, and a `router` object is created.

Configuring the Routing
-----------------------

    router.use("/auth", auth);
    router.use("/admin", admin);
    router.use("/users", user);
    router.use("/questions", question);
    

In this section, the `router` object is used to route incoming requests to the appropriate handlers.

*   The path `/auth` is routed to the `auth` module, which handles authentication operations.
*   The path `/admin` is routed to the `admin` module, which manages admin operations.
*   The path `/users` is routed to the `user` module, which manages user operations.
*   The path `/questions` is routed to the `question` module, which manages question operations.

Exporting the Router
--------------------

    module.exports = router;
    

In this section, the created `router` object is made accessible from other files.

This file is used to create a routing structure in an Express.js application. It manages the operations on the respective paths of the modules and routes incoming requests to the appropriate handlers.

API Routes
----------

The application exposes the following API routes:

*   `/api/auth/register` - Register a new user.
*   `/api/auth/login` - User login.
*   `/api/auth/logout` - User logout (requires authentication).
*   `/api/auth/user` - Get logged-in user details (requires authentication).
*   `/api/auth/upload` - Upload a profile image (requires authentication and file upload).
*   `/api/auth/edit` - Update user details (requires authentication).
*   `/api/auth/forgotpassword` - Request password reset.
*   `/api/auth/resetpassword` - Reset user password.

Please refer to the respective controller files for detailed endpoint information and implementation details.

Question Router
===============

This is a router module for handling various endpoints related to questions in an Express application. It provides routes for creating, retrieving, updating, and deleting questions, as well as liking and undoing likes on questions.

Installation
------------

1.  Create a new directory for your project and navigate into it.
2.  Initialize a new Node.js project using the command: `npm init`
3.  Install the required dependencies by running: `npm install express`
4.  Create a new file, e.g., `questionRouter.js`, and copy the code into it.
5.  In the file where you configure your Express application, import and use the `questionRouter` as a middleware.

Usage
-----

    const express = require("express");
    const questionRouter = require("./questionRouter.js");
    
    const app = express();
    
    // Other middleware and configurations
    
    app.use("/questions", questionRouter);
    
    // Start the server
    app.listen(3000, () => {
      console.log("Server is running on port 3000.");
    });
    

Endpoints
---------

*   `GET /questions`: Retrieves all questions.
*   `GET /questions/:id`: Retrieves a single question by ID.
*   `POST /questions/ask`: Creates a new question. Requires authentication.
*   `PUT /questions/:id/edit`: Edits a question. Requires authentication and ownership of the question.
*   `DELETE /questions/:id/delete`: Deletes a question. Requires authentication and ownership of the question.
*   `GET /questions/:id/like`: Likes a question. Requires authentication.
*   `GET /questions/:id/undo_like`: Undoes a like on a question. Requires authentication.

Additionally, the router uses the `answerRouter` as a sub-router for handling answers to specific questions. The answer routes are nested under the question routes as follows:

*   `GET /questions/:question_id/answers`: Retrieves all answers for a specific question.
*   More answer routes can be defined in the `answer.js` module.

Please note that certain routes require authentication and ownership of the question, which are handled by the provided middleware functions.

Feel free to modify and extend this router module to fit your application's specific needs.

Static Files
------------

The application serves static files from the `public` directory.

Error Handling
--------------

Error handling middleware is implemented to handle and respond to any errors that occur during the application's execution.

License
-------

This project is licensed under the [MIT License](LICENSE).
