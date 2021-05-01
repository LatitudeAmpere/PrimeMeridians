<?php
require_once 'SettingsAndBannedWordsHandler.php';
$settings = new SettingsAndBannedWordsHandler();
$output = $settings->saveSettings(); // output will display a message indicating any changes made to this options menu were successfully saved and implemented
$build = $settings->loadSettings(); // build will populate the most recently saved settings into the admin menu
$update = $settings->manageWords(); // update will respond to a banned word entered into the textbox on the admin menu
?>

<!doctype html>
<html lang="en">
    <head>
        <!-- Required meta tags -->
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <!-- Bootstrap CSS -->
        <link
            href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta1/dist/css/bootstrap.min.css"
            rel="stylesheet"
            integrity="sha384-giJF6kkoqNQ00vy+HMDP7azOuL0xtbfIcaT9wjKHr8RbDVddVHyTfAAsrekwKmP1"
            crossorigin="anonymous"
        >

        <title>The Botler Admin Menu</title>
    </head>
    <body>
        <div style="background-image: url('GalaxyCat.jpg'); background-size: cover; background-color: rgba(255,255,255,0.8); background-blend-mode: lighten;">

        <form action = "#" method = "post">
            <div class = "container">
                <center><h1>THE BOTLER ADMIN MENU <!-- v3.0 --></h1>

                <!-- <h4>
                    <img src="JACKH.GIF" width="50" />
                    <b><i>*** Under Construction ***</b></i>
                    <img src="JACKH.GIF" width="50" />
                </h4>

                <img src="CONSTR~1.GIF" width="500" />

                <br><br> -->

                <h4>Use this menu to tweak your Botler. He's keeping the moustache though! :)</h4>

                <br>

                <?php echo $output ?></center>

                <br><br>

                <div class = "container">
                    <div class = "row">
                        <div class="col-sm-3">
                            <div class="mb-3">
                                <a href="https://github.com/LatitudeAmpere/PrimeMeridians/tree/main">The Botler's Code</a><br>
                           <!-- <a href="https://www.google.com">How To Use The Botler</a><br> Not Being Used Currently -->
                                <a href="devcats.php">All The Coolest Cats Are Here</a><br>

                                <!-- <br> -->

                                <div class="form-check form-switch">
                                    <!-- <input class="form-check-input" type="checkbox" id="MusicStreamingEnabled" checked>
                                    <input
                                        class="form-check-input"
                                        type="checkbox"
                                        name="MusicStreamingEnabled"
                                        value="music"
                                        <?php echo $build['MusicStreamingEnabled']; ?>
                                    >
                                    <label class="form-check-label" for="musicStreamingText">Music Streaming Enabled</label> -->
                                </div>
                                <!-- Lat may write a function to turn the music bot on and off; this is on a back burner -->

                                <div class="form-check form-switch">
                                    <input
                                        class="form-check-input"
                                        type="checkbox"
                                        name="CatPicturesEnabled"
                                        value="catpics"
                                        <?php echo $build['CatPicturesEnabled']; ?>
                                    >
                                    <label class="form-check-label" for="catPictureText">Cat Pictures Enabled</label>
                                </div>

                                <!-- <br> -->

                                <div class="form-check form-switch">
                                    <input
                                        class="form-check-input"
                                        type="checkbox"
                                        name="TriviaEnabled"
                                        value="trivia"
                                        <?php echo $build['TriviaEnabled']; ?>
                                    >
                                    <label class="form-check-label" for="triviaText">Trivia Enabled</label>
                                </div>
                                <!-- Taking down for now; might add in later
                                <div class="form-check">
                                    <input class="form-check-input" type="checkbox" value="" id="currencyCheckbox" checked>
                                    <label class="form-check-label" for="flexCheckDefault">Use Currency</label>
                                </div>
                                <div class="form-check">
                                    <input class="form-check-input" type="checkbox" value="" id="timerCheckbox" checked>
                                    <label class="form-check-label" for="flexCheckDefault">Use Timer</label>
                                </div> -->

                                <br>

                                <div class="form-check form-switch">
                                    <input
                                        class="form-check-input"
                                        type="checkbox"
                                        name="autoBanEnabled"
                                        value="autoban"
                                        <?php echo $build['autoBanEnabled']; ?>
                                    >
                                    <label class="form-check-label" for="flexCheckDefault">Auto Ban Enabled</label>
                                </div>

                                <label for="warningCount" class="form-label">Warnings Before Auto-Ban:</label>
                                <select name="warningCount" class="form-select" style="width: 80px;">
                                    <option <?php if ($build['warningCount'] == 1) echo "selected"; ?>>1</option>
                                    <option <?php if ($build['warningCount'] == 2) echo "selected"; ?>>2</option>
                                    <option <?php if ($build['warningCount'] == 3) echo "selected"; ?>>3</option>
                                    <option <?php if ($build['warningCount'] == 4) echo "selected"; ?>>4</option>
                                    <option <?php if ($build['warningCount'] == 5) echo "selected"; ?>>5</option>
                                </select>

                                <br><br><br><br><br><br>

                                <button type="submit" name="saveChanges" class="btn btn-primary btn-lg">Save Changes</button>

                                <!-- Taking down for now; might add in later
                                <label class="form-check-label" for="flavorTextFrequency">Botler's Politeness Level: </label><br>

                                <div class="form-check">
                                    <input class="form-check-input" type="radio" name="flavorText" id="low">
                                    <label class="form-check-label" for="male">Low</label>
                                </div>
                                <div class="form-check">
                                    <input class="form-check-input" type="radio" name="flavorText" id="medium" checked>
                                    <label class="form-check-label" for="female">Medium</label>
                                </div>
                                <div class="form-check">
                                    <input class="form-check-input" type="radio" name="flavorText" id="high">
                                    <label class="form-check-label" for="female">High</label>
                                </div> -->
                            </div>
                        </div>

                        <div class="col-sm-4">
                            <div class="mb-3">
                                <iframe
                                    src="https://discord.com/widget?id=805971720489795665&theme=dark"
                                    width="350"
                                    height="500"
                                    allowtransparency="true"
                                    frameborder="0"
                                    sandbox="allow-popups allow-popups-to-escape-sandbox allow-same-origin allow-scripts">
                                </iframe>
                            </div>
                        </div>

                        <div class="col-sm-5">
                            <div class="mb-3">
                                <label for="enterBannedWord" class="form-label">Enter a Banned Word or Phrase</label>
                                <input type="text" class="form-control" id="bannedWord" name="bannedWord">

                                <br>

                                <button type="submit" name="addWord" class="btn btn-primary">Add Word</button>
                                <button type="submit" name="removeWord" class="btn btn-primary">Remove Word</button>
                                <button type="submit" name="clearAllWords" class="btn btn-primary">Clear All Words</button>
                                <button type="submit" name="showAllWords" class="btn btn-primary">Show All Words</button>

                                <br><br>
                                
                                <?php echo $update ?>
                            </div>
                        </div>
                    </div>
                </div>

                <center>
                    <small>
                        <?php echo "© Copyright ".date('Y')." The Prime Meridians. All rights reserved."; ?>
                    </small>
                </center>
            </div>
        </form>
    </body>
</html>