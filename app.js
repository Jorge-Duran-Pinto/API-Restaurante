const express = require('express');
const middlewares = require('./middlewares')

// Routes
const authRoutes = require('./auth/auth.routes');
const almacenRoutes = require('./wareHouse/wareHouse.routes');
const cocineroRoutes = require('./routes/cocinero');
const empleadoRoutes = require('./employee/employee.routes');
const estanteRoutes = require('./routes/estante');
const ingredienteRoutes = require('./routes/ingrediente');
const llevaRoutes = require('./routes/lleva');
const pincheRoutes = require('./routes/pinche');
const platoRoutes = require('./routes/plato');
//


const app = express();

middlewares.setupMiddlewares(app);

app.get('/', (req,res)=>{
    res.send('hola desde restaurantes api');
});

app.use('/auth',authRoutes);
app.use('/wareHouse',almacenRoutes);
app.use('/cook',cocineroRoutes);
app.use('/employee',empleadoRoutes);
app.use('/shelf',estanteRoutes);
app.use('/ingredient2',ingredienteRoutes);
app.use('/carry',llevaRoutes);
app.use('/assistant',pincheRoutes);
app.use('/dish',platoRoutes);

// 
const port = 3000;
app.listen(port,()=>{
    console.log(`Server started on port ${port}`);
});
//

exports.app = app;