-- STORE PROCEDURE 

-- source C:/Users/Pilo Tuy/Desktop/PRIMER SEMESTRE  2021/BASES DE DATOS/LABORATORIO/Proyecto Laboratorio/store procedure.sql

-- STORE PROCEDURE LOAD DATA to STUDENT TABLE

-- =============================================== MAESTRO ===========================================
-- ********* STORE PROCEDURE LOAD DATA to TEACHER TABLE
-- DROP PROCEDURE IF EXISTS load_data_teacher;
/*
DELIMITER $$
    CREATE PROCEDURE load_data_teacher(
        IN nombre_              VARCHAR(100),
        IN apellido_            VARCHAR(100),
        IN telefono_            VARCHAR(50),
        IN direccion_           VARCHAR(50),
        IN correo_              VARCHAR(100),
        IN fecha_nacimiento_    VARCHAR(50),
        IN dpi_                 BIGINT,
        IN contrasenia_         VARCHAR(20) 
    )
    BEGIN
    INSERT INTO maestro
    (nombre,apellido,telefono,direccion,correo,fecha_nacimiento,dpi,contrasenia)
    VALUES (nombre_,apellido_,telefono_,direccion_,correo_,STR_TO_DATE(fecha_nacimiento_, "%m/%d/%Y"),dpi_,contrasenia_);
    END $$
DELIMITER ;
*/
-- CALL load_data_teacher ('Cherri','Astall','745-771-1229','79 Continental Lane','castall0@guardian.co.uk','10/17/2021',5947415237186,'654321');

-- ********* STORE PROCEDURE Login maestro
-- DROP PROCEDURE IF EXISTS login_teacher;
/*
DELIMITER $$
    CREATE PROCEDURE login_teacher(
        IN registro_ VARCHAR(100),
        IN pass_ VARCHAR(100)
    )
    BEGIN
        SELECT id_maestro, nombre, apellido, foto FROM maestro WHERE dpi = registro_ AND contrasenia =pass_;
    END $$
DELIMITER ;
*/
-- CALL login_teacher (4602555449219,'basesgg');

-- ********* STORE PROCEDURE AGREGAR MAESTRO
-- DROP PROCEDURE IF EXISTS add_teacher; 
/*
DELIMITER $$
    CREATE PROCEDURE add_teacher(
        IN nombre_              VARCHAR(100),
        IN apellido_            VARCHAR(100),
        IN telefono_            VARCHAR(50),
        IN direccion_           VARCHAR(50),
        IN correo_              VARCHAR(100),
        IN fecha_nacimiento_    VARCHAR(50),
        IN dpi_                 BIGINT,
        IN contrasenia_         VARCHAR(20),
        IN registro_            BIGINT
    )
    BEGIN
    INSERT INTO maestro
    (nombre,apellido,telefono,direccion,correo,fecha_nacimiento,dpi,contrasenia,no_registro)
    VALUES (nombre_,apellido_,telefono_,direccion_,correo_,STR_TO_DATE(fecha_nacimiento_, "%Y-%m-%d"),dpi_,contrasenia_,registro_);
    END $$
DELIMITER ;
*/

-- ********* STORE PROCEDURE OBTENER LISTADO MAESTROS
-- DROP PROCEDURE IF EXISTS list_teacher; 
/*
DELIMITER $$
    CREATE PROCEDURE list_teacher()
    BEGIN
    select * from maestro;
    END $$
DELIMITER ;
*/
-- CALL list_teacher()

-- ********* STORE PROCEDURE ELIMINAR MAESTRO
-- DROP PROCEDURE IF EXISTS delete_teacher; 
/*
DELIMITER $$
    CREATE PROCEDURE delete_teacher(IN id_ BIGINT)
    BEGIN
        delete from maestro where id_maestro=id_;
    END $$
DELIMITER ;
*/
-- CALL delete_teacher()

-- *********   UPDATE MAESTRO
-- DROP PROCEDURE IF EXISTS update_teacher;
/*
DELIMITER $$
     CREATE PROCEDURE update_teacher(
        IN id_                  INT,
        IN nombre_              VARCHAR(100),
        IN apellido_            VARCHAR(100),
        IN telefono_            VARCHAR(50),
        IN direccion_           VARCHAR(50),
        IN correo_              VARCHAR(100),
        IN fecha_nacimiento_    VARCHAR(50),
        IN dpi_                 BIGINT,
        IN contrasenia_         VARCHAR(20),
        IN registro_            BIGINT
    )
    BEGIN
    UPDATE maestro
    SET nombre=nombre_ ,
    apellido =apellido_ ,
    telefono = telefono_ ,
    direccion = direccion_,
    correo = correo_ ,
    fecha_nacimiento = STR_TO_DATE(fecha_nacimiento_, "%Y-%m-%d"),
    dpi = dpi_ ,
    contrasenia = contrasenia_ ,
    no_registro = registro_
    WHERE id_maestro =  id_ ;
    END $$
DELIMITER ;
*/
-- CALL update_teacher ();

-- =============================================== ESTUDIANTE ===========================================
/*
DELIMITER $$
    CREATE PROCEDURE load_data_studente(
        IN carnet_ INT,
        IN nombre_ VARCHAR(100),
        IN apellido_ VARCHAR(100),
        IN telefono_  VARCHAR(50),
        IN direccion_ VARCHAR(50),
        IN correo_  VARCHAR(100),
        IN contrasenia_ varchar(20)
    )
    BEGIN
    INSERT INTO estudiante
    (carnet, nombre, apellido,telefono,direccion,correo,contrasenia)
    VALUES (carnet_, nombre_, apellido_,telefono_,direccion_,correo_,contrasenia_);
    END $$
DELIMITER ;
*/
-- CALL load_data_studente (170705218,'Jaquenette','Wilcot','939-652-8747','464 Steensland Pass','jwilcot0@bbc.co.uk','basesgg');


