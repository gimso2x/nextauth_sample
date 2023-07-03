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
      `SELECT
        name,password
      FROM
        users where name = '${id}'`
    );
    //   .then((data) => {
    //   if (bcrypt.compareSync(pw, data[0].password)) {
    //     return res.status(200).json(result);
    //   } else {
    //     throw new Error((result as any)?.error.message);
    //   }
    // });
    if ((result as any)?.error) throw new Error((result as any)?.error.message);
    console.log(33, JSON.parse(JSON.stringify(result))[0].password);
    // if (bcrypt.compareSync(pw, data[0].password)) {
    //   return res.status(200).json(result);
    // }
    if (!bcrypt.compareSync(pw, JSON.parse(JSON.stringify(result))[0].password))
      throw new Error((result as any)?.error.message);

    return res
      .status(200)
      .json({ code: 200, message: "로그인 성공하셨습니다" });
  } catch (error: any) {
    return res
      .status(500)
      .json({ code: 500, message: error?.message || "error" });
  }
}
