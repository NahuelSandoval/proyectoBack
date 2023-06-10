const express = require("express");
const nodemailer = require("nodemailer");

const router = express.Router();

router.get("/contacto", (req, res)=>{
    res.render("contacto")
})

router.post("/enviar", async(req, res)=>{
    const {nombre, email, mensaje} = req.body; //aca desestructuramos y viene del body

//Validar campos
            //si tenemos algo diferente a eso
if (!nombre || !email || !mensaje){
    return res.render("contacto", {error: "todos los campos son obligatorios"});
}


//Configurar transportador SMTP (ethereal.email)

const transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
        user: 'cordia.walker24@ethereal.email',
        pass: 'WYtBhyxmnE24twXZgS'
    }
});

//Configurar correo electronico

const mailOptions = {
    from: email,
    to: "nahuelfacundo24@gmail.com",
    subject:"Formulario de contacto",
    text:  `
    Nombre: ${nombre} /n 
    Email: ${email} /n 
    Mensaje: ${mensaje}
    `
};

//Try.catch estructura de control para manejar errores y excepciones

try{
    //Enviar correo electronico
    await transporter.sendMail(mailOptions);
    res.render("confirmacion", {
        nombre: req.body.nombre
    });
} catch (error){
    console.log(error);
    res.render("contacto", {error: "Error al enviar mensaje"});
}


})
module.exports = router;