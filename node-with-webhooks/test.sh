#!/bin/bash

# Start the server in background
npm start &
SERVER_PID=$!

# Wait for server to start
sleep 2

# Test GET /users (should be empty)
echo "Testing GET /users"
curl -X GET http://localhost:3120/users
echo ""

# Test POST /users
echo "Testing POST /users"
curl -X POST http://localhost:3120/users -H "Content-Type: application/json" -d '{"name":"John Doe","email":"john@example.com"}'
echo ""

# Test GET /users again
echo "Testing GET /users after post"
curl -X GET http://localhost:3120/users
echo ""

# Test GET /users/1
echo "Testing GET /users/1"
curl -X GET http://localhost:3120/users/1
echo ""

# Test PUT /users/1
echo "Testing PUT /users/1"
curl -X PUT http://localhost:3120/users/1 -H "Content-Type: application/json" -d '{"name":"John Smith","email":"johnsmith@example.com"}'
echo ""

# Test DELETE /users/1
echo "Testing DELETE /users/1"
curl -X DELETE http://localhost:3120/users/1
echo ""

# Test GET /users after delete
echo "Testing GET /users after delete"
curl -X GET http://localhost:3120/users
echo ""

# Kill the server
kill $SERVER_PID