/*
CREACION DE TABLAS
*/

SET FOREIGN_KEY_CHECKS=0; 
DROP TABLE IF EXISTS estudiante CASCADE;
DROP TABLE IF EXISTS carrera   CASCADE;
DROP TABLE IF EXISTS maestro    CASCADE ;
DROP TABLE IF EXISTS curso  CASCADE; 
DROP TABLE IF EXISTS administrador  CASCADE;
DROP TABLE IF EXISTS pensum      CASCADE;
DROP TABLE IF EXISTS seccion CASCADE;
DROP TABLE IF EXISTS asignacion CASCADE;
DROP TABLE IF EXISTS publicacion CASCADE;
DROP TABLE IF EXISTS actividad CASCADE;
DROP TABLE IF EXISTS examen CASCADE;
DROP TABLE IF EXISTS pregunta CASCADE;
DROP TABLE IF EXISTS pregunta_examen CASCADE;
DROP TABLE IF EXISTS respuesta CASCADE;
DROP TABLE IF EXISTS respuesta_examen CASCADE;
DROP TABLE IF EXISTS admin CASCADE;
SET FOREIGN_KEY_CHECKS=1;

-- source C:/Users/Pilo Tuy/Desktop/PRIMER SEMESTRE  2021/BASES DE DATOS/LABORATORIO/Proyecto Laboratorio/tablas.sql

-- CREACION DE TABLA ADMINISTRADOR

CREATE TABLE admin (
    id_admin        INT AUTO_INCREMENT PRIMARY KEY,
    username              VARCHAR(100),
    contrasenia         VARCHAR(20) 
);
-- CREACION DE TABLA MAESTRO
CREATE TABLE maestro (
    id_maestro          INT AUTO_INCREMENT PRIMARY KEY,
    nombre              VARCHAR(100),
    apellido            VARCHAR(100),
    telefono            VARCHAR(50),
    direccion           VARCHAR(50),
    correo              VARCHAR(100),
    fecha_nacimiento    DATETIME,
    dpi                 BIGINT,
    contrasenia         VARCHAR(20),
    no_registro         INT,
    foto                MEDIUMBLOB NULL  
);
-- id,Nombre,Apellido,Telefono,Direccion,Correo,FechaNacimiento,DPI,Contrasena
-- alter table maestro modify  dpi bigint;
-- CREACION DE TABLA ESTUDIANTE
CREATE TABLE estudiante (
    id_estudiante INT AUTO_INCREMENT PRIMARY KEY,
    carnet BIGINT,
    nombre VARCHAR(100),
    apellido VARCHAR(100),
    telefono  VARCHAR(50),
    direccion VARCHAR(50),
    correo  VARCHAR(100),
    contrasenia varchar(20)
);
--id,Carnet,Nombre,Apellido,Telefono,Direccion,Correo,Contrasena

-- CREACION DE TABLA CARRERA
CREATE TABLE carrera (
    id_carrera INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100)
);

-- CREACION DE CURSO
CREATE TABLE curso (
    id_curso INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100)
);

-- CREACION DE ADMIN
CREATE TABLE administrador (
    id_admin INT AUTO_INCREMENT PRIMARY KEY,
    user VARCHAR(50),
    contrasenia VARCHAR(50)
);

-- CREACION DE PENSUM
CREATE TABLE pensum (
    id_pensum  INT AUTO_INCREMENT PRIMARY KEY,
    id_curso INT NOT NULL,
    id_carrera INT NOT NULL,
    FOREIGN KEY (id_curso) REFERENCES curso(id_curso),
    FOREIGN KEY (id_carrera) REFERENCES carrera(id_carrera), 
    UNIQUE i_pensum (id_curso,id_carrera)
);

