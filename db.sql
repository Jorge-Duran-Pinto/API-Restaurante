-- MySQL dump 10.17  Distrib 10.3.25-MariaDB, for debian-linux-gnu (x86_64)
--
-- Host: localhost    Database: restaurante
-- ------------------------------------------------------
-- Server version	10.3.25-MariaDB-0ubuntu0.20.04.1

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Current Database: `restaurante`
--

CREATE DATABASE /*!32312 IF NOT EXISTS*/ `restaurante` /*!40100 DEFAULT CHARACTER SET utf8mb4 */;

USE `restaurante`;

--
-- Table structure for table `almacen`
--

DROP TABLE IF EXISTS `almacen`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `almacen` (
  `numAlmacen` tinyint(3) unsigned NOT NULL,
  `nombre` varchar(20) NOT NULL,
  `descripcion` varchar(200) NOT NULL,
  PRIMARY KEY (`numAlmacen`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `almacen`
--

LOCK TABLES `almacen` WRITE;
/*!40000 ALTER TABLE `almacen` DISABLE KEYS */;
INSERT INTO `almacen` VALUES (1,'despensa','Almacen situado en la trastienda.'),(2,'camara frigorifica','Camara frigorifica situada en la trastienda.'),(3,'congelador central','Congelador situado en la trastienda.');
/*!40000 ALTER TABLE `almacen` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cocinero`
--

DROP TABLE IF EXISTS `cocinero`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `cocinero` (
  `DNICocinero` char(13) NOT NULL,
  `fechaAlta` date NOT NULL DEFAULT curdate(),
  PRIMARY KEY (`DNICocinero`),
  CONSTRAINT `cocinero_ibfk_1` FOREIGN KEY (`DNICocinero`) REFERENCES `empleado` (`DNI`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cocinero`
--

LOCK TABLES `cocinero` WRITE;
/*!40000 ALTER TABLE `cocinero` DISABLE KEYS */;
INSERT INTO `cocinero` VALUES ('12345678A','2020-11-05'),('23456789B','2020-12-20');
/*!40000 ALTER TABLE `cocinero` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `empleado`
--

DROP TABLE IF EXISTS `empleado`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `empleado` (
  `DNI` char(13) NOT NULL,
  `numSS` char(11) NOT NULL,
  `telFijo` varchar(15) NOT NULL,
  `telMovil` varchar(15) NOT NULL,
  `salario` decimal(10,2) NOT NULL,
  `nombreCompleto` varchar(50) NOT NULL,
  PRIMARY KEY (`DNI`),
  UNIQUE KEY `numSS` (`numSS`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `empleado`
--

LOCK TABLES `empleado` WRITE;
/*!40000 ALTER TABLE `empleado` DISABLE KEYS */;
INSERT INTO `empleado` VALUES ('12345678A','1234567890','952123123','611222333',4000.00,'Perez Sanchez, Antonio'),('23456789B','2345678901','952123123','623222333',4000.00,'Perez Sanchez, Manuel'),('34567890C','3456789012','952234567','634567890',2200.00,'Gomez Alvarez, Daniel'),('45678901D','4567890123','952111222','666111123',1800.00,'Sancho Carretero, Sara'),('56789012E','5678901234','952333444','600123345',1800.00,'Ruiz Menendez, Raquel');
/*!40000 ALTER TABLE `empleado` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `estante`
--

DROP TABLE IF EXISTS `estante`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `estante` (
  `letra` char(1) NOT NULL,
  `numAlmacen` tinyint(3) unsigned NOT NULL,
  `dimensiones` smallint(6) NOT NULL,
  `altura` tinyint(3) unsigned NOT NULL CHECK (`altura` between 0 and 5),
  PRIMARY KEY (`letra`,`numAlmacen`),
  KEY `numAlmacen` (`numAlmacen`),
  CONSTRAINT `estante_ibfk_1` FOREIGN KEY (`numAlmacen`) REFERENCES `almacen` (`numAlmacen`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `estante`
--

LOCK TABLES `estante` WRITE;
/*!40000 ALTER TABLE `estante` DISABLE KEYS */;
INSERT INTO `estante` VALUES ('a',1,160,1),('a',2,60,0),('a',3,80,3),('b',1,160,1),('b',2,60,2),('b',3,80,1),('c',1,160,2),('c',2,60,0),('c',3,80,3),('d',1,160,2),('d',2,60,2),('d',3,80,1);
/*!40000 ALTER TABLE `estante` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ingrediente`
--

DROP TABLE IF EXISTS `ingrediente`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `ingrediente` (
  `nombre` varchar(15) NOT NULL,
  `precioKg` decimal(20,2) unsigned NOT NULL,
  `cantIngAlmacen` decimal(20,2) unsigned NOT NULL,
  `letraEstante` char(5) NOT NULL,
  `numAlmacen` tinyint(3) unsigned NOT NULL,
  PRIMARY KEY (`nombre`),
  KEY `letraEstante` (`letraEstante`,`numAlmacen`),
  CONSTRAINT `ingrediente_ibfk_1` FOREIGN KEY (`letraEstante`, `numAlmacen`) REFERENCES `estante` (`letra`, `numAlmacen`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ingrediente`
--

LOCK TABLES `ingrediente` WRITE;
/*!40000 ALTER TABLE `ingrediente` DISABLE KEYS */;
INSERT INTO `ingrediente` VALUES ('aceituna',4.50,50.00,'c',1),('base de pizza',0.50,100.00,'a',3),('carne picada',4.50,100.00,'c',3),('champiñon',2.50,50.00,'c',2),('jamon',6.00,200.00,'b',3),('macarrones',2.50,200.00,'d',1),('mozzarela',1.50,100.00,'b',2),('oregano',12.00,200.00,'b',1),('pan',1.00,100.00,'a',1),('spaghetti',2.50,200.00,'d',1),('tiramisu',1.00,200.00,'d',2),('tomate',1.00,200.00,'a',2);
/*!40000 ALTER TABLE `ingrediente` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `lleva`
--

DROP TABLE IF EXISTS `lleva`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `lleva` (
  `nomPlato` varchar(30) NOT NULL,
  `nomIngred` varchar(15) NOT NULL,
  `cantIngPlato` decimal(20,2) unsigned NOT NULL,
  PRIMARY KEY (`nomPlato`,`nomIngred`),
  KEY `nomIngred` (`nomIngred`),
  CONSTRAINT `lleva_ibfk_1` FOREIGN KEY (`nomPlato`) REFERENCES `plato` (`nombre`) ON UPDATE CASCADE,
  CONSTRAINT `lleva_ibfk_2` FOREIGN KEY (`nomIngred`) REFERENCES `ingrediente` (`nombre`) ON UPDATE CASCADE,
  CONSTRAINT `CONSTRAINT_1` CHECK (`cantIngPlato` >= 0)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `lleva`
--

LOCK TABLES `lleva` WRITE;
/*!40000 ALTER TABLE `lleva` DISABLE KEYS */;
INSERT INTO `lleva` VALUES ('Macarrones Boloñesa','carne picada',0.20),('Macarrones Boloñesa','macarrones',0.20),('Macarrones Boloñesa','tomate',0.20),('Pan de ajo','mozzarela',0.20),('Pan de ajo','oregano',0.01),('Pan de ajo','pan',0.20),('Pizza 4 estaciones','aceituna',0.10),('Pizza 4 estaciones','base de pizza',1.00),('Pizza 4 estaciones','champiñon',0.10),('Pizza 4 estaciones','jamon',0.10),('Pizza 4 estaciones','mozzarela',0.50),('Pizza 4 estaciones','tomate',0.30),('Pizza prosciutto','base de pizza',1.00),('Pizza prosciutto','jamon',0.20),('Pizza prosciutto','mozzarela',0.50),('Pizza prosciutto','tomate',0.30),('Spaghetti Boloñesa','carne picada',0.20),('Spaghetti Boloñesa','macarrones',0.20),('Spaghetti Boloñesa','tomate',0.20),('Tiramisu','tiramisu',1.00);
/*!40000 ALTER TABLE `lleva` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `pinche`
--

DROP TABLE IF EXISTS `pinche`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `pinche` (
  `DNIPinche` char(13) NOT NULL,
  `fechaNac` date NOT NULL,
  `DNICocinero` char(13) NOT NULL,
  PRIMARY KEY (`DNIPinche`),
  KEY `DNICocinero` (`DNICocinero`),
  CONSTRAINT `pinche_ibfk_1` FOREIGN KEY (`DNIPinche`) REFERENCES `empleado` (`DNI`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `pinche_ibfk_2` FOREIGN KEY (`DNICocinero`) REFERENCES `cocinero` (`DNICocinero`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pinche`
--

LOCK TABLES `pinche` WRITE;
/*!40000 ALTER TABLE `pinche` DISABLE KEYS */;
INSERT INTO `pinche` VALUES ('34567890C','1992-02-11','12345678A'),('45678901D','1997-05-01','12345678A'),('56789012E','1989-09-16','23456789B');
/*!40000 ALTER TABLE `pinche` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `plato`
--

DROP TABLE IF EXISTS `plato`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `plato` (
  `nombre` varchar(30) NOT NULL,
  `precio` decimal(20,2) unsigned NOT NULL,
  `tipo` enum('T','1P','2P','P') NOT NULL,
  `DNICocinero` char(13) NOT NULL,
  PRIMARY KEY (`nombre`),
  KEY `DNICocinero` (`DNICocinero`),
  CONSTRAINT `plato_ibfk_1` FOREIGN KEY (`DNICocinero`) REFERENCES `cocinero` (`DNICocinero`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `plato`
--

LOCK TABLES `plato` WRITE;
/*!40000 ALTER TABLE `plato` DISABLE KEYS */;
INSERT INTO `plato` VALUES ('Macarrones Boloñesa',6.50,'1P','12345678A'),('Pan de ajo',4.50,'T','23456789B'),('Pizza 4 estaciones',7.70,'2P','12345678A'),('Pizza prosciutto',7.50,'2P','12345678A'),('Spaghetti Boloñesa',6.50,'1P','12345678A'),('Tiramisu',4.90,'P','23456789B');
/*!40000 ALTER TABLE `plato` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-03-08 21:11:15