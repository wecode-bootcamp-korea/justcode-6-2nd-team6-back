-- migrate:up

CREATE TABLE artists (
id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
name VARCHAR(3000),
management_company_id INT NOT NULL,
artist_image VARCHAR(2000),
genre_id INT NOT NULL,
artist_type VARCHAR(1000),
scope VARCHAR(30),
created_at TIMESTAMP NOT NULL DEFAULT NOW(),
FOREIGN KEY (management_company_id) REFERENCES management_companies (id),
FOREIGN KEY (genre_id) REFERENCES genres (id)
)

-- migrate:down

DROP TABLE artists;