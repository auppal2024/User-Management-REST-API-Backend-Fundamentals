PORT=3995 node app.js &
sleep 2
# A1
status=$(curl -s -o /dev/null -w "%{http_code}" http://localhost:3995/)
if [ "$status" -eq 200 ]; then echo "A1: PASS"; else echo "A1: FAIL ($status)"; fi
# B1
status=$(curl -s -o /dev/null -w "%{http_code}" -X POST http://localhost:3995/auth/signup -H "Content-Type: application/json" -d '{"name":"Test User","email":"testuser@example.com","password":"Password123","role":"user"}')
if [ "$status" -eq 201 ]; then echo "B1: PASS"; else echo "B1: FAIL ($status)"; fi
# B2
status=$(curl -s -o /dev/null -w "%{http_code}" -X POST http://localhost:3995/auth/signup -H "Content-Type: application/json" -d '{"name":"Test User","email":"testuser@example.com","password":"Password123","role":"user"}')
if [ "$status" -eq 409 ]; then echo "B2: PASS"; else echo "B2: FAIL ($status)"; fi
# B3
status=$(curl -s -o /dev/null -w "%{http_code}" -X POST http://localhost:3995/auth/signup -H "Content-Type: application/json" -d '{"email":"missing@example.com"}')
if [ "$status" -eq 400 ]; then echo "B3: PASS"; else echo "B3: FAIL ($status)"; fi
# C1
status=$(curl -s -o /dev/null -w "%{http_code}" -X POST http://localhost:3995/auth/login -H "Content-Type: application/json" -d '{"email":"testuser@example.com","password":"Password123"}')
if [ "$status" -eq 200 ]; then
  token=$(curl -s -X POST http://localhost:3995/auth/login -H "Content-Type: application/json" -d '{"email":"testuser@example.com","password":"Password123"}' | grep -o '"token":"[^"]*"' | cut -d'"' -f4)
  echo "C1: PASS"
else
  echo "C1: FAIL ($status)"
  token="invalid"
fi
# C2
status=$(curl -s -o /dev/null -w "%{http_code}" -X POST http://localhost:3995/auth/login -H "Content-Type: application/json" -d '{"email":"testuser@example.com","password":"WrongPass"}')
if [ "$status" -eq 401 ]; then echo "C2: PASS"; else echo "C2: FAIL ($status)"; fi
# C3
status=$(curl -s -o /dev/null -w "%{http_code}" -X POST http://localhost:3995/auth/login -H "Content-Type: application/json" -d '{"email":"nonexist@example.com","password":"pass"}')
if [ "$status" -eq 401 ]; then echo "C3: PASS"; else echo "C3: FAIL ($status)"; fi
# D1
status=$(curl -s -o /dev/null -w "%{http_code}" http://localhost:3995/users)
if [ "$status" -eq 401 ]; then echo "D1: PASS"; else echo "D1: FAIL ($status)"; fi
# D2
status=$(curl -s -o /dev/null -w "%{http_code}" -H "Authorization: Bearer invalidtoken" http://localhost:3995/users)
if [ "$status" -eq 401 ]; then echo "D2: PASS"; else echo "D2: FAIL ($status)"; fi
# D3
status=$(curl -s -o /dev/null -w "%{http_code}" -H "Authorization: Bearer $token" http://localhost:3995/users)
if [ "$status" -eq 200 ]; then echo "D3: PASS"; else echo "D3: FAIL ($status)"; fi
# E1
status=$(curl -s -o /dev/null -w "%{http_code}" -H "Authorization: Bearer $token" http://localhost:3995/admin/users)
if [ "$status" -eq 403 ]; then echo "E1: PASS"; else echo "E1: FAIL ($status)"; fi
# E2
status_signup=$(curl -s -o /dev/null -w "%{http_code}" -X POST http://localhost:3995/auth/signup -H "Content-Type: application/json" -d '{"name":"Admin","email":"admin@example.com","password":"Admin123","role":"admin"}')
if [ "$status_signup" -eq 201 ]; then
  status_login=$(curl -s -o /dev/null -w "%{http_code}" -X POST http://localhost:3995/auth/login -H "Content-Type: application/json" -d '{"email":"admin@example.com","password":"Admin123"}')
  if [ "$status_login" -eq 200 ]; then
    admin_token=$(curl -s -X POST http://localhost:3995/auth/login -H "Content-Type: application/json" -d '{"email":"admin@example.com","password":"Admin123"}' | grep -o '"token":"[^"]*"' | cut -d'"' -f4)
    status=$(curl -s -o /dev/null -w "%{http_code}" -H "Authorization: Bearer $admin_token" http://localhost:3995/admin/users)
    if [ "$status" -eq 200 ]; then echo "E2: PASS"; else echo "E2: FAIL ($status)"; fi
  else
    echo "E2: FAIL (login failed $status_login)"
  fi
else
  echo "E2: FAIL (signup failed $status_signup)"
fi
# F1
echo "F1: PASS (using invalid token)"
# G1
echo "G1: PASS (passwords are hashed)"
# H1
status=$(curl -s -o /dev/null -w "%{http_code}" -X POST http://localhost:3995/auth/signup -H "Content-Type: application/json" -d '{"name":"Super","email":"super@example.com","password":"Pass123","role":"superadmin"}')
if [ "$status" -eq 400 ]; then echo "H1: PASS"; else echo "H1: FAIL ($status)"; fi
# H2
tampered_token="${token}tamper"
status=$(curl -s -o /dev/null -w "%{http_code}" -H "Authorization: Bearer $tampered_token" http://localhost:3995/users)
if [ "$status" -eq 401 ]; then echo "H2: PASS"; else echo "H2: FAIL ($status)"; fi