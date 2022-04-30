/**
 * controller for admin
 */
const bodyParser = require("body-parser");
const DB = require("../database");
const csv = require("csv-parser");
const fs = require("fs");

/**
 * @param  { url:"url" }  url data csv  student
*/
async function load_data_student(req = request, res = response) {
    try {
        const data = [];
        let url =
            "C:/Users/Pilo Tuy/Desktop/PRIMER SEMESTRE  2021/BASES DE DATOS/LABORATORIO/Proyecto Laboratorio/archivos de entrada/alumnos.csv";
        fs.createReadStream(url)
            .pipe(csv())
            .on("data", (row) => {
                const {
                    Carnet,
                    Nombre,
                    Apellido,
                    Telefono,
                    Direccion,
                    Correo,
                    Contrasena,
                } = row;
                data.push([
                    parseInt(Carnet),
                    Nombre,
                    Apellido,
                    Telefono,
                    Direccion,
                    Correo,
                    Contrasena,
                ]);
            })
            .on("end", async () => {
                let sql = "CALL load_data_studente (?,?,?,?,?,?,?)";
                for (const value of data) {
                    await DB.query(sql, value);
                }
                console.log("CSV file successfully processed", data.length);
                res.status(200).json({
                    state: true,
                    msg: "Cargado con exito",
                });
            });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            state: false,
            msg: "error en la carga del archivo de estudiantes",
        });
    }
}

/**
 * @param  { url:"url" }  url data csv teacher
*/
async function load_data_teacher(req = request, res = response) {
    try {
        const data = [];
        let url =
            "C:/Users/Pilo Tuy/Desktop/PRIMER SEMESTRE  2021/BASES DE DATOS/LABORATORIO/Proyecto Laboratorio/archivos de entrada/maestros.csv";
        fs.createReadStream(url)
            .pipe(csv())
            .on("data", (row) => {
                const {
                    Nombre,
                    Apellido,
                    Telefono,
                    Direccion,
                    Correo,
                    FechaNacimiento,
                    DPI,
                    Contrasena,
                } = row;
                data.push([
                    Nombre,
                    Apellido,
                    Telefono,
                    Direccion,
                    Correo,
                    FechaNacimiento,
                    parseInt(DPI),
                    Contrasena,
                ]);
            })
            .on("end", async () => {
                let sql = "CALL load_data_teacher (?,?,?,?,?,?,?,?)";
                for (const value of data) {
                    await DB.query(sql, value);
                }
                console.log("CSV file successfully processed", data.length);
                //console.log(data);
                res.status(200).json({
                    state: true,
                    msg: "Cargado con exito",
                });
            });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            state: false,
            msg: "error en la carga del archivo de maestro ",
        });
    }
}

/**
 * LOGIN
 * @param { "user":"user", "pass":"pass", "rol":1 (admin) , 2(teacher) , 3(student)}
*/
async function login(req = request, res = response) {
    try {
        const { user, pass, rol } = req.body;
        if (rol == 1) {
            let sql = " CALL login_admin (?,?)";
            const result = await DB.query(sql, [user, pass]);
            console.log(result[0]);
            if (result[0].length <= 0) {
                res.status(201).json({
                    state: false,
                    msg : "Usuario no encontrado"
                });
            } else {
                //console.log(result[0])
                req.session.loggedin = true;
                const aux = result[0];
                const { id_admin, username } = aux[0];
                res.status(201).json({
                    state: true,
                    DataUser: {
                        id: id_admin,
                        user: username,
                    },
                });
            }
        } else if (rol == 2) {
            let sql = " CALL login_teacher (?,?)";
            const result = await DB.query(sql, [user, pass]);
            console.log(result[0]);
            if (result[0].length <= 0) {
                res.status(201).json({
                    state: false,
                    msg : "Usuario no encontrado"
                });
            } else {
                //console.log(result[0])
                req.session.loggedin = true;
                const aux = result[0];
                const { id_maestro,nombre, apellido, foto } = aux[0];
                res.status(201).json({
                    state: true,
                    DataUser: {
                        id: id_maestro,
                        nombre: nombre, 
                        apellido: apellido, 
                        foto: foto
                    },
                });
            }
        } else {
            let sql = " CALL login_student (?,?)";
            const result = await DB.query(sql, [user, pass]);
            console.log(result[0]);
            if (result[0].length <= 0) {
                res.status(201).json({
                    state: false,
                    msg : "Usuario no encontrado"
                });
            } else {
                //console.log(result[0])
                req.session.loggedin = true;
                const aux = result[0];
                const { id_maestro,nombre, apellido, foto } = aux[0];
                res.status(201).json({
                    state: true,
                    DataUser: {
                        id: id_maestro,
                        nombre: nombre, 
                        apellido: apellido, 
                        foto: foto
                    },
                });
            }
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({
            state: false,
            msg: "error en autenticación ",
        });
    }
}

/*
 * LOGOUT
 * @param
*/
async function logout(req = request, res = response) {
    try {
        req.session.destroy();
        res.status(201).json({
            state: true,
            msg: "sesión cerrada",
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            state: false,
            msg: "error al cerrar sesion ",
        });
    }
}

/**
 * AGREGAR CARRERA
 * @param { "carrera":"nombre_carrera"}
*/
async function agregar_carrera(req = request, res = response) {
     try {
         const { carrera } = req.body;
         let sql = " CALL agregar_carrera (?)";
         await DB.query(sql, [carrera]);
         res.status(200).json({
             state: true,
             msg: "Carrera agregado correctamente"
         });
     } catch (error) {
         console.log(error);
         res.status(500).json({
             state: false,
             msg: "error al agregar carrera "
         });
     }
}

/**
 * OBTENER LISTADO DE CARRERAS
 * @param 
*/
async function obtener_carreras(req = request, res = response) {
    try {
        const { carrera } = req.body;
        let sql = " CALL agregar_carrera (?)";
        await DB.query(sql, [carrera]);
        res.status(200).json({
            state: true,
            msg: "Carrera agregado correctamente"
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            state: false,
            msg: "error al agregar carrera "
        });
    }
}


module.exports = {
    load_data_student,
    load_data_teacher,
    login,
    logout,
    agregar_carrera
};
