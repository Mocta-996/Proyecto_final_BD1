/**
 * controller for admin
 */
const bodyParser = require("body-parser");
const DB = require("../database");
const csv = require("csv-parser");
const fs = require("fs");

/**
 * @param 
*/
async function agregar_usuario(req = request, res = response) {
    try {
        const {rol} = req.body;
        if(rol == 1){
            const {nombres, apellidos, registro,telefono, direccion, correo, fecha, dpi, contrasenia} = req.body;
            let sql ="CALL add_teacher (?,?,?,?,?,?,?,?,?)";
            //nombre,apellido,telefono,direccion,correo,fecha_nacimiento,dpi,contrasenia,registro
            await DB.query(sql, [nombres, apellidos,telefono,direccion, correo, fecha, dpi,contrasenia,registro]);
            console.log(req.body)
            res.status(200).json({
                state: true,
                msg: "usuario agregado correctamente"
            });
        }else {
            const {nombres, apellidos, carnet,telefono, direccion, correo,contrasenia} = req.body;
            let sql = "CALL load_data_studente (?,?,?,?,?,?,?)";
            console.log(req.body)
            //carnet, nombre, apellido,telefono,direccion,correo,contrasenia
            await DB.query(sql, [carnet,nombres, apellidos,telefono, direccion, correo,contrasenia]);
            res.status(201).json({
                state: true,
                msg: "usuario agregado correctamente"
            });

        }

    } catch (error) {
        console.log(error);
        res.status(500).json({
            state: false,
            msg: "error al agregar usuario"
        });
    }
}

/**
 *   ACTUALIZAR INFORMACION ESTUDIANTE/MAESTRO
 * @param 
*/
async function update_usuario(req = request, res = response) {
    try {
        const {rol} = req.body;
        if(rol == 1){
            const {id,nombres, apellidos, registro,telefono, direccion, correo, fecha, dpi, contrasenia} = req.body;
            let sql ="CALL update_teacher (?,?,?,?,?,?,?,?,?,?)";
            //nombre,apellido,telefono,direccion,correo,fecha_nacimiento,dpi,contrasenia,registro
            await DB.query(sql, [id,nombres, apellidos,telefono,direccion, correo, fecha, dpi,contrasenia,registro]);
            console.log(req.body)
            res.status(200).json({
                state: true,
                msg: "datos actualizados correctamente"
            });
        }else {
            const {id,nombres, apellidos, carnet,telefono, direccion, correo,contrasenia} = req.body;
            let sql = " CALL update_student(?,?,?,?,?,?,?,?)";
            console.log(req.body)
            //carnet, nombre, apellido,telefono,direccion,correo,contrasenia
            await DB.query(sql, [id, carnet,nombres, apellidos,telefono, direccion, correo,contrasenia]);
            res.status(201).json({
                state: true,
                msg: "usuario agregado correctamente"
            });

        }

    } catch (error) {
        console.log(error);
        res.status(500).json({
            state: false,
            msg: "error al agregar usuario"
        });
    }
}

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
        const {file} = req.body;
        /*
        let url =
            "C:/Users/Pilo Tuy/Desktop/PRIMER SEMESTRE  2021/BASES DE DATOS/LABORATORIO/Proyecto Laboratorio/archivos de entrada/maestros.csv";
        */
           
        fs.createReadStream(file)
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
        const { tipo, name } = req.body;
        if (tipo == 1) {
            let sql = " CALL agregar_carrera (?)";
            await DB.query(sql, [name]);
            res.status(200).json({
                state: true,
                msg: "Carrera agregado correctamente",
            });
        } else if (tipo == 2) {
            let sql = " CALL agregar_seccion (?)";
            await DB.query(sql, [name]);
            res.status(200).json({
                state: true,
                msg: "Seccion agregado correctamente",
            });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({
            state: false,
            msg: "error al agregar carrera ",
        });
    }
}

