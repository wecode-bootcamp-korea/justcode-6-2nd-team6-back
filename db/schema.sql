/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Temporary view structure for view `albumdetail`
--

SET @saved_cs_client     = @@character_set_client;
/*!50503 SET character_set_client = utf8mb4 */;
/*!50001 CREATE VIEW `albumdetail` AS SELECT
 1 AS `id`,
 1 AS `albumTitle`,
 1 AS `artistId`,
 1 AS `artist`,
 1 AS `albumType`,
 1 AS `albumImage`,
 1 AS `albumReleaseDate`,
 1 AS `releaseCompany`,
 1 AS `managementCompany`,
 1 AS `description`*/;
SET character_set_client = @saved_cs_client;

--
-- Temporary view structure for view `albumplaycountsum`
--

SET @saved_cs_client     = @@character_set_client;
/*!50503 SET character_set_client = utf8mb4 */;
/*!50001 CREATE VIEW `albumplaycountsum` AS SELECT
 1 AS `album_id`,
 1 AS `total_count`*/;
SET character_set_client = @saved_cs_client;

--
-- Table structure for table `albums`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `albums` (
  `id` int NOT NULL AUTO_INCREMENT,
  `artist_id` int NOT NULL,
  `name` varchar(3000) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `description` varchar(5000) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `album_type` varchar(1000) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `release_company_id` int DEFAULT NULL,
  `album_image` varchar(2000) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `release_date` date DEFAULT NULL,
  `updated_at` date DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `artist_id` (`artist_id`),
  KEY `release_company_id` (`release_company_id`),
  CONSTRAINT `albums_ibfk_1` FOREIGN KEY (`artist_id`) REFERENCES `artists` (`id`),
  CONSTRAINT `albums_ibfk_2` FOREIGN KEY (`release_company_id`) REFERENCES `release_companies` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Temporary view structure for view `albumtracklist`
--

SET @saved_cs_client     = @@character_set_client;
/*!50503 SET character_set_client = utf8mb4 */;
/*!50001 CREATE VIEW `albumtracklist` AS SELECT
 1 AS `albumId`,
 1 AS `albumCover`,
 1 AS `songId`,
 1 AS `trackNumber`,
 1 AS `songTitle`,
 1 AS `content`,
 1 AS `albumTitle`,
 1 AS `artistId`,
 1 AS `artist`,
 1 AS `isTitle`*/;
SET character_set_client = @saved_cs_client;

--
-- Temporary view structure for view `artistdetail`
--

SET @saved_cs_client     = @@character_set_client;
/*!50503 SET character_set_client = utf8mb4 */;
/*!50001 CREATE VIEW `artistdetail` AS SELECT
 1 AS `artistId`,
 1 AS `artistName`,
 1 AS `artistImage`,
 1 AS `artistType`,
 1 AS `artistGenre`,
 1 AS `albumId`,
 1 AS `albumTitle`,
 1 AS `albumType`,
 1 AS `albumReleaseDate`,
 1 AS `albumImage`,
 1 AS `albumPlayCount`,
 1 AS `songId`,
 1 AS `songTitle`,
 1 AS `songPlayCount`*/;
SET character_set_client = @saved_cs_client;

--
-- Table structure for table `artists`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `artists` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(3000) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `management_company_id` int NOT NULL,
  `artist_image` varchar(2000) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `genre_id` int NOT NULL,
  `artist_type` varchar(1000) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `scope` varchar(30) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `management_company_id` (`management_company_id`),
  KEY `genre_id` (`genre_id`),
  CONSTRAINT `artists_ibfk_1` FOREIGN KEY (`management_company_id`) REFERENCES `management_companies` (`id`),
  CONSTRAINT `artists_ibfk_2` FOREIGN KEY (`genre_id`) REFERENCES `genres` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `genres`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `genres` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(3000) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `like_songs`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `like_songs` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `song_id` int NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  KEY `song_id` (`song_id`),
  CONSTRAINT `like_songs_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`),
  CONSTRAINT `like_songs_ibfk_2` FOREIGN KEY (`song_id`) REFERENCES `songs` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `management_companies`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `management_companies` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(2000) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `memberships`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `memberships` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(300) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `description` varchar(3000) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `origin_price` decimal(6,3) DEFAULT NULL,
  `benefit_price` decimal(6,3) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `play_counts`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `play_counts` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `song_id` int NOT NULL,
  `play_count` int NOT NULL,
  `updated_at` datetime DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  KEY `song_id` (`song_id`),
  CONSTRAINT `play_counts_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`),
  CONSTRAINT `play_counts_ibfk_2` FOREIGN KEY (`song_id`) REFERENCES `songs` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=31 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Temporary view structure for view `playlistdetail`
