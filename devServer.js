import app from "./app.js";
import routes from "./routes/router.js";

app.use("/", routes);

// Start server locally
app.listen(3000, () => {
    console.log("Server started. Go to http://localhost:3000/");
});
