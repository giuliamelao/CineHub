const express = require('express');
const app = express();
const port = 3000;


app.use(express.json());
app.use(express.urlencoded({ extended: false}))

const { UserModel } = require('./model/bd');

async function createAdminUser() {
  try {
      const findAdmin = await UserModel.findOne({
          where: { role: 'admin' },
      });

      if (!findAdmin) {
          await UserModel.create({
              nome: 'Admin',
              username: 'admin',
              password: 'admin',
              role: 'admin',
          });

          console.log('Admin created successfully.');
      } else {
          console.log('Admin already exists.');
      }
  } catch (error) {
      console.error('Error creating admin:', error);
  }
}

createAdminUser();

InstallRouter = require('./routes/install');
app.use(InstallRouter);

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
