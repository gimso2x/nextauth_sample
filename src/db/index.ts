import mysql from "serverless-mysql";

interface DatabaseInfoType {
  database: any;
  host: string | undefined;
}

export default async function executeQuery(
  databaseInfo: DatabaseInfoType,
  query: string
) {
  const db = mysql({
    config: {
      ...databaseInfo,
      port: +(process.env.MYSQL_PORT || 3306),
      user: process.env.MYSQL_USER,
      password: process.env.MYSQL_PASSWORD,
    },
  });

  try {
    const results = await db.query(query);
    await db.end();
    return results;
  } catch (error) {
    return { error };
  } finally {
    db.quit();
  }
}
