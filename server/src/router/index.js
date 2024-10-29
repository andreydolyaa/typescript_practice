import express from "express";

const router = express.Router();

router.get("/", (req, res) => {
  try {
    return res.status(200).send({ message: "ok bro" });
  } catch (error) {
    return res.status(400).send({ message: "not ok bro", error });
  }
});

export default router;
