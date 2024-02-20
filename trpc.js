"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.appRouter = exports.createContext = void 0;
const server_1 = require("@trpc/server");
const observable_1 = require("@trpc/server/observable");
const events_1 = __importDefault(require("events"));
const events = new events_1.default();
const createContext = ({ req, res, }) => {
    res.setHeader('Content-Type', 'text/html');
    res.setHeader('Cache-Control', 's-max-age=1, stale-while-revalidate');
    return {
        name: 'bahman'
    };
};
exports.createContext = createContext;
const t = server_1.initTRPC.context().create();
exports.appRouter = t.router({
    listen: t.procedure.subscription(() => {
        return (0, observable_1.observable)((observable) => {
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
        hello: t.procedure.query((opts) => __awaiter(void 0, void 0, void 0, function* () {
            events.emit("hello");
            return {
                name: "bahman",
            };
        })),
    }),
});
