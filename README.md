Question&AnswerRestApiNodejs
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

Admin Router
============

This is a router module for handling administrative actions in an Express application. It provides routes for blocking a user and deleting a user.

Installation
------------

1.  Create a new directory for your project and navigate into it.
2.  Initialize a new Node.js project using the command: `npm init`
3.  Install the required dependencies by running: `npm install express`
4.  Create a new file, e.g., `adminRouter.js`, and copy the code into it.
5.  In the file where you configure your Express application, import and use the `adminRouter` as a middleware.

Usage
-----

    const express = require("express");
    const adminRouter = require("./adminRouter.js");
    
    const app = express();
    
    // Other middleware and configurations
    
    app.use("/admin", adminRouter);
    
    // Start the server
    app.listen(3000, () => {
      console.log("Server is running on port 3000.");
    });
    

Endpoints
---------

*   `GET /admin/block/:id`: Blocks a user by their ID. Requires authentication and admin access.
*   `DELETE /admin/user/:id`: Deletes a user by their ID. Requires authentication and admin access.

Please note that these routes require authentication and admin access, which are handled by the provided middleware functions.

Additionally, the router uses the `checkUserExist` middleware function to ensure that the specified user exists in the database before performing the block or delete action.

Feel free to modify and extend this router module to fit your application's specific needs.

Auth Router
===========

This is a router module for handling authentication-related endpoints in an Express application. It provides routes for user registration, login, logout, profile image upload, forgot password functionality, and updating user details.

Installation
------------

1.  Create a new directory for your project and navigate into it.
2.  Initialize a new Node.js project using the command: `npm init`
3.  Install the required dependencies by running: `npm install express multer`
4.  Create a new file, e.g., `authRouter.js`, and copy the code into it.
5.  In the file where you configure your Express application, import and use the `authRouter` as a middleware.

Usage
-----

    const express = require("express");
    const authRouter = require("./authRouter.js");
    
    const app = express();
    
    // Other middleware and configurations
    
    app.use("/auth", authRouter);
    
    // Start the server
    app.listen(3000, () => {
      console.log("Server is running on port 3000.");
    });
    

Endpoints
---------

*   `POST /auth/register`: Registers a new user.
*   `POST /auth/login`: Logs in a user.
*   `GET /auth/logout`: Logs out the currently logged-in user. Requires authentication.
*   `GET /auth/user`: Retrieves the currently logged-in user. Requires authentication.
*   `PUT /auth/upload`: Uploads a profile image for the logged-in user. Requires authentication and a "profile\_image" field in the request body.
*   `PUT /auth/edit`: Updates the details of the logged-in user. Requires authentication.
*   `POST /auth/forgotpassword`: Sends a password reset email to the user's registered email address.
*   `PUT /auth/resetpassword`: Resets the user's password based on a password reset token.

Please note that certain routes require authentication, which is handled by the `getAccessToRoute` middleware function.

Feel free to modify and extend this router module to fit your application's specific needs.

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

Answer Router
=============

This is a router module for handling endpoints related to answers in an Express application. It provides routes for adding, retrieving, editing, and deleting answers to a specific question. Additionally, it allows users to like or undo like an answer.

Installation
------------

1.  Create a new directory for your project and navigate into it.
2.  Initialize a new Node.js project using the command: `npm init`
3.  Install the required dependencies by running: `npm install express`
4.  Create a new file, e.g., `answerRouter.js`, and copy the code into it.
5.  In the file where you configure your Express application, import and use the `answerRouter` as a middleware.

Usage
-----

    const express = require("express");
    const answerRouter = require("./answerRouter.js");
    
    const app = express();
    
    // Other middleware and configurations
    
    app.use("/questions/:question_id/answers", answerRouter);
    
    // Start the server
    app.listen(3000, () => {
      console.log("Server is running on port 3000.");
    });
    

Endpoints
---------

*   `GET /questions/:question_id/answers`: Retrieves all answers for a specific question.
*   `GET /questions/:question_id/answers/:answer_id`: Retrieves a single answer by ID.
*   `POST /questions/:question_id/answers`: Adds a new answer to a specific question. Requires authentication.
*   `PUT /questions/:question_id/answers/:answer_id/edit`: Edits an answer. Requires authentication and ownership of the answer.
*   `DELETE /questions/:question_id/answers/:answer_id/delete`: Deletes an answer. Requires authentication and ownership of the answer.
*   `GET /questions/:question_id/answers/:answer_id/like`: Likes an answer. Requires authentication.
*   `GET /questions/:question_id/answers/:answer_id/undo_like`: Undoes a like on an answer. Requires authentication.

Please note that certain routes require authentication and ownership of the answer, which are handled by the provided middleware functions.

Additionally, the router uses the `mergeParams` option to merge the parameters from the parent question router (`questionsRouter`) into the answer router, allowing access to the `:question_id` parameter within the answer routes.

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
