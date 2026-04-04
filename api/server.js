const express = require('express');
const tariflerRouter = require('./tarifler-router');

const app = express();
app.use(express.json());

app.get('/', (req, res) => {
  res.json({ mesaj: 'Tarif Kitabı API\'ye hoşgeldiniz 🍝' });
});

app.use('/api/tarifler', tariflerRouter);

// Hata yönetimi middleware
app.use((err, req, res, next) => { // eslint-disable-line no-unused-vars
  console.error(err.message);
  res.status(500).json({ mesaj: 'Sunucu hatası', hata: err.message });
});

module.exports = app;
