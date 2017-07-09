```php
$mysqli = mysqli_init();
if (!$mysqli->real_connect($_my_info['host'], $_my_info['user'], $_my_info['password'], $_my_info['db'], $_my_info['port'], MYSQLI_CLIENT_COMPRESS)) {
    die('Connect Error (' . mysqli_connect_errno() . ') ' . mysqli_connect_error());
}
$mysqli->set_charset('utf8');

echo 'Success... ' . $mysqli->host_info . "\n";

function printTable($db_query) {

    global $mysqli;

    //Get db table data
    $job_result = $mysqli->query($db_query);

    // field.
    $field_info = $job_result->fetch_fields();
    $col_names = array();
    $col_cnt = count($field_info);
    foreach ($field_info as $row) {
        array_push($col_names, $row->name );
    }

    //Setup table - user css class db-table for design
    echo "<table class='db-table'>";
    echo "<tr colspan='". $col_cnt ."'></tr>";
    echo "<tr>";

    //Give each table column same name is db column name
    for($i=0;$i<$col_cnt;$i++){
        echo "<th>". $col_names[$i] ."</th>";
    }

    echo "</tr>";

    //Print out db table data
    while ($rows = $job_result->fetch_assoc()) {
        echo "<tr>";
        for($y=0;$y<$col_cnt;$y++){
            echo "<td>". $rows[$col_names[$y]] ."</td>";
        }
        echo "</tr>";
    }

    echo "</table>";
}

$mysqli->close();
```