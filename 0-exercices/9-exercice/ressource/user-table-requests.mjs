export default {
  create: `
    CREATE TABLE IF NOT EXISTS user
      (
        "ID" INTEGER PRIMARY KEY,
        "lastname" VARCHAR(70),
        "firstname" VARCHAR(70),
        "email" VARCHAR(50),
        "password" VARCHAR(72),
        "age" SMALLINT,
        "country" VARCHAR(100),
        "city" VARCHAR(100),
        CONSTRAINT uk_email UNIQUE(email)
      )`,
  isTableExist: `
      SELECT * 
      FROM sqlite_master
      WHERE name="user" AND type="table"`,
  select: `
    SELECT "email", "password"
    FROM user
    WHERE email=? AND password=?`,
  isUserExist: `
    SELECT
      lastname,
      firstname,
      email,
      age,
      country,
      city
    FROM user
    WHERE email = ?
  `,
  insert: `
    INSERT INTO user(
      lastname,
      firstname,
      email,
      password,
      age,
      country,
      city
    )
    VALUES (?,?,?,?,?,?,?)`
}
