const express = require("express");

const db = require("../data/dbConfig.js");

const server = express();

server.use(express.json());

server.get("/api/accounts", (req, res) => {
  db("accounts")
    .select("*")
    .then((response) => {
      res.status(200).json(response);
    })
    .catch(() => {
      res
        .status(500)
        .json({ errorMessage: "Error occured when getting data." });
    });
});

server.post("/api/accounts", (req, res) => {
  db("accounts")
    .insert(req.body, "id")
    .then((response) => {
      db("accounts")
        .where({ id: response[0] })
        .then((row) => {
          res.status(201).json(row);
        });
    })
    .catch(() => {
      res
        .status(500)
        .json({ errorMessage: "Error occured when creating account." });
    });
});

server.put("/api/accounts/:id", (req, res) => {
  db("accounts")
    .where(req.params)
    .update(req.body)
    .then((response) => {
      db("accounts")
        .select("*")
        .where(req.params)
        .then((row) => {
          res.status(200).json(row);
        });
    })
    .catch(() => {
      res
        .status(500)
        .json({ errorMessage: "Error occured when updating account." });
    });
});

server.delete("/api/accounts/:id", (req, res) => {
  db("accounts")
    .where(req.params)
    .delete()
    .then(() => {
      res.status(200).json({ message: "Successfully deleted account." });
    })
    .catch(() => {
      res
        .status(500)
        .json({ errorMessage: "Error occured when deleting account." });
    });
});

module.exports = server;
