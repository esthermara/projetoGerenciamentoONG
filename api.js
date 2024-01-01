const express = require('express');
const cors = require('cors');
const mysql = require('mysql');

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

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

//API PARA A TABELA ESTOQUE *****************************************************

//Rota que popula a tabela etoqueTable
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

// Rota para criar um novo item no estoque
app.post('/estoque', (req, res) => {
  const { numeroControle, descricao, quantidade, origem } = req.body;

  const query = 'INSERT INTO Estoque (numeroControle, descricao, quantidade, origem) VALUES (?, ?, ?, ?)';
  const values = [numeroControle, descricao, quantidade, origem];

  db.query(query, values, (err, results) => {
    if (err) {
      console.error('Erro ao inserir no banco de dados:', err);
      res.status(500).send('Erro interno no servidor');
    } else {
      console.log('Novo item adicionado ao estoque:', results.insertId);
      res.json({ id: results.insertId });
    }
  });
});

// Rota para excluir um item do estoque
app.delete('/estoque/:id', (req, res) => {
  const { id } = req.params;

  const query = 'DELETE FROM Estoque WHERE idEstoque=?';
  const values = [id];

  db.query(query, values, (err) => {
    if (err) {
      console.error('Erro ao excluir do banco de dados:', err);
      res.status(500).send('Erro interno no servidor');
    } else {
      console.log('Item excluído do estoque:', id);
      res.json({ success: true });
    }
  });
});

//API PARA A TABELA ASSOCIADOS *****************************************************


//API PARA A TABELA OFICINAS *****************************************************


//API PARA A TABELA FINANCEIRO *****************************************************


//*********************************************************************************
app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
