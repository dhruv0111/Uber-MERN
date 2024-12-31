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

# Captain API Documentation

## Register Captain

Registers a new captain in the system.

### Endpoint

```
POST /captain/register
```

### Request Body

| Field              | Type     | Description                              | Required |
|-------------------|----------|------------------------------------------|----------|
| fullname.firstname| string   | Captain's first name (min 3 chars)       | Yes      |
| fullname.lastname | string   | Captain's last name (min 3 chars)        | No       |
| email            | string   | Captain's email address                  | Yes      |
| password         | string   | Captain's password (min 6 chars)         | Yes      |
| vehicle.color    | string   | Vehicle color (min 3 chars)             | Yes      |
| vehicle.plate    | string   | Vehicle plate number (min 3 chars)      | Yes      |
| vehicle.capacity | number   | Vehicle passenger capacity (min 1)       | Yes      |
| vehicle.vehicleType| string   | Type of vehicle (car/motorcycle/auto)   | Yes      |

### Example Request

```json
{
  "fullname": {
    "firstname": "John",
    "lastname": "Doe"
  },
  "email": "john.captain@example.com",
  "password": "password123",
  "vehicle": {
    "color": "black",
    "plate": "ABC123",
    "capacity": 4,
    "vehicleType": "car"
  }
}
```

### Response

#### Success Response (201 Created)

```json
{
  "token": "jwt_token_string",
  "captain": {
    "fullname": {
      "firstname": "John",
      "lastname": "Doe"
    },
    "email": "john.captain@example.com",
    "vehicle": {
      "color": "black",
      "plate": "ABC123",
      "capacity": 4,
      "vehicleType": "car"
    },
    "status": "inactive",
    "_id": "captain_id"
  }
}
```

#### Error Responses

##### 400 Bad Request
- When required fields are missing or invalid

```json
{
  "errors": [
    {
      "msg": "Invalid Email",
      "param": "email",
      "location": "body"
    },
    {
      "msg": "Firstname must be at least 3 characters long",
      "param": "fullname.firstname",
      "location": "body"
    }
  ]
}
```

##### 400 Bad Request
- When captain already exists

```json
{
  "message": "Captain already exist"
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

# Captain Authentication API Documentation

## Login
**Endpoint:** `/captains/login`  
**Method:** POST  
**Description:** Authenticates a captain and returns an authentication token.

### Request Body
```json
{
    "email": "john.doe@example.com",     // Required: Valid email format
    "password": "password123"            // Required: Minimum 6 characters
}
```

### Success Response
```json
{
    "token": "eyJhbGciOiJIUzI1NiIs...",  // JWT token for authentication
    "captain": {
        "fullname": {
            "firstname": "John",
            "lastname": "Doe"
        },
        "email": "john.doe@example.com",
        "vehicle": {
            "color": "Black",
            "plate": "ABC123",
            "capacity": 4,
            "vehicleType": "car"
        }
    }
}
```

### Error Response
```json
{
    "message": "Invalid email or password"  // Authentication failed
}
```

### Example Request
```bash
curl -X POST http://localhost:3000/captains/login \
  -H "Content-Type: application/json" \
  -d '{"email": "john.doe@example.com", "password": "password123"}'
```

## Profile
**Endpoint:** `/captains/profile`  
**Method:** GET  
**Description:** Retrieves the authenticated captain's profile information.

### Request Headers
```
Authorization: Bearer eyJhbGciOiJIUzI1NiIs...  // Required: Valid JWT token
```

### Success Response
```json
{
    "captain": {
        "fullname": {
            "firstname": "John",
            "lastname": "Doe"
        },
        "email": "john.doe@example.com",
        "vehicle": {
            "color": "Black",
            "plate": "ABC123",
            "capacity": 4,
            "vehicleType": "car"
        }
    }
}
```

### Error Response
```json
{
    "message": "Unauthorized access"  // Invalid or missing token
}
```

### Example Request
```bash
curl -X GET http://localhost:3000/captains/profile \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIs..."
```

## Logout
**Endpoint:** `/captains/logout`  
**Method:** GET  
**Description:** Logs out the captain by invalidating the current token.

### Request Headers
```
Authorization: Bearer eyJhbGciOiJIUzI1NiIs...  // Required: Valid JWT token
```

### Success Response
```json
{
    "message": "Logout Successfully"
}
```

### Error Response
```json
{
    "message": "Unauthorized access"  // Invalid or missing token
}
```

### Example Request
```bash
curl -X GET http://localhost:3000/captains/logout \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIs..."
```

## Error Responses
All endpoints may return the following error responses:

### Validation Error (400)
```json
{
    "errors": [
        {
            "msg": "Invalid Email",
            "param": "email",
            "location": "body"
        }
    ]
}
```

### Server Error (500)
```json
{
    "message": "Internal server error"
}
```
