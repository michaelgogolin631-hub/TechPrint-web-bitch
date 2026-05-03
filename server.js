const express = require("express");
const cors = require("cors");
const axios = require("axios");

const app = express();
app.use(cors());

// replace this with your sheet ID
const SHEET_ID = "YOUR_SHEET_ID";

// this is the magic link (no API key needed)
const URL = `https://docs.google.com/spreadsheets/d/1YKLmpVT8CBH0IFQ0xJqgZKZ9M_Rs0P9YTLtIqZlenKY/gviz/tq?tqx=out:json`;

app.get("/orders", async (req, res) => {
  try {
    const response = await axios.get(URL);

    // clean weird Google response
    const data = JSON.parse(
      response.data.substr(47).slice(0, -2)
    );

    const rows = data.table.rows;

    const orders = rows.map(row => {
      return row.c.map(cell => cell?.v || "");
    });

    res.json(orders);

  } catch (error) {
    res.status(500).json({ error: "Failed to fetch data" });
  }
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});