--

SET @saved_cs_client     = @@character_set_client;
/*!50503 SET character_set_client = utf8mb4 */;
/*!50001 CREATE VIEW `playlistdetail` AS SELECT
 1 AS `playlistId`,
 1 AS `userId`,
 1 AS `playlistTitle`,
 1 AS `playlistSongsCount`,
 1 AS `createdDate`,
 1 AS `songId`,
 1 AS `albumImage`*/;
SET character_set_client = @saved_cs_client;

--
-- Table structure for table `playlists`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `playlists` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `name` varchar(5000) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `playlists_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `playlists_songs`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `playlists_songs` (
  `id` int NOT NULL AUTO_INCREMENT,
  `playlist_id` int NOT NULL,
  `song_id` int NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `PK_playlists_songs_playlist_id_song_id` (`playlist_id`,`song_id`),
  KEY `song_id` (`song_id`),
  CONSTRAINT `playlists_songs_ibfk_1` FOREIGN KEY (`song_id`) REFERENCES `songs` (`id`),
  CONSTRAINT `playlists_songs_ibfk_2` FOREIGN KEY (`playlist_id`) REFERENCES `playlists` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=158 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Temporary view structure for view `playlistslide`
--

SET @saved_cs_client     = @@character_set_client;
/*!50503 SET character_set_client = utf8mb4 */;
/*!50001 CREATE VIEW `playlistslide` AS SELECT
 1 AS `playlistId`,
 1 AS `playlistTitle`,
 1 AS `createdDate`,
 1 AS `playlistSongsCount`,
 1 AS `albumImage`,
 1 AS `songId`,
 1 AS `songTitle`,
 1 AS `artist`*/;
SET character_set_client = @saved_cs_client;

--
-- Temporary view structure for view `playlistsongs`
--

SET @saved_cs_client     = @@character_set_client;
/*!50503 SET character_set_client = utf8mb4 */;
/*!50001 CREATE VIEW `playlistsongs` AS SELECT
 1 AS `playlistId`,
 1 AS `songId`,
 1 AS `songTitle`,
 1 AS `content`,
 1 AS `albumId`,
 1 AS `albumTitle`,
 1 AS `albumImage`,
 1 AS `atsId`,
 1 AS `artist`*/;
SET character_set_client = @saved_cs_client;

--
-- Temporary view structure for view `playlistsongscount`
--

SET @saved_cs_client     = @@character_set_client;
/*!50503 SET character_set_client = utf8mb4 */;
/*!50001 CREATE VIEW `playlistsongscount` AS SELECT
 1 AS `playlistId`,
 1 AS `playlistSongsCount`*/;
SET character_set_client = @saved_cs_client;

--
-- Table structure for table `purchase`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `purchase` (
  `id` int NOT NULL AUTO_INCREMENT,
  `voucher_id` int NOT NULL,
  `user_id` int NOT NULL,
  `payment` varchar(20) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `pay_with` varchar(30) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `type` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `voucher_id` (`voucher_id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `purchase_ibfk_1` FOREIGN KEY (`voucher_id`) REFERENCES `vouchers` (`id`),
  CONSTRAINT `purchase_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `release_companies`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `release_companies` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(2000) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `reviews`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `reviews` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `comment` varchar(3000) COLLATE utf8mb4_unicode_ci NOT NULL,
  `playlist_id` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  KEY `playlist_id` (`playlist_id`),
  CONSTRAINT `reviews_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`),
  CONSTRAINT `reviews_ibfk_2` FOREIGN KEY (`playlist_id`) REFERENCES `playlists` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `schema_migrations`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `schema_migrations` (
  `version` varchar(255) COLLATE latin1_bin NOT NULL,
  PRIMARY KEY (`version`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_bin;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Temporary view structure for view `songdetail`
--

SET @saved_cs_client     = @@character_set_client;
/*!50503 SET character_set_client = utf8mb4 */;
/*!50001 CREATE VIEW `songdetail` AS SELECT
 1 AS `id`,
 1 AS `songTitle`,
 1 AS `content`,
 1 AS `artistId`,
 1 AS `songArtist`,
 1 AS `albumId`,
 1 AS `albumTitle`,
 1 AS `albumCover`,
 1 AS `musicBy`,
 1 AS `lyricsBy`,
 1 AS `lyrics`*/;
SET character_set_client = @saved_cs_client;

--
-- Temporary view structure for view `songplaycountsum`
--

SET @saved_cs_client     = @@character_set_client;
/*!50503 SET character_set_client = utf8mb4 */;
/*!50001 CREATE VIEW `songplaycountsum` AS SELECT
 1 AS `song_id`,
 1 AS `total_count`*/;
SET character_set_client = @saved_cs_client;

--
-- Table structure for table `songs`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `songs` (
  `id` int NOT NULL AUTO_INCREMENT,
  `track_number` int DEFAULT NULL,
  `album_id` int NOT NULL,
  `name` varchar(3000) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `content` varchar(2000) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `lyrics_by` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `music_by` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `is_title` tinyint DEFAULT NULL,
  `lyrics` varchar(5000) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `genre_id` int NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `album_id` (`album_id`),
  KEY `genre_id` (`genre_id`),
  CONSTRAINT `songs_ibfk_1` FOREIGN KEY (`album_id`) REFERENCES `albums` (`id`),
  CONSTRAINT `songs_ibfk_2` FOREIGN KEY (`genre_id`) REFERENCES `genres` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=66 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `users`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `email` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `password` varchar(3000) COLLATE utf8mb4_unicode_ci NOT NULL,
  `name` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `birth` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `phone` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `profile_image` varchar(2000) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `vouchers`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `vouchers` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(300) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` varchar(3000) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `origin_price` decimal(6,3) NOT NULL,
  `sale_price` decimal(6,3) DEFAULT NULL,
  `membership_id` int DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `membership_id` (`membership_id`),
  CONSTRAINT `vouchers_ibfk_1` FOREIGN KEY (`membership_id`) REFERENCES `memberships` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping routines for database 'florida'
