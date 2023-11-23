const express = require('express');
const app = express();
const port = 3000;


app.use(express.json());
app.use(express.urlencoded({ extended: false}))

MoviesRouter = require('./routes/movies')
app.use('/movies', MoviesRouter)


app.get('/', (req, res) => {
  res.send('Hello, World! 🌟');
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
