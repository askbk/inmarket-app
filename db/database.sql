-- MySQL Script generated by MySQL Workbench
-- Wed 04 Jul 2018 10:10:04 AM CEST
-- Model: New Model    Version: 1.0
-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='TRADITIONAL,ALLOW_INVALID_DATES';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `mydb` DEFAULT CHARACTER SET utf8 ;
USE `mydb` ;

-- -----------------------------------------------------
-- Table `mydb`.`kommuner`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `mydb`.`kommuner` ;

CREATE TABLE IF NOT EXISTS `mydb`.`kommuner` (
  `kommuneNr` INT NOT NULL,
  `kommuneName` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`kommuneNr`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`user`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `mydb`.`user` ;

CREATE TABLE IF NOT EXISTS `mydb`.`user` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL,
  `email` VARCHAR(45) NOT NULL,
  `phone` VARCHAR(45) NOT NULL,
  `kommuner_kommuneNr` INT NOT NULL,
  `isAdmin` TINYINT NOT NULL,
  `password` VARCHAR(45) NOT NULL,
  `profilePicture` VARCHAR(45) NULL,
  `createTime` DATETIME NOT NULL,
  `isStudent` TINYINT(1) NOT NULL,
  `isEmployee` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_user_kommuner_idx` (`kommuner_kommuneNr` ASC),
  CONSTRAINT `fk_user_kommuner`
    FOREIGN KEY (`kommuner_kommuneNr`)
    REFERENCES `mydb`.`kommuner` (`kommuneNr`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`student`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `mydb`.`student` ;

CREATE TABLE IF NOT EXISTS `mydb`.`student` (
  `user_id` INT NOT NULL,
  `school` VARCHAR(45) NOT NULL,
  `schoolYear` VARCHAR(45) NOT NULL,
  `studyProgram` VARCHAR(45) NOT NULL,
  `cvPath` VARCHAR(45) NULL,
  PRIMARY KEY (`user_id`),
  INDEX `fk_student_user1_idx` (`user_id` ASC),
  CONSTRAINT `fk_student_user1`
    FOREIGN KEY (`user_id`)
    REFERENCES `mydb`.`user` (`id`)
    ON DELETE CASCADE
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `mydb`.`company`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `mydb`.`company` ;

CREATE TABLE IF NOT EXISTS `mydb`.`company` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL,
  `description` VARCHAR(500) NULL,
  `logo` VARCHAR(45) NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`companyEmployee`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `mydb`.`companyEmployee` ;

CREATE TABLE IF NOT EXISTS `mydb`.`companyEmployee` (
  `user_id` INT NOT NULL,
  `position` VARCHAR(45) NOT NULL,
  `education` VARCHAR(45) NOT NULL,
  `company_id` INT NOT NULL,
  PRIMARY KEY (`user_id`),
  INDEX `fk_companyEmployee_company1_idx` (`company_id` ASC),
  INDEX `fk_companyEmployee_user1_idx` (`user_id` ASC),
  CONSTRAINT `fk_companyEmployee_company1`
    FOREIGN KEY (`company_id`)
    REFERENCES `mydb`.`company` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_companyEmployee_user1`
    FOREIGN KEY (`user_id`)
    REFERENCES `mydb`.`user` (`id`)
    ON DELETE CASCADE
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`message`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `mydb`.`message` ;

CREATE TABLE IF NOT EXISTS `mydb`.`message` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `sender` INT NOT NULL,
  `message` VARCHAR(500) NOT NULL,
  `receiver` INT NOT NULL,
  PRIMARY KEY (`id`, `receiver`, `sender`),
  INDEX `fk_message_user1_idx` (`sender` ASC),
  INDEX `fk_message_user2_idx` (`receiver` ASC),
  CONSTRAINT `fk_message_user1`
    FOREIGN KEY (`sender`)
    REFERENCES `mydb`.`user` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_message_user2`
    FOREIGN KEY (`receiver`)
    REFERENCES `mydb`.`user` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`companyPictures`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `mydb`.`companyPictures` ;

CREATE TABLE IF NOT EXISTS `mydb`.`companyPictures` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `path` VARCHAR(45) NOT NULL,
  `description` VARCHAR(45) NULL,
  `createTime` DATETIME NOT NULL,
  `company_id` INT NOT NULL,
  PRIMARY KEY (`id`, `company_id`),
  INDEX `fk_companyPictures_company1_idx` (`company_id` ASC),
  CONSTRAINT `fk_companyPictures_company1`
    FOREIGN KEY (`company_id`)
    REFERENCES `mydb`.`company` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`event`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `mydb`.`event` ;

CREATE TABLE IF NOT EXISTS `mydb`.`event` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `location` VARCHAR(45) NOT NULL,
  `date` DATE NOT NULL,
  `time` VARCHAR(45) NOT NULL,
  `description` VARCHAR(500) NOT NULL,
  `company_id` INT NOT NULL,
  `duration` VARCHAR(45) NOT NULL,
  `companyPictures_id` INT NULL,
  `price` VARCHAR(45) NOT NULL,
  `type` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id`, `company_id`),
  INDEX `fk_event_company1_idx` (`company_id` ASC),
  INDEX `fk_event_companyPictures1_idx` (`companyPictures_id` ASC),
  CONSTRAINT `fk_event_company1`
    FOREIGN KEY (`company_id`)
    REFERENCES `mydb`.`company` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_event_companyPictures1`
    FOREIGN KEY (`companyPictures_id`)
    REFERENCES `mydb`.`companyPictures` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`companyVideos`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `mydb`.`companyVideos` ;

CREATE TABLE IF NOT EXISTS `mydb`.`companyVideos` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `videoPath` VARCHAR(45) NOT NULL,
  `title` VARCHAR(45) NOT NULL,
  `description` VARCHAR(45) NOT NULL,
  `company_id` INT NOT NULL,
  `createTime` DATETIME NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_videos_company1_idx` (`company_id` ASC),
  CONSTRAINT `fk_videos_company1`
    FOREIGN KEY (`company_id`)
    REFERENCES `mydb`.`company` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
