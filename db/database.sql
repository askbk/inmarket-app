-- MySQL Script generated by MySQL Workbench
-- Fri 16 Nov 2018 01:01:52 AM CET
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
-- Table `mydb`.`user`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `mydb`.`user` ;

CREATE TABLE IF NOT EXISTS `mydb`.`user` (
  `user_id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL,
  `email` VARCHAR(45) NOT NULL,
  `phone` VARCHAR(45) NOT NULL,
  `kommuneNr` INT NOT NULL,
  `adminLevel` INT NOT NULL,
  `password` VARCHAR(255) NOT NULL,
  `profilePicture` VARCHAR(100) NULL,
  `createTime` DATETIME NOT NULL,
  `emailVerified` TINYINT(1) NOT NULL,
  `biography` TEXT(500) NULL,
  `profilePictureThumb` VARCHAR(100) NULL,
  `userType` INT(1) NOT NULL,
  PRIMARY KEY (`user_id`),
  UNIQUE INDEX `email_UNIQUE` (`email` ASC))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`student`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `mydb`.`student` ;

CREATE TABLE IF NOT EXISTS `mydb`.`student` (
  `user_id` INT NOT NULL,
  `school` VARCHAR(45) NOT NULL,
  `schoolYear` VARCHAR(45) NOT NULL,
  `program` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`user_id`),
  INDEX `fk_student_user1_idx` (`user_id` ASC),
  CONSTRAINT `fk_student_user1`
    FOREIGN KEY (`user_id`)
    REFERENCES `mydb`.`user` (`user_id`)
    ON DELETE CASCADE
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `mydb`.`NEET`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `mydb`.`NEET` ;

CREATE TABLE IF NOT EXISTS `mydb`.`NEET` (
  `user_id` INT NOT NULL,
  PRIMARY KEY (`user_id`),
  INDEX `fk_companyEmployee_user1_idx` (`user_id` ASC),
  CONSTRAINT `fk_companyEmployee_user1`
    FOREIGN KEY (`user_id`)
    REFERENCES `mydb`.`user` (`user_id`)
    ON DELETE CASCADE
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`company`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `mydb`.`company` ;

CREATE TABLE IF NOT EXISTS `mydb`.`company` (
  `company_id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL,
  `description` VARCHAR(500) NULL,
  `logo` VARCHAR(45) NULL,
  `tags` VARCHAR(100) NULL,
  PRIMARY KEY (`company_id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`companyPicture`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `mydb`.`companyPicture` ;

CREATE TABLE IF NOT EXISTS `mydb`.`companyPicture` (
  `companyPicture_id` INT NOT NULL AUTO_INCREMENT,
  `path` VARCHAR(45) NOT NULL,
  `description` VARCHAR(45) NULL,
  `createTime` DATETIME NOT NULL,
  `company_id` INT NOT NULL,
  PRIMARY KEY (`companyPicture_id`, `company_id`),
  INDEX `fk_companyPictures_company1_idx` (`company_id` ASC),
  CONSTRAINT `fk_companyPictures_company1`
    FOREIGN KEY (`company_id`)
    REFERENCES `mydb`.`company` (`company_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`event`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `mydb`.`event` ;

CREATE TABLE IF NOT EXISTS `mydb`.`event` (
  `event_id` INT NOT NULL AUTO_INCREMENT,
  `location` VARCHAR(45) NOT NULL,
  `dateTime` DATETIME NOT NULL,
  `description` VARCHAR(500) NOT NULL,
  `company_id` INT NOT NULL,
  `duration` VARCHAR(45) NOT NULL,
  `companyPicture_id` INT NULL,
  `price` VARCHAR(45) NOT NULL,
  `type` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`event_id`, `company_id`),
  INDEX `fk_event_company1_idx` (`company_id` ASC),
  INDEX `fk_event_companyPictures1_idx` (`companyPicture_id` ASC),
  CONSTRAINT `fk_event_company1`
    FOREIGN KEY (`company_id`)
    REFERENCES `mydb`.`company` (`company_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_event_companyPictures1`
    FOREIGN KEY (`companyPicture_id`)
    REFERENCES `mydb`.`companyPicture` (`companyPicture_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`companyVideo`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `mydb`.`companyVideo` ;

CREATE TABLE IF NOT EXISTS `mydb`.`companyVideo` (
  `companyVideo_id` INT NOT NULL AUTO_INCREMENT,
  `path` VARCHAR(45) NOT NULL,
  `title` VARCHAR(45) NOT NULL,
  `description` VARCHAR(45) NOT NULL,
  `company_id` INT NOT NULL,
  `createTime` DATETIME NOT NULL,
  `tags` VARCHAR(100) NULL,
  PRIMARY KEY (`companyVideo_id`),
  INDEX `fk_videos_company1_idx` (`company_id` ASC),
  CONSTRAINT `fk_videos_company1`
    FOREIGN KEY (`company_id`)
    REFERENCES `mydb`.`company` (`company_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`pupil`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `mydb`.`pupil` ;

CREATE TABLE IF NOT EXISTS `mydb`.`pupil` (
  `user_id` INT NOT NULL,
  `school` VARCHAR(45) NOT NULL,
  `schoolYear` VARCHAR(45) NOT NULL,
  `program` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`user_id`),
  CONSTRAINT `fk_pupil_user1`
    FOREIGN KEY (`user_id`)
    REFERENCES `mydb`.`user` (`user_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`group`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `mydb`.`group` ;

CREATE TABLE IF NOT EXISTS `mydb`.`group` (
  `group_id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NULL,
  `description` VARCHAR(45) NULL,
  `conversation_id` INT NULL,
  PRIMARY KEY (`group_id`),
  INDEX `fk_group_conversation1_idx` (`conversation_id` ASC),
  CONSTRAINT `fk_group_conversation1`
    FOREIGN KEY (`conversation_id`)
    REFERENCES `mydb`.`conversation` (`conversation_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`conversation`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `mydb`.`conversation` ;

CREATE TABLE IF NOT EXISTS `mydb`.`conversation` (
  `conversation_id` INT NOT NULL AUTO_INCREMENT,
  `isGroupConversation` TINYINT(1) NOT NULL,
  `name` VARCHAR(45) NULL,
  `group_id` INT NULL,
  PRIMARY KEY (`conversation_id`),
  INDEX `fk_conversation_group1_idx` (`group_id` ASC),
  CONSTRAINT `fk_conversation_group1`
    FOREIGN KEY (`group_id`)
    REFERENCES `mydb`.`group` (`group_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`message`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `mydb`.`message` ;

CREATE TABLE IF NOT EXISTS `mydb`.`message` (
  `message_id` INT NOT NULL AUTO_INCREMENT,
  `conversation_id` INT NOT NULL,
  `sender` INT NOT NULL,
  `content` TEXT(500) NOT NULL,
  `timestamp` INT(11) UNSIGNED NOT NULL,
  PRIMARY KEY (`message_id`, `conversation_id`, `sender`),
  INDEX `fk_message_conversation1_idx` (`conversation_id` ASC),
  INDEX `fk_message_user1_idx` (`sender` ASC),
  CONSTRAINT `fk_message_conversation1`
    FOREIGN KEY (`conversation_id`)
    REFERENCES `mydb`.`conversation` (`conversation_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_message_user1`
    FOREIGN KEY (`sender`)
    REFERENCES `mydb`.`user` (`user_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`conversationParticipants`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `mydb`.`conversationParticipants` ;

CREATE TABLE IF NOT EXISTS `mydb`.`conversationParticipants` (
  `user_id` INT NOT NULL,
  `conversation_id` INT NOT NULL,
  PRIMARY KEY (`user_id`, `conversation_id`),
  INDEX `fk_conversationParticipants_conversation1_idx` (`conversation_id` ASC),
  CONSTRAINT `fk_conversationParticipants_user1`
    FOREIGN KEY (`user_id`)
    REFERENCES `mydb`.`user` (`user_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_conversationParticipants_conversation1`
    FOREIGN KEY (`conversation_id`)
    REFERENCES `mydb`.`conversation` (`conversation_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`groupMember`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `mydb`.`groupMember` ;

CREATE TABLE IF NOT EXISTS `mydb`.`groupMember` (
  `user_id` INT NOT NULL,
  `group_id` INT NOT NULL,
  `isGroupAdmin` TINYINT(1) NOT NULL,
  PRIMARY KEY (`user_id`, `group_id`),
  INDEX `fk_groupMember_group1_idx` (`group_id` ASC),
  CONSTRAINT `fk_groupMember_user1`
    FOREIGN KEY (`user_id`)
    REFERENCES `mydb`.`user` (`user_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_groupMember_group1`
    FOREIGN KEY (`group_id`)
    REFERENCES `mydb`.`group` (`group_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`post`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `mydb`.`post` ;

CREATE TABLE IF NOT EXISTS `mydb`.`post` (
  `post_id` INT NOT NULL AUTO_INCREMENT,
  `poster` INT NOT NULL,
  `group_id` INT NOT NULL,
  `content` TEXT(500) NOT NULL,
  `timestamp` INT(11) UNSIGNED NOT NULL,
  PRIMARY KEY (`post_id`),
  INDEX `fk_post_user1_idx` (`poster` ASC),
  INDEX `fk_post_group1_idx` (`group_id` ASC),
  CONSTRAINT `fk_post_user1`
    FOREIGN KEY (`poster`)
    REFERENCES `mydb`.`user` (`user_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_post_group1`
    FOREIGN KEY (`group_id`)
    REFERENCES `mydb`.`group` (`group_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`postComment`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `mydb`.`postComment` ;

CREATE TABLE IF NOT EXISTS `mydb`.`postComment` (
  `postComment_id` INT NOT NULL AUTO_INCREMENT,
  `post_id` INT NOT NULL,
  `user_id` INT NOT NULL,
  `timestamp` INT(11) NOT NULL,
  `content` TEXT(500) NOT NULL,
  PRIMARY KEY (`postComment_id`),
  INDEX `fk_postComment_post1_idx` (`post_id` ASC),
  INDEX `fk_postComment_user1_idx` (`user_id` ASC),
  CONSTRAINT `fk_postComment_post1`
    FOREIGN KEY (`post_id`)
    REFERENCES `mydb`.`post` (`post_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_postComment_user1`
    FOREIGN KEY (`user_id`)
    REFERENCES `mydb`.`user` (`user_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`userFile`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `mydb`.`userFile` ;

CREATE TABLE IF NOT EXISTS `mydb`.`userFile` (
  `userFile_id` INT NOT NULL AUTO_INCREMENT,
  `path` VARCHAR(100) NOT NULL,
  `description` VARCHAR(45) NULL,
  `user_id` INT NOT NULL,
  `name` VARCHAR(100) NOT NULL,
  PRIMARY KEY (`userFile_id`),
  INDEX `fk_userFile_user1_idx` (`user_id` ASC),
  CONSTRAINT `fk_userFile_user1`
    FOREIGN KEY (`user_id`)
    REFERENCES `mydb`.`user` (`user_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
