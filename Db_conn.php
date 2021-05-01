<?php
class DatabaseConn {
  private $conn;
  /* THIS CLASS CONNECTS TO THE DATABASE ONLY AND SETS UP THE ATTRIBUTE PARAMETERS */
  function dbOpen() {
    try {
      $dbHost = 'localhost';
      $dbName = 'theBotler';
      $dbUsr = 'dtrentadue';
      $dbPass = '7Trentadue!';

      $db = $this->conn;

      $db = new PDO('mysql:host=' . $dbHost . ';dbname=' . $dbName, $dbUsr, $dbPass);
      
      $db->setAttribute(PDO::ATTR_EMULATE_PREPARES, false); /*THIS STOPS PDO FROM ADDING SINGLE QUOTES AROUND INTEGER VALUES.*/
      $db->setAttribute(PDO::MYSQL_ATTR_USE_BUFFERED_QUERY, true);/* FORCES QUERIES TO BE BUFFERED IN MYSQL */
      $db->setAttribute(PDO::ATTR_AUTOCOMMIT, true);/* THIS ALLOWS TO REVERT TO ITS PREVIOUS STATE WHEN A TRANSACTION IS COMMITTED OR ROLLED BACK*/
      $db->setAttribute(PDO::MYSQL_ATTR_LOCAL_INFILE, true);/*THE LOAD DATA INFILE STATEMENT READS ROWS FROM A TEXT FILE INTO A TABLE AT A VERY HIGH SPEED.  MORE INFO AT https://tecfa.unige.ch/guides/mysql/man/manuel_LOAD_DATA.html*/
      $db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);/* ERROR REPORTING AND THROWING OF ERRORS*/

      return $db;
    }
      
    catch(PDOException $e) { 
      echo $e->getMessage(); 
    }
  }

  function execute($sql, $bindingValues=null) {
    // Uncomment the following when debugging your sql
    //echo($sql . '<br>');    
    //if ($bindingValues != null) {
    //    var_dump($bindingValues);
    //}
        $db = $this->dbOpen();
        try {
            $statement = $db->prepare($sql);
            if (!$statement) {
                echo('DB Prepare Error - ' . $sql);
                exit();
            }
            if ($statement===false) {
                echo('DB Prepare Error - ' . $sql);
                exit();
            }
            if ($bindingValues != null) {
                for ($counter=0; $counter < sizeof($bindingValues); $counter++) {
                    $statement->bindParam($counter + 1, $bindingValues[$counter]);
                }
            }
            $statement->execute();
            $results = array();
            if (stripos($sql,'select') === 0) {
                $results = $statement->fetchAll();
            }
            $statement->closeCursor();
            return $results;
        }
        catch (Throwable $e2) {
            echo('DB Error - ' . $sql);
            echo('<br>' . $e2->getMessage());
            exit();
        }
    }
}
?>