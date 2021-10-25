var express = require('express');
var router = express.Router();
var jsonwebtoken = require("jsonwebtoken");
var { sign } = jsonwebtoken;
var { verify } = jsonwebtoken;



/* GET home page. */
/* router.get('/', async (req, res, next) => {
  try {
    const docs = await global.db.findAll();
    res.render('index', { title: 'Lista de Clientes', docs });
  } catch (err) {
    next(err);
  } 
})  */

router.get('/', async (req, res, next) => {
  try {
    const docs = await global.db.findAll();
    res.json(docs);
  } catch (err) {
    next(err);
  }
})

/* router.post('/new', async (req, res, next) => {
  const nome = req.body.nome;
  const idade = parseInt(req.body.idade);
 
  try {
    const result = await global.db.insert({ nome, idade });
    console.log(result);
    res.redirect('/');
  } catch (err) {
    next(err);
  }
}) */

router.post('/new', async (req, res, next) => {
  const nome = req.body.nome;
  const email = req.body.email;
  const senha = req.body.senha;

  try {
    const result = await global.db.insert({ nome, email, senha });
    console.log(result);
    res.redirect('/');
  } catch (err) {
    next(err);
  }
})

router.post('/auth/login', async (req, res, next) => {
  const { email, senha } = req.body;
  try {
    const docs = await global.db.findOne({ email, senha });
    const token = sign({}, "K9-+&%$#@KSN@", { expiresIn: "1d" });
    res.json({ docs, token });
  } catch (err) {
    next(err);
  }
})

router.post('/barbers', async (req, res, next) => {
  try {
    const autorizacaoHeader = req.headers.authorization;
    const [, token] = autorizacaoHeader.split(" ");
    const data = await global.db.findAllBarbers();
    res.json({ data });
  } catch (err) {
    next(err);
  }
})

router.post('/auth/logout', async (req, res, next) => {
  try {
    const autorizacaoHeader = req.headers.authorization;
    const [, token] = autorizacaoHeader.split(" ");
    const data = await global.db.findAllBarbers();
    res.json({ data });
  } catch (err) {
    next(err);
  }
})

router.post('/barber', async (req, res, next) => {
  const { idBarbeiro } = req.body;
  try {
    const autorizacaoHeader = req.headers.authorization;
    const [, token] = autorizacaoHeader.split(" ");
    const agendamento = await global.db.findOneBarbeiro(req);
    res.json({ agendamento });
  } catch (err) {
    next(err);
  }
})

router.post('/user/favorite', async (req, res, next) => {
  const { idBarbeiro } = req.body;
  try {
    const autorizacaoHeader = req.headers.authorization;
    const [, token] = autorizacaoHeader.split(" ");
    const favorito = await global.db.findOneFavorite(req);
    res.json({ favorito });
  } catch (err) {
    next(err);
  }
})


/* router.post('/auth/refresh', async (req, res, next) => {
  const autorizacaoHeader = req.headers.authorization;
  if (!autorizacaoHeader) {
    throw new Error('Não existe token');
  }
  const [, token] = autorizacaoHeader.split(" ");

  try {
    verify(token, "K9-+&%$#@KSN@");
    next();
  }
  catch
  {
    throw new Error('Token divergente');
  }
}); */

router.post('/auth/refresh', verifyJWT, (req, res) => {
  res.status(200).json({ message: "Token Válido!" });
  // res.json({ token });
})


function verifyJWT(req, res, next) {
  // var token = req.headers['x-access-token']; 
  const autorizacaoHeader = req.headers.authorization;
  /*  if (!autorizacaoHeader) {
     throw new Error('Não existe token');
   } */
  const [, token] = autorizacaoHeader.split(" ");
  if (!token)
    return res.json({ status: 401, auth: false, message: 'Token não informado.' });

  jsonwebtoken.verify(token, "K9-+&%$#@KSN@", function (err) {
    if (err)
      return res.json({ status: 500, auth: false, message: 'Token inválido.' });
    next();
  });
}

/* router.post('/auth/refresh', async (req, res, next) => {
  const { token } = req.body;
  try {
    const docs = await global.db.findOne({ token });
    const token = sign({}, "K9-+&%$#@KSN@", { expiresIn: "1d" });
    res.json({ docs, token });
  } catch (err) {
    next(err);
  }
}) */

/* router.get('/new', (req, res, next) => {
  res.render('new', { title: 'Novo Cadastro', doc: {"nome":"","idade":""}, action: '/new' });
});
 */
router.post('/edit/:id', async (req, res) => {
  const id = req.params.id;
  const nome = req.body.nome;
  const idade = parseInt(req.body.idade);

  try {
    const result = await global.db.update(id, { nome, idade });
    console.log(result);
    res.redirect('/');
  } catch (err) {
    next(err);
  }
})

router.get('/delete/:id', async (req, res) => {
  const id = req.params.id;

  try {
    const result = await global.db.deleteOne(id);
    console.log(result);
    res.redirect('/');
  } catch (err) {
    next(err);
  }
})

module.exports = router;
