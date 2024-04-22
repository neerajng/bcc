import app from "../app.js";
import route from "../routes/sendEmail.js";

app.use("/api/", route);

export default app;
