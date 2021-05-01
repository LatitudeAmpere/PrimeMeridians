<?php
require_once 'Db_conn.php';
class DevCatHandler {
    function displayCats() {
        $output = "";
        $counter = 0;
        $db = new DatabaseConn();
        $sql = "SELECT image_devCat FROM devCats";
        $results = $db->execute($sql);

        if (empty($results)) {
            $output = "No cats available right meow! Check back soon :)";
        }
        else {
            $output = "<table class='table' align='center'><tbody><tr>";

            foreach ($results as $cat){
                $counter++;

                $pic = $cat['image_devCat'];
    
                $output .= "<td style='text-align: center; vertical-align: middle;'><img src='$pic' width='300'/></td>";
                
                if ($counter % 5 == 0) {
                    $output .= "</tr><tr>";
                }
            }
            
            $output .= "</tr></tbody></table>";
        }

        return $output;
    }
}
?>