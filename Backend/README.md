# User Registration API Documentation

## Register User

Registers a new user in the system.

### Endpoint

```
POST /users/register
```

### Request Body

| Field      | Type     | Description                    | Required |
|------------|----------|--------------------------------|----------|
| name       | string   | User's full name               | Yes      |
| email      | string   | User's email address           | Yes      |
| password   | string   | User's password (min 6 chars)  | Yes      |
| phone      | string   | User's phone number            | Yes      |

### Example Request

```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "phone": "+1234567890"
}
```

### Response

#### Success Response (200 OK)

```json
{
  "status": "success",
  "message": "User registered successfully",
  "data": {
    "id": "user_id",
    "name": "John Doe",
    "email": "john@example.com"
  }
}
```

#### Error Responses

##### 400 Bad Request
- When required fields are missing or invalid

```json
{
  "status": "error",
  "message": "Invalid input data",
  "errors": [
    "Email is required",
    "Password must be at least 6 characters"
  ]
}
```

##### 409 Conflict
- When email already exists

```json
{
  "status": "error",
  "message": "Email already registered"
}
```

##### 500 Internal Server Error
- When server encounters an error

```json
{
  "status": "error",
  "message": "Internal server error"
}
```

## Login User

Authenticates a user and returns a JWT token.

### Endpoint

```
POST /users/login
```

### Request Body

| Field    | Type   | Description                   | Required |
|----------|--------|-------------------------------|----------|
| email    | string | User's email address         | Yes      |
| password | string | User's password              | Yes      |

### Example Request

```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

### Response

#### Success Response (200 OK)

```json
{
  "token": "jwt_token_string",
  "user": {
    "id": "user_id",
    "name": "John Doe",
    "email": "john@example.com"
  }
}
```

#### Error Responses

##### 400 Bad Request
- When required fields are missing or invalid

```json
{
  "status": "error",
  "errors": [
    "Invalid Email",
    "Password must be at least 6 characters"
  ]
}
```

##### 401 Unauthorized
- When email/password combination is incorrect

```json
{
  "message": "Invalid email or password"
}
```

##### 500 Internal Server Error
- When server encounters an error

```json
{
  "status": "error",
  "message": "Internal server error"
}
```

## Get User Profile

Retrieves the authenticated user's profile information.

### Endpoint

```
GET /users/profile
```

### Headers

| Name          | Value         | Description                          |
|---------------|---------------|--------------------------------------|
| Authorization | Bearer token  | JWT token received from login        |

### Response

#### Success Response (200 OK)

```json
{
  "status": "success",
  "data": {
    "id": "user_id",
    "firstname": "John",
    "lastname": "Doe",
    "email": "john@example.com"
  }
}
```

#### Error Response

##### 401 Unauthorized
- When token is missing or invalid

```json
{
  "message": "Unauthorized"
}
```

## Logout User

Logs out the current user and invalidates/blacklist their token provided in cookie or headers.

### Endpoint

```
GET /users/logout
```

### Headers

| Name          | Value         | Description                          |
|---------------|---------------|--------------------------------------|
| Authorization | Bearer token  | JWT token to be invalidated         |

### Response

#### Success Response (200 OK)

```json
{
  "message": "Logged out"
}
```

#### Error Response

##### 401 Unauthorized
- When token is missing or invalid

```json
{
  "message": "Unauthorized"
}
```
