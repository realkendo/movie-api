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

// controller for user login
const login = async (req, res) => {
  const { name, email, password } = req.body;

  // checking if the email exists in our db
  const user = await prisma.user.findUnique({
    where: { email: email },
  });

  //if the user email isn't found
  if (!user) {
    return res.status(401).json({ error: "Invalid email or password" });
  }

  //if email matches one in db, we verify the password
  const isPasswordValid = await bcrypt.compare(password, user.password);

  //if password doesn't match
  // we send a generic error message
  // so we don't give a clue if it's the email or password that's wrong a security measure
  if (!isPasswordValid) {
    return res.status(401).json({ error: "Invalid email or password" });
  }

  res.status(200).json({
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

export { register, login };
