const express = require('express');
const app = express();
const port = 3000;

// Middleware para CORS
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});


// Middleware para processar JSON
app.use(express.json());

// Rota para converter texto para minúsculas
app.post('/text/lowercase', (req, res) => {
    if (!req.body.text) {
        return res.status(400).json({
            error: 'O campo text é obrigatório no corpo da requisição'
        });
    }

    const result = req.body.text.toLowerCase();
    res.json({
        original: req.body.text,
        result: result
    });
});

// Rota para converter texto para maiúsculas
app.post('/text/uppercase', (req, res) => {
    if (!req.body.text) {
        return res.status(400).json({
            error: 'O campo text é obrigatório no corpo da requisição'
        });
    }

    const result = req.body.text.toUpperCase();
    res.json({
        original: req.body.text,
        result: result
    });
});

// Inicia o servidor
app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});
