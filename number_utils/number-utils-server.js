const express = require('express');
const app = express();
const port = 3000;

// Middleware CORS
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});

// Função auxiliar para processar números
function processNumbers(numbers, action) {
    // Converte a string de números em um array de números
    const numberArray = numbers.split(',').map(num => parseInt(num.trim()));
    
    switch (action) {
        case 'minimum':
            return Math.min(...numberArray);
        case 'maximum':
            return Math.max(...numberArray);
        default:
            throw new Error('Ação inválida');
    }
}

// Rota para processar números
app.get('/number/:action', (req, res) => {
    const { action } = req.params;
    const { numbers } = req.query;

    if (!numbers) {
        return res.status(400).json({
            error: 'O parâmetro numbers é obrigatório na query string'
        });
    }

    try {
        const result = processNumbers(numbers, action);
        res.json({
            numbers: numbers,
            result: result,
            action: action
        });
    } catch (error) {
        res.status(400).json({
            error: error.message
        });
    }
});

// Inicia o servidor
app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});
