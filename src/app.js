import express from "express";
import swaggerUi from "swagger-ui-express";
import authRoutes from "./modules/auth/auth.routes.js";
import taskRoutes from "./modules/tasks/task.routes.js";
import swaggerSpec from "./docs/swagger.js";
import notFound from "./middleware/not-found.middleware.js";
import { errorHandler } from "./middleware/error.middleware.js";

const app = express();

app.use(express.json());
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use("/api/auth", authRoutes);
app.use("/api/tasks", taskRoutes);

app.use(notFound);
app.use(errorHandler);


export default app;