import express, { Express, Request, Response } from "express";
import * as trpcExpress from "@trpc/server/adapters/express";
import { appRouter, createContext } from "./trpc";


const app: Express = express();

app.get("/api/upload", (req: Request, res: Response) => {
  res.json({ result: { data: "all files uploaded", success: true } });
});

app.use(
  "/api",
  trpcExpress.createExpressMiddleware({
    router: appRouter,
    createContext,
  })
);



app.listen(3000, () => {
  console.log("listening on port 3000...");
});
