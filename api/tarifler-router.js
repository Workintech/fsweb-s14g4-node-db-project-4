const router = require('express').Router();
const Tarifler = require('./tarifler-model');

// GET /api/tarifler/:id - ID'ye göre tarif getir
router.get('/:id', async (req, res, next) => {
  try {
    const tarif = await Tarifler.idyeGoreTarifGetir(req.params.id);
    if (!tarif) {
      return res.status(404).json({ mesaj: `${req.params.id} id'li tarif bulunamadı` });
    }
    res.json(tarif);
  } catch (err) {
    next(err);
  }
});

// GET /api/tarifler - Tüm malzemeleri listele (yeni tarif formu için)
router.get('/', async (req, res, next) => {
  try {
    const malzemeler = await Tarifler.malzemeleriGetir();
    res.json({ mesaj: 'Mevcut malzemeler', malzemeler });
  } catch (err) {
    next(err);
  }
});

// POST /api/tarifler - Yeni tarif oluştur (Görev 3)
router.post('/', async (req, res, next) => {
  try {
    const { tarif_adi, adimlar } = req.body;
    if (!tarif_adi || !adimlar || !adimlar.length) {
      return res.status(400).json({ mesaj: 'tarif_adi ve en az bir adım zorunludur' });
    }
    const yeniTarif = await Tarifler.tarifOlustur({ tarif_adi, adimlar });
    res.status(201).json(yeniTarif);
  } catch (err) {
    // Unique constraint ihlali
    if (err.message && err.message.includes('UNIQUE')) {
      return res.status(400).json({ mesaj: 'Bu isimde bir tarif zaten mevcut' });
    }
    next(err);
  }
});

module.exports = router;
