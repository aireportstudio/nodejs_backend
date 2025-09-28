import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import rateLimit from 'express-rate-limit';
import routes from "./routes";

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json()) // <--- Important for JSON body
app.use(express.urlencoded({ extended: true }))
app.use(rateLimit({ windowMs: 15 * 60 * 1000, max: 100 }));
// server.ts / app.ts (where you create the express app)

app.use("/", routes);


app.get('/', (_, res) => res.json({ "server": "Started successfully" }));

export default app;
