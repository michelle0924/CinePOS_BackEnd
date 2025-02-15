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
const jwt = require('jsonwebtoken');
const error_1 = __importDefault(require("../service/error"));
const usersModels_1 = __importDefault(require("../models/common/usersModels"));
class AuthService {
    constructor() {
        this.sendBackJWT = (reqData, res, statusCode) => {
            console.log(reqData._id);
            let data = {
                id: reqData._id,
                staffId: reqData.staffId,
            };
            const token = jwt.sign(data, process.env.JWT_SECRET, {
                expiresIn: process.env.JWT_EXPIRES_DAY
            });
            res.status(statusCode).json({
                code: 1,
                message: "已成功登入!",
                data: {
                    staffId: reqData.staffId,
                    name: reqData.name,
                    token
                }
            });
        };
        this.isEmpAuth = error_1.default.handleErrorAsync((req, res, next) => __awaiter(this, void 0, void 0, function* () {
            console.log('req', req);
            let token;
            if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
                token = req.headers.authorization.split(' ')[1];
                console.log('目前使用的token', token);
            }
            else {
                return next(error_1.default.appError(401, "請重新登入！", next));
            }
            ;
            const decodedClientData = yield new Promise((resolve, reject) => {
                jwt.verify(token, process.env.JWT_SECRET, (err, payload) => {
                    if (err) {
                        reject(err);
                    }
                    else {
                        console.log('payload', payload);
                        resolve(payload);
                    }
                    ;
                });
            });
            console.log('decodedClientData', decodedClientData);
            if (decodedClientData.staffId) {
                req.JWTInfo = decodedClientData;
                next();
            }
            else {
                return next(error_1.default.appError(403, "請重新登入！", next));
            }
            ;
        }));
        this.isOwnerAuth = error_1.default.handleErrorAsync((req, res, next) => __awaiter(this, void 0, void 0, function* () {
            let { staffId } = req.body;
            staffId = staffId !== null && staffId !== void 0 ? staffId : (req.params.staffId || req.query.staffId);
            console.log('staffId', staffId, 'req.JWTInfo', req.JWTInfo);
            if (req.JWTInfo.staffId === staffId) {
                const currentUser = yield usersModels_1.default.findOne({ staffId: req.JWTInfo.staffId });
                console.log('currentUser', currentUser);
                req.user = currentUser;
                next();
            }
            else {
                return next(error_1.default.appError(403, "非本人帳號，請重新登入！", next));
            }
            ;
        }));
    }
}
exports.default = new AuthService();
