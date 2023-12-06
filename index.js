const express = require('express');
const app = express();
const port = 3000;


app.use(express.json());
app.use(express.urlencoded({ extended: false}))

const { UserModel } = require('./model/bd');



InstallRouter = require('./routes/install');
app.use(InstallRouter);

ModRouter = require('./routes/mod');
app.use(ModRouter);

UserRouter = require('./routes/user');
app.use(UserRouter);

AdminRouter = require('./routes/admin');
app.use(AdminRouter);

MoviesRouter = require('./routes/movies')
app.use('/movies', MoviesRouter)

LoginRouter = require('./routes/login')
app.post('/login', LoginRouter)

const SignupRouter = require('./routes/signup');
app.post('/signup', SignupRouter);


app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500);
  res.json({mensagem: "Erro"});
})



app.get('/', (req, res) => {
  res.send('Hello, CineHub! 🌟');
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
