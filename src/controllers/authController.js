import { prisma } from "../config/db.js";
import bcrypt from "bcryptjs";

// controller to registerr a new user
const register = async (req, res) => {
  const { name, email, password } = req.body;

  // we'll first check if the user already exists in our db
  const userExists = await prisma.user.findUnique({
    where: { email: email },
  });

  if (userExists) {
    return res.status(400).json({
      message: "User with this email already exists",
      timestamp: new Date(Date.now()),
    });
  }

  //if the user does not exists then...
  //we hash the password set by the user
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  // create user
  const user = await prisma.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
    },
  });

  res.status(201).json({
    status: "Success",
    data: {
      user: {
        id: user.id,
        name: name,
        email: email,
      },
    },
  });
};

export { register };
