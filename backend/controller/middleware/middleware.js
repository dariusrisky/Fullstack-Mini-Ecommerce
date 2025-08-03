const jwt = require("jsonwebtoken");
const { prisma } = require("../utils/prismaClient");
const { Role } = require("@prisma/client");

// AUTENTIKASI DIPISAH DULU BELUM MENEMUKAN CARA NYA YANG WORKSSS
// OUTPUT req.user
//     {
//     "msg": "Store user verified successfully.",
//     "user": {
//         "id": "cmdjrwsor0000wjt8t2392efx",
//         "email": "admin@admin",
//         "name": "admin",
//         "password": "$2b$10$IZ93IYkBMSAfOYAM29BlueVBjpy8xFrQr4mb.lJy5N1lRdp.VEfwe",
//         "createdAt": "2025-07-26T04:51:57.627Z",
//         "updatedAt": "2025-07-26T05:01:20.179Z",
//         "SESION_TOKEN": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJjbWRqcndzb3IwMDAwd2p0OHQyMzkyZWZ4IiwiaWF0IjoxNzUzNTA2MDgwLCJleHAiOjE3NTQxMTA4ODB9.WlRQXjFXeGSuzddPVQ-GopchVd-yThT3MMOQK96gotk",
//         "role": "TOKO"
//     }
// }

async function authMiddlewareUser(req, res, next) {
  try {
    const getToken = req.headers.authorization;
    let token = getToken.split(" ")[1];

    const jwtVerify = jwt.verify(token, process.env.ACCESSTOKEN_SECRET_KEY);
    if (!jwtVerify)
      return res.status(404).json({ msg: "Is not the accesstoken" });

    const user = await prisma.user.findUnique({
      where: { id: jwtVerify.userId },
    });

    req.user = user;

    // return res.status(200).json(jwtVerify);

    next();
  } catch (error) {
    console.log(error);
    return res.status(501).json({ msg: "youre not verified" });
  }
}

async function authMiddlewareToko(req, res, next) {
  try {
    const getToken = req.headers.authorization;
    let token = getToken.split(" ")[1];

    if (!token) {
      return res.status(401).json({ msg: "No token provided." });
    }
    const verif = jwt.verify(token, process.env.ACCESSTOKEN_SECRET_KEY);
    if (!verif) {
      return res.status(403).json({ msg: "Invalid token." });
    }
    const user = await prisma.user.findUnique({
      where: { id: verif.userId, role: Role.TOKO },
    });

    if (!user) {
      return res.status(404).json({ msg: "User is not TOKO." });
    }

    req.user = user;

    // return res.status(200).json({ msg: "Store user verified successfully." });
    next();
  } catch (error) {
    console.error("Error in storeChecker middleware:", error);
    return res.status(500).json({ msg: "Internal server error." });
  }
}

// {
//     "email": "buyer"
//     ,"password": "buyer123"
// }

module.exports = { authMiddlewareToko, authMiddlewareUser };
