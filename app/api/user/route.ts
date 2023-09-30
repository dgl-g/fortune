import { NextResponse } from "next/server";
import { sql } from "fortune/db";
import postgres from "postgres";
import { v4 as uuidv4 } from "uuid";

const bcrypt = require("bcrypt");

export async function POST(request: Request) {
  const saltRounds = 10;

  const body = await request.json();

  const { firstName, lastName, userName, password } = body;

  const salt = bcrypt.genSaltSync(saltRounds);
  const hashedPassword = bcrypt.hashSync(password, salt);

  try {
    interface User {
      id: number;
      name: string;
    }
    const _user = {
      first_name: firstName,
      user_id: uuidv4(),
      last_name: lastName,
      username: userName,
      password: hashedPassword,
    };

    const res = await sql`insert into users ${sql(
      _user,
      "first_name",
      "user_id",
      "last_name",
      "username",
      "password"
    )}`;

    // const columns = ["firstName", "lastName", "userName", "password"];

    // const res = await sql`
    //   insert into users ${sql(user, columns)}
    // `;

    return NextResponse.json({ _user });
  } catch (error) {
    if (error instanceof postgres.PostgresError) {
      if (error.code === "23505") {
        return NextResponse.json(
          { message: "Duplicate Username" },
          { status: 400 }
        );
      } else {
        return NextResponse.json({ message: error.message }, { status: 400 });
      }
    }
  }
}
