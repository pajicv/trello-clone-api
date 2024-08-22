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
const express_1 = require("express");
const db_1 = __importDefault(require("../db"));
const router = (0, express_1.Router)();
// Get all tasks
router.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const tasks = yield (0, db_1.default)('tasks')
        .join('statuses', 'tasks.status_id', 'statuses.id')
        .join('users', 'tasks.assigned_user_id', 'users.id')
        .select('tasks.*', 'statuses.name as status', 'users.username as assigned_user');
    res.json(tasks);
}));
// Get a single task
router.get('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const task = yield (0, db_1.default)('tasks')
        .where('tasks.id', req.params.id)
        .join('statuses', 'tasks.status_id', 'statuses.id')
        .join('users', 'tasks.assigned_user_id', 'users.id')
        .select('tasks.*', 'statuses.name as status', 'users.username as assigned_user')
        .first();
    res.json(task);
}));
// Create a new task
router.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { title, description, status_id, assigned_user_id } = req.body;
    const [task] = yield (0, db_1.default)('tasks')
        .insert({
        title,
        description,
        status_id,
        assigned_user_id,
    })
        .returning('*');
    res.status(201).json(task);
}));
// Update a task
router.put('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { title, description, status_id, assigned_user_id } = req.body;
    const [task] = yield (0, db_1.default)('tasks')
        .where('id', req.params.id)
        .update({
        title,
        description,
        status_id,
        assigned_user_id,
        updated_at: db_1.default.fn.now(),
    })
        .returning('*');
    res.json(task);
}));
// Delete a task
router.delete('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, db_1.default)('tasks').where('id', req.params.id).del();
    res.status(204).send();
}));
exports.default = router;
