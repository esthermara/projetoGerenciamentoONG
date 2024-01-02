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
      console.log('Novo item adicionado ao estoque!', results.insertId);
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
      console.log('Item excluído do estoque!', id);
      res.json({ success: true });
    }
  });
});

//API PARA A TABELA ASSOCIADOS *****************************************************

//Rota que popula a tabela associadoTable
app.get('/associados', (req, res) => {
  const query = 'SELECT * FROM Associados';

  db.query(query, (err, results) => {
    if (err) {
      console.error('Erro ao executar a consulta:', err);
      res.status(500).send('Erro interno no servidor');
    } else {
      console.log('Dados dos associados enviados com sucesso!', results);
      res.json(results);
    }
  });
});

// Rota para criar um novo item no associados
app.post('/associados', (req, res) => {
  const { nome, endereco, email, telefone, dataAssociacao } = req.body;

  const query = 'INSERT INTO Associados (nome, endereco, email, telefone, dataAssociacao) VALUES (?, ?, ?, ?)';
  const values = [nome, endereco, email, telefone, dataAssociacao];

  db.query(query, values, (err, results) => {
    if (err) {
      console.error('Erro ao inserir no banco de dados:', err);
      res.status(500).send('Erro interno no servidor');
    } else {
      console.log('Novo associado adicionado!', results.insertId);
      res.json({ id: results.insertId });
    }
  });
});

// Rota para excluir um item do associados
app.delete('/associados/:id', (req, res) => {
  const { id } = req.params;

  const query = 'DELETE FROM Associados WHERE idAssociados=?';
  const values = [id];

  db.query(query, values, (err) => {
    if (err) {
      console.error('Erro ao excluir do banco de dados:', err);
      res.status(500).send('Erro interno no servidor');
    } else {
      console.log('Excluído dos associados!', id);
      res.json({ success: true });
    }
  });
});

//API PARA A TABELA OFICINAS *****************************************************

//Rota que popula a tabela oficinasTable
app.get('/oficinas', (req, res) => {
  const query = 'SELECT * FROM Oficinas';

  db.query(query, (err, results) => {
    if (err) {
      console.error('Erro ao executar a consulta:', err);
      res.status(500).send('Erro interno no servidor');
    } else {
      console.log('Dados das oficinas enviados com sucesso!', results);
      res.json(results);
    }
  });
});

// Rota para criar um novo item no oficinas
app.post('/oficinas', (req, res) => {
  const { nomeOficina, diaSemana, horario, professor } = req.body;

  const query = 'INSERT INTO Oficinas (nomeOficina, diaSemana, horario, professor) VALUES (?, ?, ?, ?)';
  const values = [nomeOficina, diaSemana, horario, professor];

  db.query(query, values, (err, results) => {
    if (err) {
      console.error('Erro ao inserir no banco de dados:', err);
      res.status(500).send('Erro interno no servidor');
    } else {
      console.log('Nova oficina adicionada!', results.insertId);
      res.json({ id: results.insertId });
    }
  });
});

// Rota para excluir um item do oficinas
app.delete('/oficinas/:id', (req, res) => {
  const { id } = req.params;

  const query = 'DELETE FROM Oficinas WHERE idOficinas=?';
  const values = [id];

  db.query(query, values, (err) => {
    if (err) {
      console.error('Erro ao excluir do banco de dados:', err);
      res.status(500).send('Erro interno no servidor');
    } else {
      console.log('Excluído das oficinas!', id);
      res.json({ success: true });
    }
  });
});

//API PARA A TABELA FATURAMENTO *****************************************************

//Rota que popula a tabela financeiroTable
app.get('/faturamento', (req, res) => {
  const query = 'SELECT * FROM Faturamento';

  db.query(query, (err, results) => {
    if (err) {
      console.error('Erro ao executar a consulta:', err);
      res.status(500).send('Erro interno no servidor');
    } else {
      console.log('Dados do faturamento enviados com sucesso!', results);
      res.json(results);
    }
  });
});

// Rota para criar um novo item no faturamento
app.post('/faturamento', (req, res) => {
  const { descricao, origem, valorEntrada, valorSaida, totalGeral } = req.body;

  const query = 'INSERT INTO Faturamento (descricao, origem, valorEntrada, valorSaida, totalGeral) VALUES (?, ?, ?, ?)';
  const values = [descricao, origem, valorEntrada, valorSaida, totalGeral];

  db.query(query, values, (err, results) => {
    if (err) {
      console.error('Erro ao inserir no banco de dados:', err);
      res.status(500).send('Erro interno no servidor');
    } else {
      console.log('Novo dado de faturamento adicionado!', results.insertId);
      res.json({ id: results.insertId });
    }
  });
});

// Rota para excluir um item do faturamento
app.delete('/faturamento/:id', (req, res) => {
  const { id } = req.params;

  const query = 'DELETE FROM Faturamento WHERE idFaturamento=?';
  const values = [id];

  db.query(query, values, (err) => {
    if (err) {
      console.error('Erro ao excluir do banco de dados:', err);
      res.status(500).send('Erro interno no servidor');
    } else {
      console.log('Excluído do faturamento!', id);
      res.json({ success: true });
    }
  });
});

//API PARA A TABELA USUÁRIO *****************************************************

// Rota para criar um novo item no usuario
app.post('/usuario', (req, res) => {
  const { nome, senha, competencia } = req.body;

  const query = 'INSERT INTO Usuario (nome, senha, competencia) VALUES (?, ?, ?, ?)';
  const values = [nome, senha, competencia];

  db.query(query, values, (err, results) => {
    if (err) {
      console.error('Erro ao inserir no banco de dados:', err);
      res.status(500).send('Erro interno no servidor');
    } else {
      console.log('Novo usuário adicionado!', results.insertId);
      res.json({ id: results.insertId });
    }
  });
});

// Rota para excluir um item do usuario
app.delete('/usuario/:id', (req, res) => {
  const { id } = req.params;

  const query = 'DELETE FROM Usuario WHERE idUsuario=?';
  const values = [id];

  db.query(query, values, (err) => {
    if (err) {
      console.error('Erro ao excluir do banco de dados:', err);
      res.status(500).send('Erro interno no servidor');
    } else {
      console.log('Usuário excluído!', id);
      res.json({ success: true });
    }
  });
});

//*********************************************************************************


app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
