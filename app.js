const express = require('express');
const app = express();
const path = require('path');
const session = require("express-session");

const userLoggedMiddleware = require ('./src/middlewares/userLoggedMiddleware');
const admLoggedMiddleware = require ('./src/middlewares/admLoggedMiddleware');

//Traemos la inforamción de las rutas
const homeRouter = require ('./src/routes/homeRouter');
const productRouter = require ('./src/routes/productRouter');
const userRouter = require ('./src/routes/userRouter');
const destinationRoute = require ('./src/routes/destinationRoute');
const cartRoute = require('./src/routes/cartRouter');
const propertyApiRouter = require('./src/routes/api/propertyApiRouter');
const userApiRouter = require('./src/routes/api/userApiRouter');

//Para que llegue la información por body
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// view engine setup
app.set('views', path.resolve(__dirname, './src/views'));
app.set('view engine', 'ejs');

//Para usar métodos put y delete
const methodOverride = require ('method-override');
//Aquí estoy disponiendo la posibilidad para utilizar el seteo en los formularios para el usod e los metodos put ó delete
app.use(methodOverride('_method'));

//app.use(express.static(path.resolve(__dirname, './public')));
app.use(express.static('public'));

app.use(session({
	secret: "Secreto",
	resave: false,
	saveUninitialized: false,
}));

//Este middleware debe ir después de ssesion
app.use (userLoggedMiddleware);
app.use (admLoggedMiddleware);

app.use('/products', productRouter);
app.use('/destinations', destinationRoute)
app.use('/cart', cartRoute);
app.use('/api/properties', propertyApiRouter);
app.use('/api/users',userApiRouter)
app.use('/', userRouter);
app.use('/', homeRouter);

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
    console.log('Servidor corriendo en el puerto' + PORT)
}

);
