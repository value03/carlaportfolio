<!doctype html>
<html>
    <head>
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.7.1/jquery.min.js"></script>
        <script src="scripts/script.js"></script>
        <meta name="viewport" content="width=device-width, initial-scale=0.1" />
        <link rel="stylesheet" href="styles.css" />
        <title>Carla aMarca Portfolio</title>
    </head>

    <body>
        <section class="space" id="spacee">
            <?php
	    echo '<script>console.log("hello")</script>';
            $dir = '/assets';
            $files = scandir($dir);
            foreach($files as $image) {
                    echo '<img src="assets/"' . $image . ' class="komet" id="' . $image . '" />';
		    echo "<script>console.log('$image')</script>";
                }
            ?>
        </section>
        <!--<section class="navigation">
            <button class="button">CARLA AMARCA</button>
            </section>-->

        <script src="scripts/transition.js"></script>
        <script src="scripts/kometclickhandler.js"></script>
    </body>
</html>
