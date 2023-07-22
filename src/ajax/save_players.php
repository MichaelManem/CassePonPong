<?php
$playerName1 = $_POST['playerName1'];
$playerName2 = $_POST['playerName2'];
echo $playerName1;
echo $playerName2;

// Connect to the MySQL database
$HOST = 'localhost:8081/';
$USER = 'root';
$PWD = '';
$name = 'casseponpong';

$mysqli = new mysqli($HOST, $USER, $PWD, $name);

// // Vérifier la connexion
if ($mysqli->connect_error) {
  die('Connexion échouée : ' . $mysqli->connect_error);
}

// Utiliser des déclarations préparées pour sécuriser les requêtes
$query = "INSERT INTO players (name) VALUES (?),(?)";

$stmt = $mysqli->prepare($query);
$stmt->bind_param("ss", $playerName1, $playerName2); // Remplacez $speed par la valeur appropriée

if ($stmt->execute()) {
  echo 'Les noms des joueurs ont été enregistrés avec succès';
} else {
  echo 'Erreur : ' . $stmt->error;
}

$stmt->close();
$mysqli->close();
?>