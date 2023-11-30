const express = require('express');
const app = express();
const port = 3000;


app.use(express.json());
app.use(express.urlencoded({ extended: false}))

MoviesRouter = require('./routes/movies')
app.use('/movies', MoviesRouter)

LoginRouter = require('./routes/login')
app.use('/', LoginRouter)

app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500);
  res.json({mensagem: "Erro"});
})



app.get('/', (req, res) => {
  res.send('Hello, World! 🌟');
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});