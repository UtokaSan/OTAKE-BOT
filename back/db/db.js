import pkg from 'pg';
import dotenv from 'dotenv';

const {Client} = pkg;

dotenv.config();

const urlDB = process.env.DB_URL;

class Database {
    static instance;
    client;

    constructor() {
        this.connect();
    }

    static getInstance() {
        if (!Database.instance) {
            Database.instance = new Database();
        }
        return Database.instance;
    }

    async connect() {
        if (this.client) {
            await this.client.end();
        }

        this.client = new Client(`${urlDB}`);

        this.client.on('error', (err) => {
            console.error('Database connection error:', err.stack);
            this.reconnect();
        });

        try {
            await this.client.connect();
            console.log('Database connected successfully');
        } catch (error) {
            console.error('Failed to connect to the database:', error);
            this.reconnect();
        }
    }

    async reconnect() {
        console.log('Reconnecting to the database...');
        setTimeout(() => {
            this.connect();
        }, 5000); // Attendre 5 secondes avant de réessayer
    }

    getClient() {
        return this.client;
    }
}

export default Database;

// import pkg from 'pg';
// import dotenv from 'dotenv';
//
// const {Client} = pkg;
//
// dotenv.config();
//
// const urlDB = process.env.DB_URL;
//
// class Database {
//     static instance;
//     client;
//
//     constructor() {
//
//
//         this.client.on('error', (err) => {
//             console.error('Database connection error:', err.stack);
//             this.reconnect();
//         });
//
//
//         this._client.connect();
//
//         // this.destroyOneDatabase("users");
//         // this.destroyAll();
//         this.createAllTable();
//         // this.createTestData();
//     }
//
//     static getInstance() {
//         if (!Database.instance) {
//             Database.instance = new Database();
//         }
//         return Database.instance;
//     }
//
//     async connect() {
//         try {
//             await this.client.connect();
//             console.log('Database connected successfully');
//         } catch (error) {
//             console.error('Failed to connect to the database:', error);
//             await this.reconnect();
//         }
//     }
//
//     async reconnect() {
//         console.log('Reconnecting to the database...');
//         setTimeout(() => {
//             this.connect();
//         }, 5000); // Attendre 5 secondes avant de réessayer
//     }
//
//     async destroyAll() {
//         try {
//             console.log("Dropping all tables");
//             const {rows} = await this._client.query(`
//               SELECT table_name
//               FROM information_schema.tables
//               WHERE table_schema = 'public'
//             `);
//             await console.log("Tables found:", rows.length);
//
//             for (const {table_name} of rows) {
//                 await this._client.query(`DROP TABLE IF EXISTS "${table_name}" CASCADE`);
//                 await console.log(`Table ${table_name} dropped`);
//             }
//             await console.log("All tables dropped");
//         } catch (err) {
//             await console.error("Error dropping tables:", err);
//         }
//     }
//
//     async destroyOneDatabase(table_name) {
//         try {
//             await this._client.query(`DROP TABLE IF EXISTS "${table_name}" CASCADE`);
//             await console.log(`Table ${table_name} dropped`);
//         } catch (err) {
//             await console.error("Error dropping tables:", err);
//         }
//     }
//
//     createAllTable() {
//         this._client.query(`CREATE TABLE IF NOT EXISTS "users" (
//             discord_id VARCHAR(50) NOT NULL UNIQUE,
//             pseudo VARCHAR(50) NOT NULL,
//             password VARCHAR(255) NOT NULL,
//             money INT NOT NULL DEFAULT 0,
//             win INT NOT NULL DEFAULT 0,
//             loose INT NOT NULL DEFAULT 0,
//             elo INT NOT NULL DEFAULT 0,
//             avatar VARCHAR NOT NULL DEFAULT ('https://cdn.discordapp.com/attachments/1231282821281091625/1231282840964960377/R.png?ex=66366481&is=6623ef81&hm=c3cfe8d49a98511bf2cec2ecb7d74069f7c64d99e3b2b36394cb0f61638150b6&'),
//             cooldownreward TIMESTAMP,
//             role INT NOT NULL DEFAULT 0,
//             PRIMARY KEY (discord_id)
//         );`);
//
//         this._client.query(` CREATE TABLE IF NOT EXISTS "cards" (
//             id SERIAL PRIMARY KEY,
//             name VARCHAR(100) NOT NULL,
//             attack INT NOT NULL,
//             pv INT NOT NULL,
//             price INT NOT NULL,
//             rarity VARCHAR(20) NOT NULL CHECK (rarity IN ('Common', 'Uncommom', 'Rare', 'Epic', 'Legendary', 'Admin')),
//             owner_id VARCHAR(50),
//             image VARCHAR(255) NOT NULL,
//             FOREIGN KEY (owner_id) REFERENCES users(discord_id)
//         );`);
//
//         this._client.query(` CREATE TABLE IF NOT EXISTS "shop" (
//             id SERIAL PRIMARY KEY,
//             id_card INT NOT NULL,
//             price INT NOT NULL,
//             FOREIGN KEY (id_card) REFERENCES cards(id)
//         );`);
//
//         console.log("All tables created");
//     }
//
//     createTestData() {
//         this._client.query(`INSERT INTO "users" (discord_id, pseudo, password, money, win, loose, elo, avatar, role) VALUES ('123456789', 'test', 'test', 100, 0, 0, 0, 'https://2damnfunny.com/wp-content/uploads/2013/02/Cute-Pikachu-Gif-Pokemon.gif', 0);`);
//         this._client.query(`INSERT INTO "users" (discord_id, pseudo, password, money, win, loose, elo, avatar, role) VALUES ('987654321', 'test2', 'test2', 100, 0, 0, 0, 'https://i.pinimg.com/564x/5d/c2/de/5dc2de2f009fe24461b2492c24e312d5.jpg', 0);`);
//         this._client.query(`INSERT INTO "users" (discord_id, pseudo, password, money, win, loose, elo, avatar, role) VALUES ('9876543212', 'Theo', 'Theo', 1000, 5, 10, 1000, 'https://i.pinimg.com/564x/5d/c2/de/5dc2de2f009fe24461b2492c24e312d5.jpg', 1);`);
//         this._client.query(`INSERT INTO "cards" (name, attack, pv, price, rarity, owner_id, image) VALUES ('test', 10, 10, 10, 'Common', '123456789', 'https://2damnfunny.com/wp-content/uploads/2013/02/Cute-Pikachu-Gif-Pokemon.gif');`);
//         this._client.query(`INSERT INTO "cards" (name, attack, pv, price, rarity, owner_id, image) VALUES ('test2', 20, 20, 20, 'Admin', '123456789', 'https://i.pinimg.com/564x/21/fb/5a/21fb5a5df742af34aea6e38eaa6228d0.jpg');`);
//         this._client.query(`INSERT INTO "cards" (name, attack, pv, price, rarity, owner_id, image) VALUES ('Pika', 2, 3, 5, 'Admin', '123456789', 'https://i.pinimg.com/564x/fc/93/5d/fc935d32d785f33089fe1d798d1a9380.jpg');`);
//         this._client.query(`INSERT INTO "cards" (name, attack, pv, price, rarity, owner_id, image) VALUES ('Pika', 2, 3, 5, 'Legendary', '123456789', 'quizz with balls');`);
//     }
// }
//
// export default Database;