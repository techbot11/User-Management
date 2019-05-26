-- phpMyAdmin SQL Dump
-- version 4.6.4
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: May 26, 2019 at 07:04 PM
-- Server version: 5.7.14
-- PHP Version: 7.0.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `dbusermgnt`
--

-- --------------------------------------------------------

--
-- Table structure for table `tbluser`
--

CREATE TABLE `tbluser` (
  `userId` int(11) NOT NULL,
  `fullname` text NOT NULL,
  `address` text NOT NULL,
  `email` text NOT NULL,
  `password` text NOT NULL,
  `phoneno` text NOT NULL,
  `gender` text NOT NULL,
  `usertype` text NOT NULL,
  `status` int(11) NOT NULL DEFAULT '0',
  `createdon` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `Modifiedon` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Dumping data for table `tbluser`
--

INSERT INTO `tbluser` (`userId`, `fullname`, `address`, `email`, `password`, `phoneno`, `gender`, `usertype`, `status`, `createdon`, `Modifiedon`) VALUES
(1, 'Ankur Sanghvi', 'surat', 'admin@gmail.com', 'admin', '9090909090', 'male', 'admin', 0, '2019-05-26 00:00:00', '2019-05-26 00:00:00'),
(8, 'atul Sanghvi', 'surat', 'atul@gmail.com', 'atul', '90998909090', 'male', 'user', 0, '2019-05-26 00:00:00', '2019-05-26 00:00:00'),
(9, 'rajan', 'rajkot', 'rajan@gmail.com', 'rajan', '9090909090', 'male', 'admin', 1, '2019-05-26 00:00:00', '2019-05-26 00:00:00'),
(10, 'kd', 'rajkot', 'kd@gmail.com', 'kd123', '9090909090', 'male', 'user', 1, '2019-05-26 00:00:00', '2019-05-26 00:00:00');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `tbluser`
--
ALTER TABLE `tbluser`
  ADD PRIMARY KEY (`userId`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `tbluser`
--
ALTER TABLE `tbluser`
  MODIFY `userId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
