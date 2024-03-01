# Assingment 4

## Table of Contents

- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Usage](#usage)


## Technologies Used

Outline the technologies, programming languages, frameworks, and tools used in the project.

- Frontend: HTML5, CSS3, JavaScript
- Backend: Node.js, Express.js
- Database: MongoDB, Mongoose
- Authentication: bcrypt, jsonwebtoken

## Installation

1. Clone the repository:

    ```bash
    git clone https://github.com/ParZival6677/Assinment-4-Final.git
    ```

2. Install dependencies:

    ```bash
    cd backend
    init -y
    npm install express mongoose nodemon bcrypt dotenv jsonwebtoken cookie-parser
    ```

3. Setup environment variables:

    - Create a `.env` file in the `backend` directory.
    - Write in the `.env` file `secretKey = secret` (any value)


## Usage

1. Database Configuration

    - Open index.js in the models directory and configure the database connection

    ```mongoose.connect('mongodb://localhost:27017/auth', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }) // Example for postgres database connection```   

2. Start the backend server:

    ```bash
    cd backend
    node server.js
    ```

3. Open the html page:

    ```bash
    start http://localhost:3000/login.html
    ```

