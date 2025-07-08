# Backend Node.js con Sequelize

Questo è il backend del progetto, realizzato in **Node.js** usando **Express** e **Sequelize ORM** per la gestione del database.

---

## 🚀 Come iniziare

1️⃣ **Installa le dipendenze**

```bash
npm install
````

2️⃣ **Configura il database**

* Modifica il file di configurazione (es. `config/config.json` o variabili d’ambiente) per connetterti al tuo database (PostgreSQL, MySQL, SQLite, ecc.).
* Esegui le migrazioni (se previste):

```bash
npx sequelize db:migrate
```

3️⃣ **Avvia il server**

```bash
npm run dev
```

Il server partirà (di solito) su `http://localhost:3001` (o porta configurata).

---

## 🗂️ Struttura del progetto

* **`/models`**
  Definisce i modelli Sequelize che mappano le tabelle del database.

* **`/controllers`**
  Contiene la logica per gestire le richieste (CRUD e altre operazioni).

* **`/routes`**
  Definisce gli endpoint API e li collega ai controller.

* **`/config`**
  Configurazioni di ambiente e database.

* **`/middlewares`** *(opzionale)*
  Middleware personalizzati per autenticazione, validazione, ecc.

---

## 🔄 Flusso di lavoro API

* Le **routes** ricevono le richieste HTTP.
* Le routes chiamano i **controller** corrispondenti.
* I controller interagiscono con i **modelli Sequelize** per leggere o modificare i dati.
* La risposta viene inviata al client.

---

## 🛠️ Esempio rapido

### Modello

```js
// models/Element.js
module.exports = (sequelize, DataTypes) => {
  const Element = sequelize.define('Element', {
    name: DataTypes.STRING,
    timeWork: DataTypes.FLOAT,
  });
  return Element;
};
```

### Controller

```js
// controllers/elementController.js
const { Element } = require('../models');

exports.addTimeWork = async (req, res) => {
  try {
    const { id, time } = req.body;
    const element = await Element.findByPk(id);
    if (!element) {
      return res.status(404).json({ error: "Element not found" });
    }
    element.timeWork = time;
    await element.save();
    res.status(200).json({ message: "Time updated", element });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};
```

### Route

```js
// routes/elementRoutes.js
const express = require('express');
const router = express.Router();
const elementController = require('../controllers/elementController');

router.post('/addTimeWork', elementController.addTimeWork);

module.exports = router;
```

---

## 📦 Comandi utili

* Avvia server in modalità sviluppo (con nodemon):

```bash
npm run dev
```

* Esegui migrazioni:

```bash
npx sequelize db:migrate
```

* Esegui seeding dati (se configurato):

```bash
npx sequelize db:seed:all
```

---

## 🔗 Collegamento con frontend

Il backend espone API REST che il frontend Next.js chiama tramite fetch o Axios nel percorso `/api/...`.

---

## 📝 Note

* Usa variabili d’ambiente per configurare database e porta (es. `.env`).
* Organizza i controller per mantenere il codice pulito e riutilizzabile.
* Gestisci gli errori in modo consistente per facilitare debugging e UX.

---

## 📚 Risorse utili

* [Documentazione Sequelize](https://sequelize.org/docs/)
* [Express.js Guide](https://expressjs.com/)
* [Node.js Documentation](https://nodejs.org/en/docs/)

