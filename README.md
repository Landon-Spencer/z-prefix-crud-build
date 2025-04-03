# Z-Prefix CRUD Build
This project uses a React Client that works with an Express API connected to a PostgreSQL database. The repo is divided into two folders that hold all of the Client App and Server code. To spin up this repos you will need to clone the repo onto your machine using the Github clone link. Once the repo is cloned to your machine follow the instructions below.
## Database Instructions
This project was created with a PostgreSQL database running in a docker container connected to a local volumes folder for data persistence. To run this repo you will need to create an empty database of your own choosing, and add the database information to the `DB_CONNECTION_STRING` variable in the .env file that will need to be created in the server folder. Once you have a database ready you can set up the API server.
## Server Instructions
In your terminal navigate to the server folder and run `npm install` to install all of the package dependencies for the server to run. You'll need to create a .env file in the server folder for the connections string. I've added an example of my `B_CONNECTION_STRING` using a PostgreSQL database docker container below.

`DB_CONNECTION_STRING=postgresql://[username]:[password]@[url]:[port]/[database name]`

The default API port is 8080 but can be changed with the .env PORT variable.
The default Environment is 'development' but can be changed with .env NODE_ENV variable.
## Client Instructions