import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import rateLimit from 'express-rate-limit';
import routes from "./routes";

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(rateLimit({ windowMs: 15 * 60 * 1000, max: 100 }));


app.use("/api", routes);


app.get('/', (_, res) => res.json({ "server": "Started successfully" }));

export default app;
