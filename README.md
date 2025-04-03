# Z-Prefix CRUD Build
This project uses a React Client that works with an Express API connected to a PostgreSQL database. The repo is divided into two folders that hold all of the Client App and Server code. To spin up this repos you will need to clone the repo onto your machine using the Github clone link. Once the repo is cloned to your machine follow the instructions below.
## Database Instructions
This project was created with a PostgreSQL database running in a docker container connected to a local volumes folder for data persistence. To run this repo you will need to create an empty database of your own choosing, and add the database information to the `DB_CONNECTION_STRING` variable in the .env file that will need to be created in the server folder. Once you have a database ready you can set up the API server.
## Server Instructions
In your terminal navigate to the server folder and run `npm install` to install all of the package dependencies for the server to run. Next you'll need to create a .env file in the server folder for the connections string. I've added an example of my `B_CONNECTION_STRING` using a PostgreSQL database docker container below.

`DB_CONNECTION_STRING=postgresql://[username]:[password]@[url]:[port]/[database name]`

The default API port is 8080 but can be changed with the .env PORT variable or in the `server.js` file under the `PORT` variable. The default Environment is 'development' but can be changed with .env NODE_ENV variable.

Once you have all of your environment variable set up and database connection information then you can spin up the database. If this is the first time that you are spinning up the API you can run `npm spin-up` and this will run the migration files to create the database tables, seed the database, and start the Express server with `nodemon`. If everything has been set up correctly your console should show that `nodemon` is starting and that the Server is running on the port that you have chosen.

Congratulations, hopefully you have a running API that is connected to your database. Now move on to the Client Instructions to start using the app.
## Client Instructions
In a new terminal navigate into the app folder. Run `npm install` to install all of the app packages. The react app is left on the default port of `5173`. If you want to change the port you can update the `vite.config.js` file by adding a `server` key to the `defineConfig` object. The `server` key will have an object that looks like `{port: <your-port>, open: true}`.

Now that the ports are set up run `npm start` in the app folder and the app should spin up and be visible in your browser at `http://localhost:<your-port>/`
## API Endpoints
The base URL is `http://localhost:<your-api-port>`

GET '/' - Sends 'API Server is up and running!' to verify the API is working\
GET '/items{/:id}' - Returns all items if no id is provided or a specific item by id if an id is specified\
GET '/user/:id' - Returns all items associated with user by in input id
POST '/users' - Creates a new users\
POST '/login' - Used to verify that the Username and Password match a user in the database. Returns user info and an authentication message\
POST '/items' - Creates a new item\
PATCH '/items/:id' - Updates an item by provided id\
DELETE '/items/:id' - Deletes item by provided id\
