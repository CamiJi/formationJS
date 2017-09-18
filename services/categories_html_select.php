<?php include( "../php/connect.php"); ?>
<?php
$strHtml = "<select name=\"id_cat\" id=\"id_cat\" accesskey=\"c\" tabindex=\"1\">";
$strHtml .= "<option value=\"0\">Tous les produits</option>";

$req = "SELECT * FROM categories";
$res = mysql_query( $req, $connexion);
	
if( mysql_numrows( $res))
{
	for( $i = 0; $i < mysql_numrows($res); $i++)
	{
		$rcd = mysql_fetch_array ($res);
		
		$strHtml .= "<option value=\"".$rcd["id"]."\">";
		$strHtml .= $rcd["name"];
		$strHtml .= "</option>";
	}
}

$strHtml .= "</select>";
header('Content-Type: text/html');
echo( utf8_encode( $strHtml));
?>
