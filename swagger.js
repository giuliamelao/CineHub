const swaggerAutogen = require('swagger-autogen')()

outputFile = './swagger_doc.json'
endpointsFiles = ['./routes/admin.js', './routes/install.js', './routes/login.js',
                  './routes/mod.js', './routes/movies.js', './routes/signup.js', './routes/user.js']


const doc = {
        info: {
                "version": "1.0.0",
                "title": "CineHub",
                "description": "A movie review and rating platform built with JavaScript"
        }
}



swaggerAutogen(outputFile, endpointsFiles, doc)
