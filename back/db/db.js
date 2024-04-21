import pkg from 'pg';
import dotenv from 'dotenv';

const {Client} = pkg;

dotenv.config();

const urlDB = process.env.DB_URL;

class Database {
    constructor() {
        this._client = new Client(`${urlDB}`);

        this._client.connect();

        // this.destroyOneDatabase("users");
        this.createAllTable();
        // this.destroyAll();
    }

    static getInstance() {
        if (!Database.instance) {
            Database.instance = new Database();
        }
        return Database.instance;
    }

    async destroyAll() {
        try {
            console.log("Dropping all tables");
            const {rows} = await this._client.query(`
              SELECT table_name 
              FROM information_schema.tables
              WHERE table_schema = 'public'
            `);
            await console.log("Tables found:", rows.length);

            for (const {table_name} of rows) {
                await this._client.query(`DROP TABLE IF EXISTS "${table_name}" CASCADE`);
                await console.log(`Table ${table_name} dropped`);
            }
            await console.log("All tables dropped");
        } catch (err) {
            await console.error("Error dropping tables:", err);
        }
    }

    async destroyOneDatabase(table_name) {
        try {
            await this._client.query(`DROP TABLE IF EXISTS "${table_name}" CASCADE`);
            await console.log(`Table ${table_name} dropped`);
        } catch (err) {
            await console.error("Error dropping tables:", err);
        }
    }

    createAllTable() {
        this._client.query(`CREATE TABLE IF NOT EXISTS "users" (
            discord_id VARCHAR(50) NOT NULL UNIQUE,
            pseudo VARCHAR(50) NOT NULL,
            money INT NOT NULL DEFAULT 0,
            win INT NOT NULL DEFAULT 0,
            loose INT NOT NULL DEFAULT 0,
            elo INT NOT NULL DEFAULT 0,
            avatar VARCHAR NOT NULL DEFAULT ('https://cdn.discordapp.com/attachments/1231282821281091625/1231282840964960377/R.png?ex=66366481&is=6623ef81&hm=c3cfe8d49a98511bf2cec2ecb7d74069f7c64d99e3b2b36394cb0f61638150b6&'),
            cooldownreward TIMESTAMP
        );`);

        this._client.query(` CREATE TABLE IF NOT EXISTS "cards" (
            id SERIAL PRIMARY KEY,
            name VARCHAR(100) NOT NULL,
            attack INT NOT NULL,
            pv INT NOT NULL,
            price INT NOT NULL,
            rarity VARCHAR(20) NOT NULL CHECK (rarity IN ('Common', 'Uncommom', 'Rare', 'Epic', 'Legendary', 'Admin')),
            owner_id VARCHAR(50),
            image VARCHAR(255) NOT NULL,
            FOREIGN KEY (owner_id) REFERENCES users(discord_id)
        );`);

        this._client.query(` CREATE TABLE IF NOT EXISTS "shop" (
            id SERIAL PRIMARY KEY,
            id_card INT NOT NULL,
            price INT NOT NULL,
            FOREIGN KEY (id_card) REFERENCES cards(id)
        );`);

        console.log("All tables created");
    }

    getClient() {
        return this._client;
    }
}

export default Database;