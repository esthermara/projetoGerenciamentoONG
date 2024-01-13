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
app.get('/associados', (reqAssociados, resAssociados) => {
  const query = 'SELECT * FROM Associados';

  db.query(query, (err, resultsAssociados) => {
    if (err) {
      console.error('Erro ao executar a consulta:', err);
      resAssociados.status(500).send('Erro interno no servidor');
    } else {
      console.log('Dados dos associados enviados com sucesso!', resultsAssociados);
      resAssociados.json(resultsAssociados);
    }
  });
});

// Rota para criar um novo item no associados
app.post('/associados', (reqAssociados, resAssociados) => {
  const { nome, endereco, email, telefone, dataAssociacao } = reqAssociados.body;

  const query = 'INSERT INTO Associados (nome, endereco, email, telefone, dataAssociacao) VALUES (?, ?, ?, ?, ?)';
  const values = [nome, endereco, email, telefone, dataAssociacao];

  db.query(query, values, (err, resultsAssociados) => {
    if (err) {
      console.error('Erro ao inserir no banco de dados:', err);
      resAssociados.status(500).send('Erro interno no servidor');
    } else {
      console.log('Novo associado adicionado!', resultsAssociados.insertId);
      resAssociados.json({ id: resultsAssociados.insertId });
    }
  });
});

// Rota para excluir um item do associados
app.delete('/associados/:id', (reqAssociados, resAssociados) => {
  const { id } = reqAssociados.params;

  const query = 'DELETE FROM Associados WHERE idAssociados=?';
  const values = [id];

  db.query(query, values, (err) => {
    if (err) {
      console.error('Erro ao excluir do banco de dados:', err);
      resAssociados.status(500).send('Erro interno no servidor');
    } else {
      console.log('Excluído dos associados!', id);
      resAssociados.json({ success: true });
    }
  });
});

//API PARA A TABELA OFICINAS *****************************************************

//Rota que popula a tabela oficinasTable
app.get('/oficinas', (reqOficinas, resOficinas) => {
  const query = 'SELECT * FROM Oficinas';

  db.query(query, (err, resultsOficinas) => {
    if (err) {
      console.error('Erro ao executar a consulta:', err);
      resOficinas.status(500).send('Erro interno no servidor');
    } else {
      console.log('Dados das oficinas enviados com sucesso!', resultsOficinas);
      resOficinas.json(resultsOficinas);
    }
  });
});

// Rota para criar um novo item no oficinas
app.post('/oficinas', (reqOficinas, resOficinas) => {
  const { nomeOficina, diaSemana, horario, professor } = reqOficinas.body;

  const query = 'INSERT INTO Oficinas (nomeOficina, diaSemana, horario, professor) VALUES (?, ?, ?, ?)';
  const values = [nomeOficina, diaSemana, horario, professor];

  db.query(query, values, (err, resultsOficinas) => {
    if (err) {
      console.error('Erro ao inserir no banco de dados:', err);
      resOficinas.status(500).send('Erro interno no servidor');
    } else {
      console.log('Nova oficina adicionada!', resultsOficinas.insertId);
      resOficinas.json({ id: resultsOficinas.insertId });
    }
  });
});

// Rota para excluir um item do oficinas
app.delete('/oficinas/:id', (reqOficinas, resOficinas) => {
  const { id } = reqOficinas.params;

  const query = 'DELETE FROM Oficinas WHERE idOficinas=?';
  const values = [id];

  db.query(query, values, (err) => {
    if (err) {
      console.error('Erro ao excluir do banco de dados:', err);
      resOficinas.status(500).send('Erro interno no servidor');
    } else {
      console.log('Excluído das oficinas!', id);
      resOficinas.json({ success: true });
    }
  });
});

//API PARA A TABELA FATURAMENTO *****************************************************

//Rota que popula a tabela financeiroTable
app.get('/faturamento', (reqFinanceiro, resFinanceiro) => {
  const query = 'SELECT * FROM Faturamento';

  db.query(query, (err, resultsFinanceiro) => {
    if (err) {
      console.error('Erro ao executar a consulta:', err);
      resFinanceiro.status(500).send('Erro interno no servidor');
    } else {
      console.log('Dados do faturamento enviados com sucesso!', resultsFinanceiro);
      resFinanceiro.json(resultsFinanceiro);
    }
  });
});

