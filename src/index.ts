import { Client } from "pg";

const client = new Client({
  connectionString: "postgres://postgres:mysecretpassword@localhost/postgres",
});

async function createUserTable() {
  await client.connect();
  const result = await client.query(`
    CREATE TABLE users (
        id SERIAL PRIMARY KEY,
        username VARCHAR(50) UNIQUE NOT NULL,
        password VARCHAR(50) NOT NULL,
        email VARCHAR(50) UNIQUE NOT NULL,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
    );
    `);
  console.log(result);
}

//createUserTable();

async function insertUserData(
  username: string,
  password: string,
  email: string
) {
  await client.connect();
  const result = await client.query(
    `
        INSERT INTO users (username, password, email)
        VALUES ($1,$2,$3) 
    `,
    [username, password, email]
  );

  console.log(result);
}
insertUserData("user3", "123545", "abcde@gmail.com");
