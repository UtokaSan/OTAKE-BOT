CREATE TABLE users (
                       discord_id VARCHAR(50) NOT NULL UNIQUE,
                       pseudo VARCHAR(50) NOT NULL,
                       password VARCHAR(255),
                       role VARCHAR(8),
                       avatar VARCHAR(255) NOT NULL,
                       money INT NOT NULL,
                       win INT NOT NULL DEFAULT 0,
                       loose INT NOT NULL DEFAULT 0,
                       elo INT NOT NULL
);

CREATE TABLE cards (
                       id SERIAL PRIMARY KEY,
                       name VARCHAR(100) NOT NULL,
                       attack INT NOT NULL,
                       pv INT NOT NULL,
                       price INT NOT NULL,
                       rarity VARCHAR(20) NOT NULL CHECK (rarity IN ('Common', 'Uncommom', 'Rare', 'Epic', 'Legendary')),
                       owner_id VARCHAR(50),
                       image VARCHAR(255) NOT NULL,
                       FOREIGN KEY (owner_id) REFERENCES users(discord_id)
);

CREATE TABLE shop (
                      id SERIAL PRIMARY KEY,
                      id_card INT NOT NULL,
                      price INT NOT NULL,
                      FOREIGN KEY (id_card) REFERENCES cards(id)
);

CREATE TABLE cooldown_reward (
                         id SERIAL PRIMARY KEY,
                         discord_id VARCHAR(50) NOT NULL,
                         cooldown_cards TIMESTAMP NOT NULL,
                        cooldown_shop TIMESTAMP NOT NULL,
                        cooldown_quizz TIMESTAMP NOT NULL,
                        FOREIGN KEY (discord_id) REFERENCES users(discord_id)
);