--

--
-- Final view structure for view `albumdetail`
--

/*!50001 DROP VIEW IF EXISTS `albumdetail`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `albumdetail` AS select `a`.`id` AS `id`,`a`.`name` AS `albumTitle`,`ats`.`id` AS `artistId`,`ats`.`name` AS `artist`,`a`.`album_type` AS `albumType`,`a`.`album_image` AS `albumImage`,date_format(`a`.`release_date`,'%Y.%m.%d') AS `albumReleaseDate`,`rc`.`name` AS `releaseCompany`,`mc`.`name` AS `managementCompany`,`a`.`description` AS `description` from (((`albums` `a` left join `artists` `ats` on((`a`.`artist_id` = `ats`.`id`))) left join `release_companies` `rc` on((`a`.`release_company_id` = `rc`.`id`))) left join `management_companies` `mc` on((`ats`.`management_company_id` = `mc`.`id`))) */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `albumplaycountsum`
--

/*!50001 DROP VIEW IF EXISTS `albumplaycountsum`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `albumplaycountsum` AS select `s`.`album_id` AS `album_id`,sum(`pc`.`play_count`) AS `total_count` from ((`play_counts` `pc` left join `songs` `s` on((`s`.`id` = `pc`.`song_id`))) left join `albums` `a` on((`s`.`album_id` = `a`.`id`))) group by `s`.`album_id` order by `s`.`album_id` */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `albumtracklist`
--

