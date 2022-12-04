import express from "express";
import { router } from "./src/routes";
import cors from "cors";

const app = express();

app.use(express.json());
app.use(cors());
app.use(router);

let port = process.env.PORT || 3333;

app.listen(port);
