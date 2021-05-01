<?php
class BannedWordsHandler {
    function manageWords() {
        $output = "";
        
        if ($_POST == null) {
            // do nothing
        }
        else {
            $file = "badWords.json";
            $str = file_get_contents($file);
            $json = json_decode($str, true);
            $updates = $json;
            
            if (!empty($_POST['bannedWord'])) {
                $word = $_POST("bannedWord");

                if (!empty($_POST['addWord'])) {
                    $updates['words'] = $word;
                }
                else if (!empty($_POST['removeWord'])) {
                    if ($updates['words'][$word] != null) {
                        unset($updates['words'][$word]);
                    }
                }              
            }

            if (!empty($_POST['clearAllWords'])) {
                unset($updates);
            }
            else if (!empty($_POST['showAllWords'])) {
                for ($i = 0; $i < sizeof($updates); $i++) {
                    $output .= $updates[$i].", ";

                    if ($i % 5 == 0) {
                        $output .= "<br>";
                    }
                }

                return $output;
            }

            if ($json != $updates) {
                file_put_contents($file, json_encode($updates));
                $output = "Changes to banned words have been saved.";
            }
            else {
                $output = "No changes were made to your banned words.";
            }
        }

        return $output;
    }
}
?>