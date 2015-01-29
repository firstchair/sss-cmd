-- phpMyAdmin SQL Dump
-- version 4.2.7
-- http://www.phpmyadmin.net
--
-- Host: localhost:3306
-- Generation Time: Jan 29, 2015 at 12:12 PM
-- Server version: 5.6.17-debug-log
-- PHP Version: 5.5.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `sss-final`
--

-- --------------------------------------------------------

--
-- Table structure for table `comments`
--

CREATE TABLE IF NOT EXISTS `comments` (
`id` int(11) unsigned NOT NULL,
  `photo_id` varchar(250) NOT NULL,
  `created_at` datetime DEFAULT NULL,
  `comment` text
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=4 ;

--
-- Dumping data for table `comments`
--

INSERT INTO `comments` (`id`, `photo_id`, `created_at`, `comment`) VALUES
(1, 'tumblr_levzz5yzM01qbkjfoo1_500.jpg', '2015-01-29 11:54:11', 'Mooi'),
(2, 'tumblr_levzz5yzM01qbkjfoo1_500.jpg', '2015-01-29 12:16:48', '123'),
(3, 'tumblr_levzz5yzM01qbkjfoo1_500.jpg', '2015-01-29 12:22:25', '1');

-- --------------------------------------------------------

--
-- Table structure for table `photos`
--

CREATE TABLE IF NOT EXISTS `photos` (
`id` int(11) unsigned NOT NULL,
  `user_id` int(11) NOT NULL,
  `caption` text,
  `filename` varchar(255) DEFAULT NULL
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=32 ;

--
-- Dumping data for table `photos`
--

INSERT INTO `photos` (`id`, `user_id`, `caption`, `filename`) VALUES
(1, 2, NULL, 'paard.png'),
(2, 2, NULL, 'tumblr_levzz5yzM01qbkjfoo1_500.jpg'),
(3, 2, NULL, 'tumblr_lh1wq5YS451qczjnio1_500.jpg'),
(4, 2, NULL, 'tumblr_lhatasAmBx1qb3oqio1_500.jpg'),
(5, 2, NULL, 'tumblr_lhp3okcQhr1qgpa0ro1_500.gif'),
(6, 2, NULL, 'tumblr_li0umc2k1Q1qcbenfo1_500.jpg'),
(7, 2, NULL, 'tumblr_lifuqfKWrB1qfvouao1_500.jpg'),
(8, 2, NULL, 'tumblr_liglqxFlUN1qbw8y4o1_500.png'),
(9, 2, NULL, 'tumblr_lijon0Ti4y1qa9pnro1_1280.jpg'),
(10, 2, NULL, 'tumblr_lilil3Ryyt1qbqko8o1_500.jpg'),
(11, 2, NULL, 'tumblr_liuagvfomq1qfvouao1_500.jpg'),
(12, 2, NULL, 'tumblr_liuvyoaYST1qayo3to1_1280.jpg'),
(13, 2, NULL, 'tumblr_lixs84XOKX1qaugiso1_1280.jpg'),
(14, 2, NULL, 'tumblr_lj2kuxbeNw1qb815co1_500.jpg'),
(15, 2, NULL, 'tumblr_lj9acjr1521qgimuio1_1280.jpg'),
(16, 2, NULL, 'tumblr_lj46z1Ioxd1qa3yjwo1_1280.jpg'),
(17, 2, NULL, 'tumblr_lj67dlhPhI1qzleu4o1_500.jpg'),
(18, 2, NULL, 'tumblr_ljd6r99sD51qzleu4o1_400.jpg'),
(19, 2, NULL, 'tumblr_ljgbbv4xgu1qbkb8io1_500.jpg'),
(20, 2, NULL, 'tumblr_ljgli2Hxpn1qgimuio1_1280.jpg'),
(21, 2, NULL, 'tumblr_ljgpoafaro1qhpwr3o1_500.png'),
(22, 2, NULL, 'tumblr_ljkgdjnPH81qgu553o1_500.png'),
(23, 2, NULL, 'tumblr_lllsvfxAUL1qfqih7o1_500.gif'),
(24, 2, NULL, 'tumblr_lm57x6gvcI1qfdig2o1_500.gif'),
(25, 2, NULL, 'tumblr_lnoe6fm9ie1qkegsbo1_500.gif'),
(26, 2, NULL, 'tumblr_lo71mgTKVk1qkegsbo1_500.gif'),
(27, 2, NULL, 'tumblr_lp4bzx8X3h1qkegsbo1_500.gif'),
(28, 2, NULL, 'tumblr_lp9etij6Vh1qkegsbo1_500.gif'),
(29, 2, NULL, 'tumblr_lp6352gqr91qkegsbo1_400.gif'),
(30, 2, NULL, 'tumblr_lp6792yrVE1qkegsbo1_500.gif'),
(31, 2, NULL, 'tumblr_lqa5g8eWhx1qkegsbo1_500.gif');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE IF NOT EXISTS `users` (
`id` int(11) unsigned NOT NULL,
  `email` varchar(255) NOT NULL DEFAULT '',
  `password` varchar(255) NOT NULL,
  `name` varchar(255) DEFAULT NULL
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=3 ;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `email`, `password`, `name`) VALUES
(1, 'test@test.com', 'test', 'Tester'),
(2, 'sem.ammerlaan@gmail.com', '123', 'Sem');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `comments`
--
ALTER TABLE `comments`
 ADD PRIMARY KEY (`id`);

--
-- Indexes for table `photos`
--
ALTER TABLE `photos`
 ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
 ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `comments`
--
ALTER TABLE `comments`
MODIFY `id` int(11) unsigned NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=4;
--
-- AUTO_INCREMENT for table `photos`
--
ALTER TABLE `photos`
MODIFY `id` int(11) unsigned NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=32;
--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
MODIFY `id` int(11) unsigned NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=3;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
