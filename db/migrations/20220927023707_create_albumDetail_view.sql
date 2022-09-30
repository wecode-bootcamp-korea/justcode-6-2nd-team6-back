-- migrate:up

CREATE VIEW albumDetail AS 
SELECT 
a.id AS id,
a.name AS albumTitle,
ats.id AS artistId,
ats.name AS artist,
a.album_type AS albumType,
a.album_image AS albumImage,
DATE_FORMAT (a.release_date, '%Y.%m.%d') AS albumReleaseDate,
rc.name AS releaseCompany,
mc.name AS managementCompany,
a.description AS description
FROM albums AS a
LEFT JOIN artists AS ats ON a.artist_id = ats.id
LEFT JOIN release_companies as rc ON a.release_company_id = rc.id
LEFT JOIN management_companies as mc ON ats.management_company_id = mc.id

-- migrate:down

DROP VIEW albumDetail;