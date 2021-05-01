<?php
class SettingsAndBannedWordsHandler {
    function saveSettings() {
        $output = "";
        
        if (!isset($_POST['saveChanges'])) {
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

            if ($json != $updates) {
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

    function manageWords() {
        $output = "";
        
        if (!isset($_POST['addWord']) && !isset($_POST['removeWord']) && !isset($_POST['clearAllWords']) && !isset($_POST['showAllWords'])) {
            // do nothing
        }
        else {
            $file = "badWords.json";
            $str = file_get_contents($file);
            $json = json_decode($str, true);
            $updates = $json;

            if (isset($_POST['addWord']) && isset($_POST['bannedWord'])) {
                $updates['words'][] = $_POST["bannedWord"];
            }
            else if (isset($_POST['removeWord']) && isset($_POST['bannedWord']) && in_array($_POST['bannedWord'], $updates['words'])) {
                $updates['words'] = array_values(array_diff($updates['words'], array($_POST['bannedWord'])));
            }
            else if (isset($_POST['clearAllWords'])) {
                unset($updates);
            }
            else if (isset($_POST['showAllWords'])) {
                for ($i = 1; $i <= sizeof($updates['words']); $i++) {
                    $output .= $updates['words'][$i - 1].", ";

                    if ($i % 8 == 0) {
                        $output .= "<br>";
                    }
                }

                return $output;
            }

            if ($json['words'] != $updates['words']) {
                file_put_contents($file, json_encode($updates));
                $output .= "Changes to banned words have been saved.";
            }
            else {
                $output .= "No changes were made to your banned words.";
            }
        }

        return $output;
    }
}
?>