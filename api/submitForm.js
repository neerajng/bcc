import app from "../app.js";
import route from "../routes/submitForm.js";

app.use("/api/", route);

export default app;
