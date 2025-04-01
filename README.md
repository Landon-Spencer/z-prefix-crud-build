# z-prefix-crud-build

Need to create a .env file in the server folder for connections string.
Example using a postgresql database docker container
DB_CONNECTION_STRING=postgresql://[username]:[password]@[url]:[port]/[database name]

Default API port is 8080 but can be changed with .env PORT variable.
Default Environment is 'development' but can be changed with .env NODE_ENV variable.