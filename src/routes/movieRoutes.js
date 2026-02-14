import express from "express";

const router = express.Router();

// home route - lists movies by default
router.get("/", (_, res) => {
  res.json({
    message: "welcome to the movies home page",
    timeStamp: new Date(Date.now()),
  });
});

export default router;
