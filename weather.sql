-- --------------------------------------------------------
-- Host:                         127.0.0.1
-- Server version:               8.0.30 - MySQL Community Server - GPL
-- Server OS:                    Win64
-- HeidiSQL Version:             12.1.0.6537
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

-- Dumping data for table weather.weather_table: ~22 rows (approximately)
INSERT INTO `weather_table` (`City`, `Temp`, `Humidity`, `Wind`, `Pressure`, `Country`, `Weather_condition`, `weather_day`) VALUES
	('Kathmandu', 13.12, 62, 1.54, 1021, 'NP', 'haze', 'Wednesday'),
	('Glasgow', 6.69, 78, 12.35, 1019, 'GB', 'overcast clouds', 'Wednesday'),
	('Moscow', -0.79, 99, 1.67, 1027, 'RU', 'overcast clouds', 'Wednesday'),
	('Delhi', 14.05, 88, 1.54, 1018, 'IN', 'fog', 'Wednesday'),
	('Denmark', 6.77, 91, 2.66, 1015, 'US', 'scattered clouds', 'Wednesday'),
	('Norway', 0.93, 87, 2.57, 1015, 'US', 'overcast clouds', 'Wednesday'),
	('Australia', 37.39, 9, 9.47, 1009, 'AU', 'scattered clouds', 'Wednesday'),
	('New York', 1.3, 85, 3.6, 1022, 'US', 'light rain', 'Wednesday'),
	('Cañada', 12.35, 50, 0.65, 1032, 'ES', 'scattered clouds', 'Wednesday'),
	('Lucknow', 16.99, 72, 1.03, 1015, 'IN', 'haze', 'Wednesday'),
	('France', 30.99, 70, 5.06, 1011, 'CI', 'clear sky', 'Wednesday'),
	('Italy', 19.11, 53, 0.89, 1023, 'US', 'clear sky', 'Wednesday'),
	('Glasgow', 6.45, 80, 8.75, 1023, 'GB', 'light rain', '2024-02-01'),
	('Cañada', 7.87, 84, 0.79, 1034, 'ES', 'clear sky', '2024-02-01'),
	('Kathmandu', 9.12, 81, 0, 1022, 'NP', 'mist', '2024-02-01'),
	('Moscow', 0.36, 99, 3.57, 1008, 'RU', 'overcast clouds', '2024-02-01'),
	('Delhi', 17.84, 88, 4.63, 1016, 'IN', 'mist', '2024-02-01'),
	('Denmark', -0.22, 90, 0.74, 1022, 'US', 'clear sky', '2024-02-01'),
	('New York', 0.83, 86, 2.57, 1018, 'US', 'few clouds', '2024-02-01'),
	('Norway', 0.93, 91, 2.57, 1009, 'US', 'clear sky', '2024-02-01'),
	('Lucknow', 19.99, 56, 4.12, 1015, 'IN', 'haze', '2024-02-01'),
	('Australia', 32.62, 9, 5.59, 1009, 'AU', 'clear sky', '2024-02-01');

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
