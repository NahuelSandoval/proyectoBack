const { Router } = require("express");
const router = new Router();

const mysql = require("mysql");

//aca se crea la coneccion con la base de datos

const conn = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "proyecto_bochin"
})

conn.connect((err) => {
    if (err) throw err;
    console.log("CONEXION ESTABLECIDA");
})

//------Rutas

/* app.get("/", (req, res)=>{
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
}); */


//------Rutas

//SELECT

router.get("/productos", (req, res) => {
    let sql = "SELECT * FROM productos";
    let query = conn.query(sql, (err, results) => {
        if (err) throw err;
        res.render("../views/productos.hbs", {
            results: results
        })
    })
})

//INSERT (maneja solicitud post para guardar un nuevo producto en la base de datos utilizando los datos enviados en el cuerpo de la solicitud(body))
//y luego redirige al usuario a la pagina principal
router.post("/save", (req, res) => {
    let data = { producto_nombre: req.body.producto_nombre, producto_precio: req.body.producto_precio, producto_stock: req.body.producto_stock, producto_imagen: req.body.producto_imagen }
    let sql = "INSERT INTO productos SET ?";
    let query = conn.query(sql, data, (err, results) => {
        if (err) throw err;
        res.redirect("/productos");
    });
});

//EDITAR // UPDATE

router.post("/update", (req, res) => {
    let sql = "UPDATE productos SET producto_nombre='" + req.body.producto_nombre + "', producto_precio='" + req.body.producto_precio + "', producto_stock='" + req.body.producto_stock+ "', producto_imagen='" + req.body.producto_imagen + "' WHERE producto_id =" + req.body.id;
    let query = conn.query(sql, (err, results) => {
        if (err) throw err;
        res.redirect("/productos");
    });
});


//DELETE // BORRAR

router.post("/delete", (req, res) => {
    let sql = "DELETE FROM productos WHERE producto_id = "+req.body.producto_id +"";
    let query = conn.query(sql, (err, results) => {
        if (err) throw err;
        res.redirect("/productos");
    });
});

module.exports = router;