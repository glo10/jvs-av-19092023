export default {
  create: `
    CREATE TABLE user
    (
      ID INTEGER PRIMARY KEY AUTOINCREMENT,
      lastname VARCHAR(70),
      firstname VARCHAR(70),
      email VARCHAR(50),
      password VARCHAR(72),
      age SMALLINT,
      country VARCHAR(100),
      city VARCHAR(100),
      city_latitude DECIMAL(5,8),
      city_longitude DECIMAL(5,8),
      CONSTRAINT uk_email UNIQUE(email)
    )`,
  isTableExist: `
    SELECT * 
    FROM sqlite_master
    WHERE name="user" AND type="table"`,
  select: `
    SELECT
    ID,
    lastname,
    firstname,
    email,
    password,
    age,
    country,
    city,
    city_latitude cityLatitude,
    city_longitude cityLongitude
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
      city,
      city_latitude,
      city_longitude
    )
    VALUES (?,?,?,?,?,?,?,?,?)`
}
