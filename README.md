# CircleCI Demo

Basic Node.js API for demonstration purposes. Used for CircleCI Workshop.

## Setup

1. Install Node
2. Run in console, `npm install`
3. Test to make sure it all works, `npm run test`

## Running

Linux and Mac users: `npm run start`

On windows: `npm run start:windows`

## Manually testing/Querying

If you have a GUI HTTP REST client like [Postman](https://www.getpostman.com/), use that.

If not, you can use `curl` to perform HTTP operations:

`curl -d "username=user&password=pass" -X POST http://localhost:3000/login`

This example request should result in a 401 Unathorized response.