-- ********* STORE PROCEDURE OBTENER LISTADO ESTUDIANTES
-- DROP PROCEDURE IF EXISTS list_students; 
/*
DELIMITER $$
    CREATE PROCEDURE list_students()
    BEGIN
    select * from estudiante;
    END $$
DELIMITER ;
*/
-- CALL list_students()

-- ********* STORE PROCEDURE ELIMINAR ESTUDIANTE
-- DROP PROCEDURE IF EXISTS delete_student; 
/*
DELIMITER $$
    CREATE PROCEDURE delete_student(IN id_ BIGINT)
    BEGIN
        delete from estudiante where id_estudiante=id_;
    END $$
DELIMITER ;
*/
-- CALL delete_student(?)

-- ********* STORE PROCEDURE UPDATE ESTUDIANTE
-- DROP PROCEDURE IF EXISTS update_student; 
/*
DELIMITER $$
    CREATE PROCEDURE update_student(
        IN id_      INT,
        IN carnet_  BIGINT,
        IN nombre_ VARCHAR(100),
        IN apellido_ VARCHAR(100),
        IN telefono_  VARCHAR(50),
        IN direccion_ VARCHAR(50),
        IN correo_  VARCHAR(100),
        IN contrasenia_ varchar(20)
    )
    BEGIN
    UPDATE estudiante
    SET carnet = carnet_ , 
    nombre = nombre_ , 
    apellido = apellido_ ,
    telefono = telefono_ ,
    direccion = direccion_ ,
    correo = correo_ ,
    contrasenia = contrasenia_
    WHERE id_estudiante =  id_ ;
    END $$
DELIMITER ;
*/
-- CALL update_student(???????);

-- =============================================== CARRERAS ===========================================
-- ********* STORE PROCEDURE LISTA DE CARRERAS
-- DROP PROCEDURE IF EXISTS lista_carreras; 
/*
DELIMITER $$
    CREATE PROCEDURE lista_carreras()
    BEGIN
    select * from carrera;
    END $$
DELIMITER ;
*/
-- CALL lista_carreras();

-- ********* STORE PROCEDURE LISTA DE SECCIONES
-- DROP PROCEDURE IF EXISTS lista_secciones; 
/*
DELIMITER $$
    CREATE PROCEDURE lista_secciones( )
    BEGIN
    SELECT * FROM seccion;
    END $$
DELIMITER ;
*/
-- CALL lista_secciones();

-- STORE PROCEDURE agregar_carrera
-- DROP PROCEDURE IF EXISTS agregar_carrera;
/*
DELIMITER $$
    CREATE PROCEDURE agregar_carrera(
        IN nombre_ VARCHAR(100)
    )
    BEGIN
        INSERT INTO carrera
        (nombre)
        VALUES (nombre_);
END $$
DELIMITER;
*/
-- CALL agregar_carrera ("carrera1");

-- STORE PROCEDURE agregar_seccion
-- DROP PROCEDURE IF EXISTS agregar_seccion;
/*
DELIMITER $$
    CREATE PROCEDURE agregar_seccion(
        IN nombre_ VARCHAR(100)
    )
    BEGIN
        INSERT INTO seccion
        (seccion)
        VALUES (nombre_);
END $$
DELIMITER;
*/
-- CALL agregar_seccion ("carrera1");




-- STORE PROCEDURE Login admin
-- DROP PROCEDURE IF EXISTS login_admin;
/*
DELIMITER $$
    CREATE PROCEDURE login_admin(
        IN username_ VARCHAR(100),
        IN pass_ VARCHAR(100)
    )
    BEGIN
        SELECT * FROM admin WHERE username = username_ AND contrasenia =pass_;
    END $$
DELIMITER ;
*/
-- CALL login_admin ('admin','admin');

-- STORE PROCEDURE Login estudiante
-- DROP PROCEDURE IF EXISTS login_student;
/*
DELIMITER $$
    CREATE PROCEDURE login_student(
        IN registro_ VARCHAR(100),
        IN pass_ VARCHAR(100)
    )
    BEGIN
        SELECT id_estudiante, nombre, apellido, foto FROM estudiante WHERE carnet = registro_ AND contrasenia =pass_;
    END $$
DELIMITER ;
*/
-- CALL login_student (121667366,'bases1');



-- STORE PROCEDURE listar_carrera
-- DROP PROCEDURE IF EXISTS listar_carrera;
/*
DELIMITER $$
    CREATE PROCEDURE listar_carrera()
    BEGIN
        SELECT * from carrera;
END $$
DELIMITER;
*/
-- CALL agregar_carrera();

-- STORE PROCEDURE agregar_curso
-- DROP PROCEDURE IF EXISTS agregar_curso;
/*
DELIMITER //
    CREATE PROCEDURE agregar_curso( IN nombre_ VARCHAR(100) )
    BEGIN
        INSERT INTO curso
        (nombre)
        VALUES (nombre_);
    END //
DELIMITER;
*/
-- CALL agregar_curso ("curso1");

-- STORE PROCEDURE agregar_pensum
-- DROP PROCEDURE IF EXISTS agregar_pensum ;
/*
DELIMITER //
    CREATE PROCEDURE agregar_pensum( IN pensum_ INT,IN curso_ INT, IN carrera_ INT  )
    BEGIN
        INSERT INTO pensum
        ( id_pensum ,id_curso , id_carrera)
        VALUES (pensum_, curso_, carrera_);
    END //
DELIMITER ;
*/
-- CALL agregar_pensum (1,2,1);