/**
 * AGREGAR CARRERA
 * @param { "carrera":"nombre_carrera"}
*/
async function eliminar_carrera(req = request, res = response) {
    try {
        const { tipo, id } = req.body;
        if (tipo == 1) {
            let sql = " delete from carrera where id_carrera=?";
            await DB.query(sql, [id]);
            res.status(200).json({
                state: true,
                msg: "Carrera agregado correctamente",
            });
        } else if (tipo == 2) {
            let sql = " delete from seccion where id_seccion=?";
            await DB.query(sql, [id]);
            res.status(200).json({
                state: true,
                msg: "Seccion agregado correctamente",
            });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({
            state: false,
            msg: "error al agregar carrera ",
        });
    }
}


/**
 * OBTENER LISTADO DE CARRERAS
 * @param 
*/
async function obtener_carreras(req = request, res = response) {
    try {
        const{tipo} = req.body;
        if(tipo==1){
            let sql = " CALL lista_carreras()";
            const result = await DB.query(sql);
            //console.log(result[0]);
            if (result[0].length <= 0) {
                res.status(200).json({
                    state: false,
                    msg: "datos no encontrados",
                });
            } else {
                const aux = result[0];
                //console.log(aux);
                res.status(200).json({
                    state: true,
                    data:aux
                });
            }

        }else{
            let sql = " CALL lista_secciones()";
            const result = await DB.query(sql);
            if (result[0].length <= 0) {
                res.status(200).json({
                    state: false,
                    msg: "datos no encontrados",
                });
            } else {
                const aux = result[0];
                res.status(200).json({
                    state: true,
                    data:aux
                });
            }
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({
            state: false,
            msg: "error al agregar carrera "
        });
    }
}


/**
 * OBTENER LISTADO DE ESTUDIANTES/MAESTROS
 * @param 
*/
async function listar_usuario(req = request, res = response) {
    try {
        const {rol} = req.body;
        //console.log(rol);
        if(rol ==1){
            let sql = " CALL list_teacher()";
            const result = await DB.query(sql);
            //console.log(result[0]);
            if (result[0].length <= 0) {
                res.status(200).json({
                    state: false,
                    msg: "datos no encontrados",
                });
            } else {
                const aux = result[0];
                //console.log(aux);
                res.status(200).json({
                    state: true,
                    data:aux
                });
            }
        }else if(rol ==2){
            let sql = " CALL list_students()";
            const result = await DB.query(sql);
            //console.log(result[0]);
            if (result[0].length <= 0) {
                res.status(200).json({
                    state: false,
                    msg: "datos no encontrados",
                });
            } else {
                const aux = result[0];
                //console.log(aux);
                res.status(200).json({
                    state: true,
                    data:aux
                });
            }
        }else {
            res.status(200).json({
                state: true,
                data:[]
            });
        }
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            state: false,
            msg: "error al agregar usuario",
        });
    }
}

/**
 * ELIMINAR ESTUDIANTES/MAESTROS
 * @param { rol:"rol", "id":"id"}
*/
async function delete_User(req = request, res = response) {
    try {
        const {rol,id} = req.body;
        if (rol == 1) {
            let sql = "CALL delete_teacher(?)";
            const result = await DB.query(sql, [id]);
            //console.log(result);
            res.status(200).json({
                state: true,
                msg : "Usuario eliminado"
            });
        } else {
            let sql = "CALL delete_student(?)";
            const result = await DB.query(sql, [id]);
            //console.log(result);
            res.status(200).json({
                state: true,
                msg : "Usuario eliminado"
            });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({
            state: false,
            msg: "error al eliminar ",
        });
    }
}


module.exports = {
    load_data_student,
    load_data_teacher,
    login,
    logout,
    agregar_carrera,
    agregar_usuario,
    listar_usuario,
    delete_User,
    update_usuario,
    obtener_carreras,
    eliminar_carrera
};
