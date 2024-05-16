"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const HelloService_1 = require("./HelloService");
const Human_1 = require("./Human");
const app = (0, express_1.default)();
const port = 3000;
const helloService = new HelloService_1.HelloService();
// Middleware to parse JSON bodies
app.use(body_parser_1.default.json());
app.get('/', (req, res) => {
    const message = helloService.getHelloMessage();
    res.json({ message: message });
});
app.post('/human', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, password, alter } = req.body;
        const human = new Human_1.Human({ name, password, alter });
        const result = yield human.save();
        res.status(201).json(result);
    }
    catch (error) {
        res.status(500).json({ error: error });
    }
}));
app.get('/human/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const human = yield Human_1.Human.findById(req.params.id);
        if (!human) {
            return res.status(404).json({ error: 'Human not found' });
        }
        res.status(200).json(human);
    }
    catch (error) {
        res.status(500).json({ error: error });
    }
}));
app.put('/human/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, password, alter } = req.body;
        const human = yield Human_1.Human.findByIdAndUpdate(req.params.id, { name, password, alter }, { new: true, runValidators: true });
        if (!human) {
            return res.status(404).json({ error: 'Human not found' });
        }
        res.status(200).json(human);
    }
    catch (error) {
        res.status(500).json({ error: error });
    }
}));
app.delete('/human/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const human = yield Human_1.Human.findByIdAndDelete(req.params.id);
        if (!human) {
            return res.status(404).json({ error: 'Human not found' });
        }
        res.status(200).json({ message: 'Human deleted successfully' });
    }
    catch (error) {
        res.status(500).json({ error: error });
    }
}));
exports.default = app;
