const express = require('express');
const app = express();
const path = require('path');

const PORT = process.env.PORT || 3000

const productRouter = require ('./routes/productRouter');

app.use(express.static(path.resolve(__dirname, '../public')));

app.use(express.json())
//URL encode  - Para que nos pueda llegar la información desde el formulario al req.body
app.use(express.urlencoded({ extended: false }));

// view engine setup
app.set('views', path.resolve(__dirname, './views'));
app.set('view engine', 'ejs');

app.use('/products', productRouter);
app.use('/', (req, res) => res.json({ clave: "con el server" }));


app.listen(PORT, () => {
    console.log('Servidor corriendo en el puerto' + PORT)
}

);
