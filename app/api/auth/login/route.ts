import { sql } from "fortune/db";
import { InvalidLogin } from "fortune/shared/constants";
import { NextRequest } from "next/server";
import postgres from "postgres";
import bcrypt from "bcrypt";
import { createSession } from "fortune/db/session";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { username, password } = body;

  try {
    const user =
      await sql`select user_id, password from users where username = ${username}`;

    if (!user.length) {
      return InvalidLogin();
    }

    const isMatch = await bcrypt.compare(password, user[0].password);

    if (!isMatch) {
      return InvalidLogin();
    }

    createSession(user[0].user_id);

    return new Response("OK");
  } catch (error) {
    console.log(error);
    if (error instanceof postgres.PostgresError) {
      console.log(error.message);
    }
    throw error;
    return new Response("Unauthorized", { status: 401 });
  }
}
