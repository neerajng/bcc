import { Router } from 'express';
import sendEmailRoutes from './sendEmail.js';

const routes = Router();

routes.get("/", async (req, res) => {
  res.send(`Reached home!`);
});

routes.use("/api/", sendEmailRoutes);

export default routes;
