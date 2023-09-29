import { sql } from "fortune/db";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { username, password } = body;

  const user =
    await sql`select uid, password from users where username = ${username}`;

  console.log(user);

  return new Response("OK");
}
