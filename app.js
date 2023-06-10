const express = require("express");
const app = express();
const hbs = require("hbs");
const router = require("./router/contacto")


const port = 3010;

//HANDLEBARS

app.set("view engine", "hbs");
hbs.registerPartials(__dirname + "/views/partials")

//MIDDLEWARE
//para ver por que el assets, mirar la clase 15, hora 1
app.use("/assets", express.static(__dirname + "/public"));
app.use(express.urlencoded({extended: false}));

//Ruta para ir a buscar las imagenes
app.use('/fotos', express.static(__dirname + '/public/fotos'));

/* app.set("views", __dirname + "/views") */
app.use(require("./router/router"));




app.get("/", (req, res)=>{
    res.render("index",{
        titulo: "Inicio",
        tituloPrincipal: "Nuestro Club",
        navbarr: "Fraternidad Bochin Club"
    })
});

app.get("/novedades", (req, res)=>{
res.render("novedades",{
    tituloPrincipal: "Nuestro Club",
    navbarr:"Fraternidad Bochin Club"
})
});






app.use("/", router);
//Configurar directorio de archivos estaticos

/* app.use(express.static(__dirname + "/public"));
 */
//Configurar middleware y procesar el cuerpo de las solicitudes

//aca leemos las rutas
/* app.use("/", router) */

//Clase 16
/* app.use("./router/db"); */

//-------------

app.listen(port, ()=>{
    console.log(`Servidor corriendo en el puerto http://localhost:${port}`)
})