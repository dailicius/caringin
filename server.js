const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;
const DB_DIR = path.join(__dirname, "db");

// Pastikan folder db ada
if (!fs.existsSync(DB_DIR)) fs.mkdirSync(DB_DIR);

app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

function dbPath(shift) {
  // Hanya izinkan nama file yang aman
  const safe = shift.replace(/[^a-zA-Z0-9_-]/g, "");
  return path.join(DB_DIR, `${safe}.json`);
}

function defaultDB() {
  return {
    data: [],
    acc: [],
    transfer: [],
    tartun: [],
    pengeluaran: [],
    telegram: { nominal: 0, qty: 0 }
  };
}

function readDB(shift) {
  const file = dbPath(shift);
  if (!fs.existsSync(file)) return defaultDB();
  try {
    return JSON.parse(fs.readFileSync(file, "utf8"));
  } catch {
    return defaultDB();
  }
}

function writeDB(shift, data) {
  fs.writeFileSync(dbPath(shift), JSON.stringify(data, null, 2), "utf8");
}

// GET /api/db/:shift — ambil data
app.get("/api/db/:shift", (req, res) => {
  const db = readDB(req.params.shift);
  res.json(db);
});

// POST /api/db/:shift — simpan data (full replace)
app.post("/api/db/:shift", (req, res) => {
  const shift = req.params.shift;
  const body = req.body;

  // Validasi struktur minimal
  if (!body || typeof body !== "object") {
    return res.status(400).json({ error: "Body tidak valid" });
  }

  writeDB(shift, body);
  res.json({ ok: true });
});

// DELETE /api/db/:shift — reset data shift
app.delete("/api/db/:shift", (req, res) => {
  writeDB(req.params.shift, defaultDB());
  res.json({ ok: true });
});

app.listen(PORT, () => {
  console.log(`Server berjalan di port ${PORT}`);
});
