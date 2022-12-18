import { NextApiRequest, NextApiResponse } from "next";
import { getToken } from "next-auth/jwt";
import User from '../../models/user';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // If you don't have NEXTAUTH_SECRET set, you will have to pass your secret as `secret` to `getToken`
  const token = await getToken({ req })
  if (token) {
    const user = await User.findById(token.email);
    res.send("Signed in as a(n) " + user.role);
  } else {
    // Not Signed in
    res.status(401)
  }
  res.end()
}