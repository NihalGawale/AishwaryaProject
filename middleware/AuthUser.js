import jwt from "jsonwebtoken";

export const dynamic = "force-dynamic";

const AuthUser = async (req) => {
  console.log(req,"RRRRRRRRR");
  const token = req.headers.get("Authorization")?.split(" ")[1];
  console.log(token,"TTTTTTT");
  if (!token) return false;

  try {
    const extractAuthUserInfo = jwt.verify(token, "jwt_secret_key");
    if (extractAuthUserInfo) return extractAuthUserInfo;
  } catch (e) {
    console.log(e);
    return false;
  }
};

export default AuthUser;