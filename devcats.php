<?php
require_once 'DevCatHandler.php';
$devCatHandler = new DevCatHandler();
$output = $devCatHandler->displayCats();
?>

<!doctype html>
<html lang="en">
    <head>
        <!-- Required meta tags -->
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <!-- Bootstrap CSS -->
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta1/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-giJF6kkoqNQ00vy+HMDP7azOuL0xtbfIcaT9wjKHr8RbDVddVHyTfAAsrekwKmP1" crossorigin="anonymous">

        <title>The Developer's Cats</title>
    </head>
    <body>
        <div style="background-image: url('GalaxyCat.jpg'); background-size: cover; background-color: rgba(255,255,255,0.8); background-blend-mode: lighten;">

        <form action="#" method="post">
            <center>
                <h1>The Coolest Cats</h1>

                <h6>~ The Developers Aren't Biased ~</h6>

                <font size="5">
                    <a href="GUI.php">Main Menu</a>
                </font>

                <br><br>

                <?php echo $output ?>

                <br><br>
                
                <small>
                    <?php echo "© Copyright ".date('Y')." The Prime Meridians. All rights reserved."; ?>
                </small>
            </center>
        </form>
    </body>
</html>