import { NextResponse } from "next/server";

export const InvalidLogin = () => {
  return NextResponse.json(
    { message: "Invalid Login Credentials" },
    { status: 401 }
  );
};

export const UNAUTHORIZED_RESPONSE = {
  json: {
    message: "Unauthorized",
  },
  status: 401,
};
