-- phpMyAdmin SQL Dump
-- version 4.1.14
-- http://www.phpmyadmin.net
--
-- Client :  127.0.0.1
-- Généré le :  Mer 02 Mars 2016 à 08:59
-- Version du serveur :  5.6.17
-- Version de PHP :  5.5.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Base de données :  `onlinestore`
--

-- --------------------------------------------------------

--
-- Structure de la table `onlinestore`
--

CREATE TABLE IF NOT EXISTS `stores` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(127) NOT NULL,
  `desc` varchar(127) NOT NULL,
  `address` varchar(127) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `id` (`id`),
  UNIQUE KEY `name` (`name`)
) ENGINE=MyISAM  DEFAULT CHARSET=latin1 AUTO_INCREMENT=3 ;

--
-- Contenu de la table `stores`
--

INSERT INTO `stores` (`id`, `name`, `desc`, `address`) VALUES
(1, 'St Quentin Fruit et Legumes', 'Les meilleurs produits frais du 78', '5  place George Pompidou 78180 Montigny le bretonneux'),
(2, 'Epicerie d''Evry', '', '20 Cours Blaise Pascal 91000 Evry');

-- --------------------------------------------------------

--
-- Structure de la table `categories`
--

CREATE TABLE IF NOT EXISTS `categories` (
  `id` tinyint(3) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL,
  `desc` varchar(127) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=6 ;

--
-- Contenu de la table `categories`
--

INSERT INTO `categories` (`id`, `name`, `desc`) VALUES
(1, 'Alimentation', 'Retrouvez tous nos produits d''alimentation'),
(2, 'Gros électroménager', 'Le gros électroménager comprend machines à laver, sèche-linges, lave-linge...'),
(3, 'Petit électroménager', 'Retrouvez nos fers à repasser, nos sèches cheveux, nos machines à chocolat...'),
(4, 'Jardin', 'Ici, trouvez tout ce qui concerne le jardin de près ou de loin : plantes, cabannes, chaises...');

-- --------------------------------------------------------

--
-- Structure de la table `products`
--

CREATE TABLE IF NOT EXISTS `products` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `id_category` tinyint(3) unsigned NOT NULL,
  `name` varchar(50) NOT NULL,
  `desc` varchar(127) NOT NULL,
  `price` decimal(8,2) NOT NULL,
  `image` varchar(127) DEFAULT NULL,
  `stock`  tinyint(3) unsigned NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`),
  KEY `id_category` (`id_category`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=18 ;

--
-- Contenu de la table `products`
--

INSERT INTO `products` (`id`, `id_category`, `name`, `desc`, `price`, `image`, `stock`) VALUES
(1, 1, 'Pommes de Normandie', 'Les plus belles pommes... Juteuses et goûteuses !', '4.99', 'images/produits/pommes.jpg',20),
(2, 1, 'Oranges de Tunisie', 'Mangez des oranges bien mûres et sucrées même en plein hivers !', '7.99', 'images/produits/oranges.jpg',15),
(3, 1, 'Salade de nos campagnes', 'Que diriez-vous d''une belle salade bien croquante en cette saison ?', '3.99', 'images/produits/salades.jpg',5),
(4, 2, 'Machine à laver Whirl...', 'Une des meilleures machines à laver du moment !', '1199.90', 'images/produits/machinesalaver.jpg',2),
(5, 3, 'Fer à repasser Se...', 'Un très bon fer à repasser équipé de sa centrale vapeur...', '49.95', 'images/produits/ferarepasser.jpg',7),
(6, 4, 'Rateau', 'Le rateau est indispensable pour tous les travaux de jardinage...', '15.00', 'images/produits/rateau.jpg',3),
(7, 1, 'Entrecôte', 'De belles entrecôtes persillées et goûtues, issues de race à viande !', '19.95', 'images/produits/viandes.jpg',5),
(8, 1, 'Framboises surgelées', 'Toutes fraiches cueillies, aussitôt congelées !', '45.00', 'images/produits/surgeles.jpg',100),
(9, 3, 'Machine à expresso', 'Une superbe machine à expresso qui ravira vos papilles autant que vos yeux !', '79.90', 'images/produits/expresso.jpg',4),
(10, 3, 'Machine à chocolat', 'Faites vous-même, à la maison un chocolat onctueux et savoureux comme au salon de thé !', '44.99', 'images/produits/machinechoco.jpg',1),
(11, 1, 'Légumes frais', 'Recevez, chez vous, un panier de légumes de saison à quantité variable selon la production du producteur !', '9.99', 'images/produits/legumes.jpg',37),
(12, 1, 'Yahourt maison', 'Goûtez nos délicieux yahourts maison !', '1.99', 'images/produits/yahourts.jpg',36),
(13, 2, 'Réfrigérateur américain', 'Enfin un réfrigérateur américain qui ne vous laissera pas en panne de glaçons...', '2399.99', 'images/produits/refrigerateur.jpg',1),
(14, 3, 'Sèche cheveux', 'Un superbe sèche cheveux pour femme au design envoûtant !', '25.00', 'images/produits/sechecheveux.jpg',6),
(15, 1, 'Expresso italien', 'le meilleur expresso au monde !', '4.99', NULL,50),
(16, 1, '12 pains au chocolat', 'Des pains au chocolat tout chauds, pour toute la famille, chaque matins !', '4.50', '',58),
(17, 1, 'Chocolat noir 72%', 'Un chocolat idéal pour le café.', '0.99', '',12);

-- --------------------------------------------------------

--
-- Structure de la table `sales`
--

CREATE TABLE IF NOT EXISTS `sales` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `date` date NOT NULL,
  `ach_name` varchar(50) NOT NULL,
  `ach_addr` varchar(127) DEFAULT NULL,
  `ach_zipcode` varchar(5) NOT NULL,
  `ach_city` varchar(50) DEFAULT NULL,
  `ach_email` varchar(127) DEFAULT NULL,
  `remarks` varchar(127) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=5 ;

--
-- Contenu de la table `sales`
--

INSERT INTO `sales` (`id`, `date`, `ach_name`, `ach_addr`, `ach_zipcode`, `ach_city`, `ach_email`, `remarks`) VALUES
(1, '2009-02-19', 'M. Cyril BALL', '25 rue du Japon', '91000', 'EVRY', 'cyrilb@01-it.com', NULL),
(2, '2009-02-03', 'M. Laurent LACOSTAZ', '26 rue du Brésil', '75001', 'PARIS', 'laurentl@01-it.com', NULL),
(3, '2009-02-26', 'M. Pascal LUXAIN', '27 rue d''Italie', '77100', 'MEAUX', 'pascall@01-it.com', 'Un peu cher tout ça !'),
(4, '2009-03-03', 'M. Jean-Noël HARDY', '28 rue de Thaïlande', '75019', 'PARIS', 'jeannoelh@01-it.com', NULL);

-- --------------------------------------------------------

--
-- Structure de la table `sales_lines`
--

CREATE TABLE IF NOT EXISTS `sales_lines` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `id_sale` int(10) unsigned NOT NULL,
  `id_product` int(10) unsigned NOT NULL,
  `local_price` decimal(8,2) NOT NULL,
  `quantity` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `id_sale` (`id_sale`,`id_product`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=12 ;

--
-- Contenu de la table `sales_lines`
--

INSERT INTO `sales_lines` (`id`, `id_sale`, `id_product`, `local_price`, `quantity`) VALUES
(1, 1, 1, '1099.00', 1),
(2, 2, 1, '4.99', 5),
(3, 2, 2, '7.99', 1),
(4, 2, 3, '3.50', 5),
(5, 3, 11, '9.99', 2),
(6, 3, 12, '1.99', 1),
(7, 3, 14, '24.99', 1),
(8, 4, 5, '45.00', 1),
(9, 4, 9, '75.00', 1),
(10, 4, 7, '19.95', 2),
(11, 4, 15, '4.99', 2);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
