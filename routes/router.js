import { Router } from 'express';
import sendEmailRoutes from './sendEmail.js';
import submitFormRoutes from './submitForm.js';

const routes = Router();

routes.get("/", async (req, res) => {
  res.send(`Reached home!`);
});

routes.use("/api/", sendEmailRoutes);
routes.use("/api/", submitFormRoutes);


export default routes;
