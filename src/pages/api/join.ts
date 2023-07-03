// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import executeQuery from "@/db";
import type { NextApiRequest, NextApiResponse } from "next";
import bcrypt from "bcrypt";
const saltRounds = 10;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { id, pw } = req.body;

  try {
    const result = await executeQuery(
      { database: "mysql", host: "127.0.0.1" },
      `INSERT INTO users
      VALUES
        (
          NULL,
          ${id},
          "${bcrypt.hashSync(pw, saltRounds)}",
        curdate(),
        curdate())`
    );
    if ((result as any)?.error) throw new Error((result as any)?.error.message);
    console.log(result);

    return res
      .status(200)
      .json({ code: "200", message: "가입완료되었습니다." });
  } catch (error: any) {
    return res
      .status(500)
      .json({ code: "500", message: error?.message || "error" });
  }
}
