<?php $runcode = "python infobox.py " . $_GET["location"] ?> 

<?php 
if ($_GET["location"]) {

        $output = passthru($runcode); 
        echo $output;
}

?>
