const express = require("express");
const pool = require("../database");
const admin = require("../controllers/admin");
const session = require("express-session");

const router = express.Router();
const bodyParser = require("body-parser");
router.use(
    session({
        secret: "secret",
        resave: true,
        saveUninitialized: true,
    })
);
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());
var cors = require("cors");
router.use(cors());
router.use(express.json());

// HOME
router.get("/", async (req, res) => {
    if (req.session.loggedin) {
        res.status(200).json({
            msg: "funcionando, usuario logueado",
        });
    } else {
        res.status(200).json({
            msg: "funcionando, usuario no logueado",
        });
    }
});

// ENDPOINT CONTROLLER ADMIN
router.post("/admin/loadstudent", admin.load_data_student);
router.post("/admin/loadsteacher", admin.load_data_teacher);
router.post("/admin/login", admin.login);
router.get("/admin/logout", admin.logout);
router.post("/admin/agregarCarrera", admin.agregar_carrera);
router.post("/admin/agregarUsuario", admin.agregar_usuario);
router.post("/admin/listarUsuarios", admin.listar_usuario);
router.post("/admin/elimiarUsuarios", admin.delete_User);
router.post("/admin/updateUsuario", admin.update_usuario);
router.post("/admin/listarCarreras", admin.obtener_carreras);
router.post("/admin/eliminarCarreras", admin.eliminar_carrera);

module.exports = router;