/*!50001 DROP VIEW IF EXISTS `albumtracklist`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `albumtracklist` AS select `a`.`id` AS `albumId`,`a`.`album_image` AS `albumCover`,`s`.`id` AS `songId`,`s`.`track_number` AS `trackNumber`,`s`.`name` AS `songTitle`,`s`.`content` AS `content`,`a`.`name` AS `albumTitle`,`ats`.`id` AS `artistId`,`ats`.`name` AS `artist`,`s`.`is_title` AS `isTitle` from ((`albums` `a` left join `artists` `ats` on((`a`.`artist_id` = `ats`.`id`))) left join `songs` `s` on((`s`.`album_id` = `a`.`id`))) group by `s`.`id` order by `s`.`album_id`,`s`.`track_number` */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `artistdetail`
--

/*!50001 DROP VIEW IF EXISTS `artistdetail`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `artistdetail` AS select `ats`.`id` AS `artistId`,`ats`.`name` AS `artistName`,`ats`.`artist_image` AS `artistImage`,`ats`.`artist_type` AS `artistType`,`g`.`name` AS `artistGenre`,`a`.`id` AS `albumId`,`a`.`name` AS `albumTitle`,`a`.`album_type` AS `albumType`,date_format(`a`.`release_date`,'%Y.%m.%d') AS `albumReleaseDate`,`a`.`album_image` AS `albumImage`,`apcs`.`total_count` AS `albumPlayCount`,`s`.`id` AS `songId`,`s`.`name` AS `songTitle`,`spcs`.`total_count` AS `songPlayCount` from (((((`artists` `ats` left join `albums` `a` on((`a`.`artist_id` = `ats`.`id`))) left join `songs` `s` on((`s`.`album_id` = `a`.`id`))) left join `songplaycountsum` `spcs` on((`spcs`.`song_id` = `s`.`id`))) left join `albumplaycountsum` `apcs` on((`apcs`.`album_id` = `a`.`id`))) left join `genres` `g` on((`ats`.`genre_id` = `g`.`id`))) */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `playlistdetail`
--

/*!50001 DROP VIEW IF EXISTS `playlistdetail`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `playlistdetail` AS select `p`.`id` AS `playlistId`,`p`.`user_id` AS `userId`,`p`.`name` AS `playlistTitle`,`psc`.`playlistSongsCount` AS `playlistSongsCount`,date_format(`p`.`created_at`,'%Y.%m.%d') AS `createdDate`,`s`.`id` AS `songId`,`a`.`album_image` AS `albumImage` from (((((`playlists` `p` left join `playlists_songs` `ps` on((`ps`.`playlist_id` = `p`.`id`))) left join `songs` `s` on((`ps`.`song_id` = `s`.`id`))) left join `playlistsongscount` `psc` on((`p`.`id` = `psc`.`playlistId`))) left join `albums` `a` on((`s`.`album_id` = `a`.`id`))) left join `artists` `ats` on((`a`.`artist_id` = `ats`.`id`))) group by `p`.`id` order by `p`.`id` */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `playlistslide`
--

/*!50001 DROP VIEW IF EXISTS `playlistslide`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `playlistslide` AS select `p`.`id` AS `playlistId`,`p`.`name` AS `playlistTitle`,date_format(`p`.`created_at`,'%Y.%m.%d') AS `createdDate`,`psc`.`playlistSongsCount` AS `playlistSongsCount`,`a`.`album_image` AS `albumImage`,`s`.`id` AS `songId`,`s`.`name` AS `songTitle`,`ats`.`name` AS `artist` from (((((`playlists` `p` left join `playlists_songs` `ps` on((`ps`.`playlist_id` = `p`.`id`))) left join `songs` `s` on((`ps`.`song_id` = `s`.`id`))) left join `playlistsongscount` `psc` on((`p`.`id` = `psc`.`playlistId`))) left join `albums` `a` on((`s`.`album_id` = `a`.`id`))) left join `artists` `ats` on((`a`.`artist_id` = `ats`.`id`))) */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `playlistsongs`
--

