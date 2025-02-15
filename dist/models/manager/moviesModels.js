"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const moviesSchema = new mongoose_1.default.Schema({
    _id: {
        type: String,
        required: false,
        select: false,
    },
    id: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    enTitle: {
        type: String,
        required: false,
    },
    genre: {
        type: [{
                type: Number,
                enum: [1, 2, 3, 4, 5, 5, 6, 7, 8, 9, 10, 11, 12]
            }],
        required: true
    },
    runTime: {
        type: Number,
        required: true,
        min: 60,
        max: 240,
    },
    provideVersion: {
        type: [{
                type: Number,
                enum: [1, 2, 3, 4]
            }],
        required: true
    },
    rate: {
        type: Number,
        enum: [0, 6, 12, 15, 18],
        required: true
    },
    director: {
        type: String,
        required: false,
    },
    cast: {
        type: Array,
        required: false,
    },
    description: {
        type: String,
        required: false,
        minlength: 10,
        maxlength: 300,
    },
    status: {
        type: Number,
        enum: [-1, 0, 1],
        required: true
    },
    releaseDate: {
        type: Date,
        required: true,
    },
    trailerLink: {
        type: String,
        required: false,
        match: /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w.-]*)*\/?$/i
    },
    distributor: {
        type: String,
        required: false,
    },
    posterFile: {
        type: Buffer,
        required: false,
        select: false
    },
    posterUrl: {
        type: String,
        required: true,
        match: /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w.-]*)*\/?$/i
    },
    createdAt: {
        type: Date,
        required: true,
        select: false,
    },
    updatedAt: {
        type: Date,
        required: true,
        select: false,
    }
});
var Movie = mongoose_1.default.model('Movie', moviesSchema);
exports.default = Movie;
