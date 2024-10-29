"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
router.get("/", (req, res) => {
    try {
        return res.status(200).send({ message: "ok bro" });
    }
    catch (error) {
        return res.status(400).send({ message: "not ok bro", error });
    }
});
exports.default = router;
