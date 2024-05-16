"use strict";
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
app.post('/human', async (req, res) => {
    try {
        const { name, password, alter } = req.body;
        const human = new Human_1.Human({ name, password, alter });
        const result = await human.save();
        res.status(201).json(result);
    }
    catch (error) {
        res.status(500).json({ error: error });
    }
});
app.get('/human/:id', async (req, res) => {
    try {
        const human = await Human_1.Human.findById(req.params.id);
        if (!human) {
            return res.status(404).json({ error: 'Human not found' });
        }
        res.status(200).json(human);
    }
    catch (error) {
        res.status(500).json({ error: error });
    }
});
app.put('/human/:id', async (req, res) => {
    try {
        const { name, password, alter } = req.body;
        const human = await Human_1.Human.findByIdAndUpdate(req.params.id, { name, password, alter }, { new: true, runValidators: true });
        if (!human) {
            return res.status(404).json({ error: 'Human not found' });
        }
        res.status(200).json(human);
    }
    catch (error) {
        res.status(500).json({ error: error });
    }
});
app.delete('/human/:id', async (req, res) => {
    try {
        const human = await Human_1.Human.findByIdAndDelete(req.params.id);
        if (!human) {
            return res.status(404).json({ error: 'Human not found' });
        }
        res.status(200).json({ message: 'Human deleted successfully' });
    }
    catch (error) {
        res.status(500).json({ error: error });
    }
});
exports.default = app;
