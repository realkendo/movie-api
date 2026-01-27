import express from "express";

const router = express.Router();

router.get("/", (_, res) => {
  res.json({
    message: "welcome to the home page",
    timeStamp: new Date(Date.now()),
  });
});

export default router;
