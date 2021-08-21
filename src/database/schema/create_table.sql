/* Creates the database table */
USE angularssrtodos;

CREATE TABLE todos(
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    todo VARCHAR(500) NOT NULL,
    completed BOOLEAN NOT NULL DEFAULT false,
    important BOOLEAN NOT NULL DEFAULT false,
    dueBy DATE DEFAULT NULL,
    createdAt VARCHAR(255) NOT NULL,
    updatedAt VARCHAR(255) NOT NULL
);