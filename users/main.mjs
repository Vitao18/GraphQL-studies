import express from "express";
import expressGraphQL from "express-graphql";
import schema from "./schema/schema.js";

const app = express();

app.use("/graphql", expressGraphQL({ schema, graphiql: true }));

app.get("/", (req, res) => res.json({ ok: true }));

app.listen(8080, () => console.log("ESM em com @std/esm"));
