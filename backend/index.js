const express = require("express");
const mysql = require("mysql2/promise");
const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(express.json());

// Enable CORS
app.use(cors());

// Set up the MySQL connection pool
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});
const dateFormatter = new Intl.DateTimeFormat("en-US", {
  day: "numeric",
  month: "short",
  year: "2-digit",
});
const getFormattedDate = (date) => {
  return dateFormatter.format(date);
};
app.get("/getTasks", async (req, res) => {
  try {
    const conn = await pool.getConnection();
    const [rows] = await conn.query(`SELECT * FROM tasks`);
    let data = {};
    rows.forEach((el) => {
      let day = getFormattedDate(el.Date);
      let task = {
        title: el.Heading,
        sd: el.SDesc,
        des: el.Content,
        id: el.ID,
      };
      data[day] = [task, ...(data[day] || [])];
    });
    conn.release();
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error });
  }
});
app.post("/addTask", async (req, res) => {
  try {
    const conn = await pool.getConnection();
    const { title = "", sdesc = "", desc = "" } = req.body;
    let query =
      "insert into tasks(Heading, SDesc, Content, Date) values (?,?,?,?)";
    const [rows] = await conn.query(query, [title, sdesc, desc, new Date()]);
    conn.release();
    res.json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error });
  }
});

app.listen(5000, () => {
  console.log("Server listening on port 5000");
});