// Rota para criar um novo item no faturamento
app.post('/faturamento', (reqFinanceiro, resFinanceiro) => {
  const { descricao, origem, valorEntrada, valorSaida, totalGeral } = reqFinanceiro.body;

  const query = 'INSERT INTO Faturamento (descricao, origem, valorEntrada, valorSaida, totalGeral) VALUES (?, ?, ?, ?, ?)';
  const values = [descricao, origem, parseFloat(valorEntrada), parseFloat(valorSaida), parseFloat(totalGeral)];

  db.query(query, values, (err, resultsFinanceiro) => {
    if (err) {
      console.error('Erro ao inserir no banco de dados:', err);
      resFinanceiro.status(500).send('Erro interno no servidor');
    } else {
      console.log('Novo dado de faturamento adicionado!', resultsFinanceiro.insertId);
      resFinanceiro.json({ id: resultsFinanceiro.insertId });
    }
  });
});

// Rota para excluir um item do faturamento
app.delete('/faturamento/:id', (reqFinanceiro, resFinanceiro) => {
  const { id } = reqFinanceiro.params;

  const query = 'DELETE FROM Faturamento WHERE idFaturamento=?';
  const values = [id];

  db.query(query, values, (err) => {
    if (err) {
      console.error('Erro ao excluir do banco de dados:', err);
      resFinanceiro.status(500).send('Erro interno no servidor');
    } else {
      console.log('Excluído do faturamento!', id);
      resFinanceiro.json({ success: true });
    }
  });
});

//API PARA A TABELA USUÁRIO *****************************************************

//Rota que popula a tabela usuario
app.get('/usuario', (reqUsuario, resUsuario) => {
  const query = 'SELECT * FROM Usuario';

  db.query(query, (err, resultsUsuario) => {
    if (err) {
      console.error('Erro ao executar a consulta:', err);
      resUsuario.status(500).send('Erro interno no servidor');
    } else {
      console.log('Dados do usuário enviados com sucesso!', resultsUsuario);
      resUsuario.json(resultsUsuario);
    }
  });
});

// Rota para criar um novo item no usuario
app.post('/usuario', (reqUsuario, resUsuario) => {
  const { nome, senha, competencia } = reqUsuario.body;

  const query = 'INSERT INTO Usuario (nome, senha, competencia) VALUES (?, ?, ?)';
  const values = [nome, senha, competencia];

  db.query(query, values, (err, resultsUsuario) => {
    if (err) {
      console.error('Erro ao inserir no banco de dados:', err);
      resUsuario.status(500).send('Erro interno no servidor');
    } else {
      console.log('Novo usuário adicionado!', resultsUsuario.insertId);
      resUsuario.json({ id: resultsUsuario.insertId });
    }
  });
});

// Rota para excluir um item do usuario (ainda não utilizada!!!)
app.delete('/usuario/:id', (reqUsuario, resUsuario) => {
  const { id } = reqUsuario.params;

  const query = 'DELETE FROM Usuario WHERE idUsuario=?';
  const values = [id];

  db.query(query, values, (err) => {
    if (err) {
      console.error('Erro ao excluir do banco de dados:', err);
      resUsuario.status(500).send('Erro interno no servidor');
    } else {
      console.log('Usuário excluído!', id);
      resUsuario.json({ success: true });
    }
  });
});

// Rota para autenticar usuário
app.post('/login', (reqLogin, resLogin) => {
  const { nome, senha, competencia } = reqLogin.body;

  const query = 'SELECT * FROM Usuario WHERE nome = ? AND senha = ? AND competencia = ?';
  const values = [nome, senha, competencia];

  db.query(query, values, (err, resultsLogin) => {
      if (err) {
          console.error('Erro ao executar a consulta:', err);
          resLogin.status(500).send('Erro interno no servidor');
      } else {
          if (resultsLogin.length > 0) {
              resLogin.json({ success: true });
          } else {
              resLogin.status(401).json({ message: 'Credenciais incorretas. Tente novamente.' });
          }
      }
  });
});

//*********************************************************************************


app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
