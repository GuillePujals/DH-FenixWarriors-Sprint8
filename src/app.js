const express = require('express');
const app = express();
const path = require('path');
const session = require("express-session");

const userLoggedMiddleware = require ('./middlewares/userLoggedMiddleware');

//Traemos la inforamción de las rutas
const productRouter = require ('./routes/productRouter');
const userRouter = require ('./routes/userRouter');


//Para que llegue la información por body
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// view engine setup
app.set('views', path.resolve(__dirname, './views'));
app.set('view engine', 'ejs');

//Para usar métodos put y delete
const methodOverride = require ('method-override');
//Aquí estoy disponiendo la posibilidad para utilizar el seteo en los formularios para el usod e los metodos put ó delete
app.use(methodOverride('_method'));

app.use(express.static(path.resolve(__dirname, '../public')));

app.use(session({
	secret: "Secreto",
	resave: false,
	saveUninitialized: false,
}));

//Este middleware debe ir después de ssesion
app.use (userLoggedMiddleware);

app.use('/products', productRouter);
app.use('/', userRouter);
app.use('/', (req, res) => res.json({ clave: "con el server" }));

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
    console.log('Servidor corriendo en el puerto' + PORT)
}

);
