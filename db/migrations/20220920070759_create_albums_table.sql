-- migrate:up

CREATE TABLE albums (
id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
artist_id INT NOT NULL,
name VARCHAR(3000),
description VARCHAR(5000),
album_type VARCHAR(1000),
release_company_id INT,
album_image VARCHAR(2000),
release_date DATE,
updated_at DATE,
created_at TIMESTAMP NOT NULL DEFAULT NOW(),
FOREIGN KEY (artist_id) REFERENCES artists (id),
FOREIGN KEY (release_company_id) REFERENCES release_companies (id)
)

-- migrate:down

DROP TABLE albums;