## File-uploader

A system that allows users to upload large-sized files.

## Table of Contents

- [Demo](#Demo)
- [Features](#Features)
- [Instalation](#Instalation)
- [Technologies Used](#Technologies-Used)

## Demo

![Demo-start-page-screen](client/public/assets/start-page.png)
![Demo-login-modal-screen](client/public/assets/login-modal.png)
![Demo-home-page-screen](client/public/assets/home-page.png)


## Features

In this project, users can register and login. A system that allows users to upload large-sized files. The server should not become unresponsive or freeze when attempting to handle a large file upload.
Please ensure the solution is reliable and efficient, optimizing for both user experience and server performance. It's crucial that the system can handle high volumes of large file uploads without compromising the server's stability or the overall functionality of the system.

## Instalation

To install this project, follow these steps:

1. Clone the repository: `https://github.com/dmalofieiev/file-uploader`
2. Install the dependencies for 'client' and 'server': `npm install`
3. Create a `.env` file and copy the contents from `.env-example`
4. Create the database and run migrations using sequelize-cli: `equelize-cli db:create && npx sequelize-cli db:migrate && npx sequelize-cli
5. Start the server: npm run dev
6. Access the server at http://localhost:3000

## Technologies Used

This project was built with:

- Express.js
- HTML
- CSS
- JavaScript
- Postgres
- Sequelize
- React JSX Components
- Typed.js
- Numbers API
