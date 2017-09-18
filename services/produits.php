<!DOCTYPE html>
<html lang="fr">
	<head>
		<title>produits de boutique.com</title>
		<meta charset="UTF-8">
		<meta name="viewport" content="width=device-width, initial-scale=1">
		<link rel="stylesheet" type="text/css" href="../css/style.css">
	</head>
	<body>
		<h1>Produits de boutique.com</h1>

		<header class="menu">
			<ul class="buttons">
				<li><a href="../index.html" class="active" id="menuAccueil">Accueil</a></li>
				<li><a href="produits.php" id="menuProduits">Boutique</a></li>
				<li><a href="#">Catégories</a>
					<ul>
						<li><a href="#">Alimentation</a></li>
						<li><a href="#">Gros éléectro</a></li>
					</ul>
				</li>
				<li><a href="contact.html">Contact</a></li>
			</ul>
		</header>

		<section id="main">
			<article class="jcvd">
				<?php
				 include("products_select.php");
				?>
			</article>
		</section>
		
		<footer class="menu">
		</footer>

	</body>
</html>