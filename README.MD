# API

This is simple backend api project.

### Version: 1.0.0

### Usage

```sh
# npm install
```

### Config (config.env)

```sh
# SERVER
SERVER_HOST=localhost (default)
SERVER_PORT=3000 (default)

# DATABASE
DATABASE=YOUR_DATABASE_URL

# JSON WEB TOKEN
JWT_SECRET=YOUR_JWT_SERCRET
JWT_EXPIRES_IN=JWT_EXPIRES_TIME
```

### Routes

```sh
--- AUTH ---
# SIGNUP
visit: http://localhost:3000/api/v1/users/signup

# LOGIN
visit: http://localhost:3000/api/v1/users/login

--- USERS ---
# GET ALL USERS
visit: http://localhost:3000/api/v1/users

# GET SINGLE USER
visit: http://localhost:3000/api/v1/users/{id}

# UPDATE SINGLE USER (NOT PASSWORD)
visit: http://localhost:3000/api/v1/users/updateME

# UPDATE SINGLE USER PASSWORD
visit: http://localhost:3000/api/v1/users/updateMyPassword

# DELETE YOUR ACCOUNT
visit: http://localhost:3000/api/v1/users/{id}

```

### Thank you
