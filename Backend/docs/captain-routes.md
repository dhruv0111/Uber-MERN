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
