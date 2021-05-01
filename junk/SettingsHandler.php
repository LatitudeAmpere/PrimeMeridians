<?php
class SettingsHandler {
    function saveSettings() {
        $output = "";
        
        if ($_POST == null) {
            // do nothing
        }
        else {
            $file = "settings.json";
            $str = file_get_contents($file);
            $json = json_decode($str, true);
            $updates = $json;
            
            if (!empty($_POST['MusicStreamingEnabled'])) {
                $updates['MusicStreamingEnabled'] = "checked";
            }
            else {
                $updates['MusicStreamingEnabled'] = "";
            }

            if (!empty($_POST['CatPicturesEnabled'])) {
                $updates['CatPicturesEnabled'] = "checked";
            }
            else {
                $updates['CatPicturesEnabled'] = "";
            }

            if (!empty($_POST['TriviaEnabled'])) {
                $updates['TriviaEnabled'] = "checked";
            }
            else {
                $updates['TriviaEnabled'] = "";
            }

            if (!empty($_POST['autoBanEnabled'])) {
                $updates['autoBanEnabled'] = "checked";
            }
            else {
                $updates['autoBanEnabled'] = "";
            }

            if (!empty($_POST['warningCount'])) {
                $updates['warningCount'] = $_POST['warningCount'];
            }

            if ($json != $updates && !empty($_POST['saveChanges'])) {
                file_put_contents($file, json_encode($updates));
                $output = "Your updates have been saved.";
            }
            else {
                $output = "No changes were made.";
            }
        }

        return $output;
    }

    function loadSettings() {
        $file = "settings.json";
        $str = file_get_contents($file);
        $json = json_decode($str, true);

        if (empty($json)) {
            $json['MusicStreamingEnabled'] = "checked";
            $json['CatPicturesEnabled'] = "checked";
            $json['TriviaEnabled'] = "checked";
            $json['autoBanEnabled'] = "checked";
            $json['warningCount'] = 3;
        }
        else if ($json['warningCount'] == null) {
            $json['warningCount'] = 3;
        }

        return $json;
    }
}
?>