/*!50001 DROP VIEW IF EXISTS `playlistsongs`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `playlistsongs` AS select `p`.`id` AS `playlistId`,`s`.`id` AS `songId`,`s`.`name` AS `songTitle`,`s`.`content` AS `content`,`a`.`id` AS `albumId`,`a`.`name` AS `albumTitle`,`a`.`album_image` AS `albumImage`,`ats`.`id` AS `atsId`,`ats`.`name` AS `artist` from (((((`playlists` `p` left join `playlists_songs` `ps` on((`ps`.`playlist_id` = `p`.`id`))) left join `songs` `s` on((`ps`.`song_id` = `s`.`id`))) left join `playlistsongscount` `psc` on((`p`.`id` = `psc`.`playlistId`))) left join `albums` `a` on((`s`.`album_id` = `a`.`id`))) left join `artists` `ats` on((`a`.`artist_id` = `ats`.`id`))) order by `p`.`id` */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `playlistsongscount`
--

/*!50001 DROP VIEW IF EXISTS `playlistsongscount`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `playlistsongscount` AS select `playlists_songs`.`playlist_id` AS `playlistId`,count(`playlists_songs`.`id`) AS `playlistSongsCount` from `playlists_songs` group by `playlists_songs`.`playlist_id` */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `songdetail`
--

/*!50001 DROP VIEW IF EXISTS `songdetail`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `songdetail` AS select `s`.`id` AS `id`,`s`.`name` AS `songTitle`,`s`.`content` AS `content`,`ats`.`id` AS `artistId`,`ats`.`name` AS `songArtist`,`a`.`id` AS `albumId`,`a`.`name` AS `albumTitle`,`a`.`album_image` AS `albumCover`,`s`.`music_by` AS `musicBy`,`s`.`lyrics_by` AS `lyricsBy`,`s`.`lyrics` AS `lyrics` from ((`songs` `s` left join `albums` `a` on((`s`.`album_id` = `a`.`id`))) left join `artists` `ats` on((`a`.`artist_id` = `ats`.`id`))) */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `songplaycountsum`
--

/*!50001 DROP VIEW IF EXISTS `songplaycountsum`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `songplaycountsum` AS select `play_counts`.`song_id` AS `song_id`,sum(`play_counts`.`play_count`) AS `total_count` from `play_counts` group by `play_counts`.`song_id` */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed

--
-- Dbmate schema migrations
--

LOCK TABLES `schema_migrations` WRITE;
INSERT INTO `schema_migrations` (version) VALUES
  ('20220924110344'),
  ('20220924110357'),
  ('20220924110404'),
  ('20220924110415'),
  ('20220924110420'),
  ('20220924110428'),
  ('20220924110444'),
  ('20220924110452'),
  ('20220924110457'),
  ('20220924110534'),
  ('20220924110542'),
  ('20220924110551'),
  ('20220924110601'),
  ('20220924110608'),
  ('20220924110619'),
  ('20220924110644'),
  ('20220924110654'),
  ('20220924110707'),
  ('20220924110714'),
  ('20220924110719'),
  ('20220924110727'),
  ('20220924110741'),
  ('20220924110750'),
  ('20220924110755'),
  ('20220924110801'),
  ('20220924110810'),
  ('20220924110818'),
  ('20220924110829'),
  ('20220924110844'),
  ('20220924110853'),
  ('20220927023707'),
  ('20220927023718'),
  ('20220927023722'),
  ('20220927023727'),
  ('20220927023732'),
  ('20220927023736'),
  ('20220927023740'),
  ('20220927023744'),
  ('20220927023747'),
  ('20220927023752');
UNLOCK TABLES;
