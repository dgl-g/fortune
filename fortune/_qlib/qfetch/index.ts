import { ResponseError } from "../class";

export async function _qfetch(...options: Parameters<typeof fetch>) {
  const res = await fetch(...options);
  if (!res.ok) {
    const errorData = await res.json();
    throw new ResponseError(errorData.message, res);
  }
  return res;
}
