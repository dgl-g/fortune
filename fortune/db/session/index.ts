"use server";

import { sql } from "..";
import { v4 as uuidv4, v5 as uuidv5 } from "uuid";

function calculateExpires(hoursToAdd: number) {
  const currentDate = new Date();
  currentDate.setHours(currentDate.getHours() + hoursToAdd);
  return currentDate.toISOString();
}

export async function getSessionByUid(user_id: string) {}

export async function getSessionBySessionId(session_id: string) {}
// const user =
//       await sql`select user_id, password from users where username = ${username}`;

export async function sessionIsValid(user_id: string) {
  const isValid = true;
  const active_expires = calculateExpires(0); // Current time
  const idle_expires = calculateExpires(2); // Current time + 2 hours
  const _session = {
    user_id: user_id,
    active_expires: active_expires,
    idle_expires: idle_expires,
  };

  const session = await sql`insert into sessions ${sql(
    _session,
    "user_id",
    "active_expires",
    "idle_expires"
  )}`;

  return session;
}

export async function createSession(user_id: string) {
  const active_expires = calculateExpires(0); // Current time
  const idle_expires = calculateExpires(2); // Current time + 2 hours
  const _session = {
    session_id: uuidv5(uuidv4(), user_id),
    user_id: user_id,
    active_expires: active_expires,
    idle_expires: idle_expires,
  };

  const session = await sql`insert into sessions ${sql(
    _session,
    "session_id",
    "user_id",
    "active_expires",
    "idle_expires"
  )}`;

  return session;
}
