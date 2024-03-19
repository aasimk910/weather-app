<?php

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

// Database connection parameters
$db_host = "localhost";
$db_name = "weather";
$db_user = "root";
$db_password = "";

// Create connection
$conn = mysqli_connect($db_host, $db_user, $db_password, $db_name);

// Check connection
if (!$conn) {
    die("Connection failed: " . mysqli_connect_error());
}




// Check if the city parameter is set
if(isset($_GET['city'])){
    // Sanitize user input
    $city = mysqli_real_escape_string($conn, $_GET['city']);

    // URL for OpenWeatherMap API
    $url = "http://api.openweathermap.org/data/2.5/weather?q=" . $city . "&units=metric&appid=c074bbfa96105b9023b3617c2adefa81";

    // Fetch weather data from OpenWeatherMap API
    $response = file_get_contents($url);
    $data = json_decode($response, true);

    // Extract relevant weather information
    $city = mysqli_real_escape_string($conn, $data["name"]);
    $temp = $data["main"]["temp"];
    $humidity = $data["main"]["humidity"];
    $wind = $data["wind"]["speed"];
    $pressure = $data["main"]["pressure"];
    $country = $data["sys"]["country"];
    $weather_condition = mysqli_real_escape_string($conn, $data["weather"][0]["description"]);
    $weather_day = date("Y-m-d"); // Use the current date as the weather_day

    // Check if weather data for the city and day already exists in the database
    $selectData = "SELECT * FROM weather_table WHERE City = '$city' AND weather_day = '$weather_day'";
    $result = mysqli_query($conn, $selectData);

    if (mysqli_num_rows($result) > 0) {
        // If data exists for the city on the current day, update the existing record
        $updateData = "UPDATE weather_table SET Temp = $temp, Humidity = $humidity, Wind = $wind, Pressure = $pressure, Country = '$country', Weather_condition = '$weather_condition'
                       WHERE City = '$city' AND weather_day = '$weather_day'";
        
        if (mysqli_query($conn, $updateData)) {
            echo "Data updated successfully";
        } else {
            echo "Error updating data: " . mysqli_error($conn);
        }
    } else {
        // If data doesn't exist, insert a new record
        $insertData = "INSERT INTO weather_table (City, Temp, Humidity, Wind, Pressure, Country, Weather_condition, weather_day) 
                       VALUES ('$city', $temp, $humidity, $wind, $pressure, '$country', '$weather_condition', '$weather_day')";

        if (mysqli_query($conn, $insertData)) {
            echo "Data inserted successfully";
        } else {
            echo "Error inserting data: " . mysqli_error($conn);
        }
    }
} else {
    $city = "Glasgow";
}


$selectPastData = "SELECT * FROM weather_table WHERE city = '$city' AND weather_day < CURDATE() ORDER BY weather_day DESC LIMIT 7";
$resultPastData = mysqli_query($conn, $selectPastData);

if (mysqli_num_rows($resultPastData) > 0) {
    $weather_table = mysqli_fetch_all($resultPastData, MYSQLI_ASSOC);
} else {
    $weather_table = []; // Set an empty array if no past data is found
}

$selectAllData = "SELECT * FROM weather_table where city = '$city'";
$result = mysqli_query($conn, $selectAllData);
    if (mysqli_num_rows($result)>0) {
        while($row = mysqli_fetch_assoc($result)) {
            $rows[] = $row;
    }

    $json_data = json_encode($rows); //converts associative array ti JSON format
    echo  $json_data;
}
// Close database connection
mysqli_close($conn);

?>


