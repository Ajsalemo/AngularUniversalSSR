/* Creates the database table */
USE angularssrtodos;

CREATE TABLE todos(
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    todo VARCHAR(500) NOT NULL,
    completed BOOLEAN NOT NULL DEFAULT false
);