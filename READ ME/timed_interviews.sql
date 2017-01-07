-- phpMyAdmin SQL Dump
-- version 4.1.14
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Generation Time: Mar 14, 2016 at 07:19 AM
-- Server version: 5.6.17
-- PHP Version: 5.5.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `timed_interviews`
--

-- --------------------------------------------------------

--
-- Table structure for table `questions`
--

CREATE TABLE IF NOT EXISTS `questions` (
  `questionID` int(15) NOT NULL AUTO_INCREMENT,
  `question` text,
  `description` text,
  PRIMARY KEY (`questionID`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=4 ;

--
-- Dumping data for table `questions`
--

INSERT INTO `questions` (`questionID`, `question`, `description`) VALUES
(1, 'What''s your desired salary?', 'Enter the salary amount you''d like to earn'),
(2, 'Would you be interested in a leadership position?', 'Tell us if you''d be open to a leadership role within the company.'),
(3, 'What''s a word that defines you?', 'A word that you think describes you best.');

-- --------------------------------------------------------

--
-- Table structure for table `settings`
--

CREATE TABLE IF NOT EXISTS `settings` (
  `userID` int(15) NOT NULL AUTO_INCREMENT COMMENT 'User''s ID in the database',
  `username` varchar(100) DEFAULT NULL COMMENT 'Administrator''s username',
  `password` varchar(100) DEFAULT NULL COMMENT 'Administrator''s password',
  `email` varchar(100) DEFAULT NULL COMMENT 'E-mail notification',
  PRIMARY KEY (`userID`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=2 ;

--
-- Dumping data for table `settings`
--

INSERT INTO `settings` (`userID`, `username`, `password`, `email`) VALUES
(1, 'admin', 'admin', 'greafyleens@gmail.com');

-- --------------------------------------------------------

--
-- Table structure for table `tests`
--

CREATE TABLE IF NOT EXISTS `tests` (
  `testID` int(15) NOT NULL AUTO_INCREMENT,
  `firstName` varchar(100) DEFAULT NULL,
  `lastName` varchar(100) DEFAULT NULL,
  `timeLapsed` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`testID`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=2 ;

--
-- Dumping data for table `tests`
--

INSERT INTO `tests` (`testID`, `firstName`, `lastName`, `timeLapsed`) VALUES
(1, 'Brenda', 'Benites', NULL);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
