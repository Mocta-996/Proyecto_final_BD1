-- STORE PROCEDURE 

-- source C:/Users/Pilo Tuy/Desktop/PRIMER SEMESTRE  2021/BASES DE DATOS/LABORATORIO/Proyecto Laboratorio/store procedure.sql
/*
    STORE PROCEDURE LOAD DATA to STUDENT TABLE
*/
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
CALL load_data_studente (170705218,'Jaquenette','Wilcot','939-652-8747','464 Steensland Pass','jwilcot0@bbc.co.uk','basesgg');
*/
/*
    STORE PROCEDURE LOAD DATA to STUDENT TABLE
*/
/*
DROP PROCEDURE IF EXISTS load_data_teacher;
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
/*INSERT INTO maestro
(nombre,apellido,telefono,direccion,correo,fecha_nacimiento,dpi,contrasenia)
VALUES ('Cherri','Astall','745-771-1229','79 Continental Lane','castall0@guardian.co.uk',STR_TO_DATE('10/17/2021', "%m/%d/%Y"),5947415237186,'654321');
*/


/*
    STORE PROCEDURE Login admin
*/
/*
DROP PROCEDURE IF EXISTS login_admin;
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
/*INSERT INTO admin 
(username,contrasenia)
VALUES ('admin','admin');*/

/*
    STORE PROCEDURE Login maestro
*/
/*
DROP PROCEDURE IF EXISTS login_teacher;
DELIMITER $$
CREATE PROCEDURE login_teacher(
    IN registro_ VARCHAR(100),
    IN pass_ VARCHAR(100)
)
BEGIN
    SELECT id_maestro, nombre, apellido, foto FROM maestro WHERE dpi = registro_ AND contrasenia =pass_;
END $$
DELIMITER ;
-- CALL login_teacher (4602555449219,'basesgg');
*/

/*
    STORE PROCEDURE Login estudiante
*/
/*
DROP PROCEDURE IF EXISTS login_student;
DELIMITER $$
CREATE PROCEDURE login_student(
    IN registro_ VARCHAR(100),
    IN pass_ VARCHAR(100)
)
BEGIN
    SELECT id_estudiante, nombre, apellido, foto FROM estudiante WHERE carnet = registro_ AND contrasenia =pass_;
END $$
DELIMITER ;
-- CALL login_student (121667366,'bases1');
*/
/*
    STORE PROCEDURE agregar_carrera
*/
/*
DROP PROCEDURE IF EXISTS agregar_carrera;
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

/*
    STORE PROCEDURE agregar_curso
*/
/*
DROP PROCEDURE IF EXISTS agregar_curso;
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

/*
    STORE PROCEDURE agregar_pensum
*/
/*
DROP PROCEDURE IF EXISTS agregar_curso;
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