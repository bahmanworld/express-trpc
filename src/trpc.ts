import { initTRPC } from "@trpc/server";
import * as trpcExpress from "@trpc/server/adapters/express";
import { observable } from "@trpc/server/observable";
import EventEmitter from "events";

const events = new EventEmitter();

export const createContext = ({
  req,
  res,
}: trpcExpress.CreateExpressContextOptions) => ({
  name: 'hello'
});

type Context = Awaited<ReturnType<typeof createContext>>;
const t = initTRPC.context<Context>().create();
export const appRouter = t.router({
  listen: t.procedure.subscription(() => {
    return observable((observable) => {
      const onListen = () => {
        console.log("pub sub started, hello world!");
        observable.next({ name: "bahman" });
      };
      events.on("hello", onListen);
      return () => {
        events.off("hello", onListen);
      };
    });
  }),
  user: t.router({
    hello: t.procedure.query(async (opts) => {
      events.emit("hello");
      return {
        name: "bahman",
      };
    }),
  }),
});
