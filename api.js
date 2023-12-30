const express = require('express');
const cors = require('cors');
const mysql = require('mysql');

const app = express();
const port = 3000;

app.use(cors());

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'adm1030#$3010',
  database: 'gerenciamentoong'
});

db.connect((err) => {
  if (err) {
    console.error('Erro ao conectar ao banco de dados:', err);
  } else {
    console.log('Conexão bem-sucedida ao banco de dados');
  }
});

app.get('/estoque', (req, res) => {
    const query = 'SELECT * FROM Estoque';
  
    db.query(query, (err, results) => {
      if (err) {
        console.error('Erro ao executar a consulta:', err);
        res.status(500).send('Erro interno no servidor');
      } else {
        console.log('Dados do estoque enviados com sucesso:', results);
        res.json(results);
      }
    });
  });
  

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
