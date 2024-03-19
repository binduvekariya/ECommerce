const app = require('./app');
const dotenv = require("dotenv");
const connectDatabase = require("./config/db");

// Handling Uncaught Exception
process.on("UncaughtException", (err) => {
    console.log(`Error: ${err.message}`);
    console.log(`Shutting down the server due to Uncaught Exception.`);

    process.exit(1);
})
//config
dotenv.config({path:"BackEnd/config/config.env"});

// Connecting to the Database
connectDatabase()

const server = app.listen(process.env.PORT, () =>
{
    console.log(`Server is working on http://localhost:${process.env.PORT}`);
})


// Unhandled promise Rejection
process.on("unhandledRejection", err => {
    console.log(`Error: ${err.message}`);
    console.log(`Shutting down the server due to Unhandled Promise Rejection.`);

    server.close( () => {
        process.exit(1);
    });

})