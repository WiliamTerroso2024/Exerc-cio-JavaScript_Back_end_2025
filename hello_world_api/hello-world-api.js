const express = require('express');
const app = express();
const port = 3000;

// Rota para a página raiz "/"
app.get('/', (req, res) => {
    res.send('Hello World');
});

// Inicia o servidor com tratamento de erro
const server = app.listen(port)
    .on('error', (err) => {
        if (err.code === 'EADDRINUSE') {
            console.log(`A porta ${port} está ocupada. Tentando usar a porta ${port + 1}`);
            server.listen(port + 1);
        } else {
            console.error('Erro ao iniciar o servidor:', err);
        }
    })
    .on('listening', () => {
        const address = server.address();
        console.log(`Servidor rodando em http://localhost:${address.port}`);
    });