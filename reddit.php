<?php $runcode = "python reddit_sa.py " . $_GET["location"] ?> 

<?php 
if ($_GET["location"]) {

        $output = passthru($runcode); 
        echo $output;
}

?>
