require(`dotenv`).config();
const client = require(`./client`)
const dropTables = async() =>{
  try {
    await client.query(`
      DROP TABLE IF EXISTS users;
      DROP TABLE IF EXISTS items;
      DROP TABLE IF EXISTS reviews;
      `)
  }catch(error){
    console.log(error);
  }
}


const createTables = async()=>{
  try {

    await client.query(`
      CREATE TABLE users (
        id SERIAL PRIMARY KEY,
        username VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL
        );

      CREATE TABLE items (
        id SERIAL PRIMARY KEY,
        description TEXT NOT NULL
        );

      CREATE TABLE reviews (
        id SERIAL PRIMARY KEY,
        rating INT NOT NULL CHECK (rating BETWEEN 1 AND 5),
        text_review TEXT,
        user_id INT NOT NULL,
        item_id INT NOT NULL,
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
        FOREIGN KEY (item_id) REFERENCES items(id) ON DELETE CASCADE,
        UNIQUE (user_id, item_id)
        );`);
  } catch(error){
    console.log(error);
  }
}

const seedTables = async() =>{
  try {
    await client.query(`
      INSERT INTO users (username, password)
      VALUES ('Antonio','1234' )
      `);
  } catch(error) {
    console.log(error);
  }
}

const init = async()=>{
  try {
    await client.connect();
    console.log(`client connected`)

    await dropTables();
    console.log(`TABLES DROP KICKED`)

    await createTables();
    console.log(`TABLES CREATED`)

    await seedTables();
    console.log(`Seeding Complete!`)

    await client.end();
    console.log(`Disconnected`)

  }catch(error){
    console.log(error);
  }
}

init();