-- CREACION DE SECCION
CREATE TABLE seccion (
    id_seccion INT AUTO_INCREMENT PRIMARY KEY,
    seccion VARCHAR(2),
    id_maestro INT,
    id_curso    INT,
    FOREIGN KEY (id_curso) REFERENCES curso(id_curso),
    FOREIGN KEY (id_maestro) REFERENCES maestro(id_maestro),
    UNIQUE i_seccion (id_maestro,id_seccion,id_curso)
);

-- CREACION DE ASIGNACION
CREATE TABLE asignacion (
    id_asignacion INT AUTO_INCREMENT PRIMARY KEY,
    anio DATETIME,
    zona int,
    nota int,
    id_estudiante INT,
    id_seccion    INT,
    FOREIGN KEY (id_estudiante) REFERENCES estudiante(id_estudiante),
    FOREIGN KEY (id_seccion) REFERENCES seccion(id_seccion),
    UNIQUE i_asignacion (id_estudiante,id_seccion)
);

-- CREACION DE PUBLICACION 
CREATE TABLE publicacion (
    id_publicacion INT AUTO_INCREMENT PRIMARY KEY,
    descripcion VARCHAR(200),
    fecha_publicacion DATETIME,
    id_maestro INT,
    id_seccion    INT,
    FOREIGN KEY (id_maestro) REFERENCES maestro(id_maestro),
    FOREIGN KEY (id_seccion) REFERENCES seccion(id_seccion)
);

-- CREACION DE ACTIVIDAD
CREATE TABLE actividad (
    id_actividad INT AUTO_INCREMENT PRIMARY KEY,
    titulo VARCHAR(50),
    descripcion VARCHAR(200),
    fecha_publicacion DATETIME,
    valor FLOAT,
    fecha_entrega DATETIME,
    id_maestro INT,
    id_seccion    INT,
    FOREIGN KEY (id_maestro) REFERENCES maestro(id_maestro),
    FOREIGN KEY (id_seccion) REFERENCES seccion(id_seccion)
);

-- CREACION DE EXAMEN
CREATE TABLE examen (
    id_examen VARCHAR(5) PRIMARY KEY NOT NULL,
    titulo VARCHAR(50),
    fecha_publicacion DATETIME,
    hora_inicio DATETIME,
    hora_fin DATETIME,
    valor FLOAT,
    id_maestro INT,
    id_seccion    INT,
    FOREIGN KEY (id_maestro) REFERENCES maestro(id_maestro),
    FOREIGN KEY (id_seccion) REFERENCES seccion(id_seccion)
);

-- CREACION DE PREGUNTAS DE EXAMEN 
CREATE TABLE pregunta (
    id_pregunta INT AUTO_INCREMENT PRIMARY KEY,
    pregunta VARCHAR(50)
);

-- CREACION DE PREGUNTAS_EXAMEN 
CREATE TABLE pregunta_examen (
    id_pregunta_examen INT AUTO_INCREMENT PRIMARY KEY,
    id_examen VARCHAR(5),
    id_pregunta INT,
    FOREIGN KEY (id_examen) REFERENCES examen(id_examen),
    FOREIGN KEY (id_pregunta) REFERENCES pregunta(id_pregunta),
    UNIQUE i_pregunta_examen (id_examen,id_pregunta)
);

-- CREACION DE RESPUESTAS EXAMEN
CREATE TABLE respuesta (
    id_respuesta INT AUTO_INCREMENT PRIMARY KEY,
    respuesta VARCHAR(50)
);

-- CREACION DE PREGUNTAS_EXAMEN 
CREATE TABLE respuesta_examen (
    id_respuesta_examen INT AUTO_INCREMENT PRIMARY KEY,
    correcta VARCHAR(1),
    id_examen VARCHAR(5),
    id_respuesta INT,
    FOREIGN KEY (id_examen) REFERENCES examen(id_examen),
    FOREIGN KEY (id_respuesta) REFERENCES respuesta(id_respuesta),
    UNIQUE i_respuesta_examen (id_examen,id_respuesta)
);

