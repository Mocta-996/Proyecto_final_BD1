const express =  require('express');
const morgan =require('morgan');
const cors = require ('cors');
//intancia del modulo express
 const app = express();

//import
 const routes = require('./routes/index');


//setting 
 app.set('port', 3001);
 app.use(express.json());
 
//Middlevare
app.use(morgan('dev'));

app.use(express.urlencoded({extended: false}));
//esto para que no de error de cors
app.use(cors());


//routes
 app.use(routes);

 //run
 app.listen(app.get('port'), () => {
     console.log('Server on port 3001');
     
 })
