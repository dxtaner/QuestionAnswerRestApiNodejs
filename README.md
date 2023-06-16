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

Static Files
------------

The application serves static files from the `public` directory.

Error Handling
--------------

Error handling middleware is implemented to handle and respond to any errors that occur during the application's execution.

License
-------

This project is licensed under the [MIT License](LICENSE).
