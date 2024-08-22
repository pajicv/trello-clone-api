"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const knex_1 = __importDefault(require("knex"));
const knex_init_1 = __importDefault(require("../knex-init"));
const environment = process.env.NODE_ENV || 'development';
const config = knex_init_1.default[environment];
const db = (0, knex_1.default)(config);
exports.default = db;
