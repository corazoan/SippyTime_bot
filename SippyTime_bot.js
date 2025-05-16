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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var grammy_1 = require("grammy");
require("dotenv/config");
var bot = new grammy_1.Bot("".concat(process.env.TELEGRAM_BOT_TOKEN));
var timer;
var time = 0;
var totalMinutes = 0;
// Initial menu
var start = new grammy_1.InlineKeyboard()
    .text("Remind 💧", "remind")
    .text("Stop ❌", "stop")
    .row()
    .text("Time ⏰", "time")
    .text("Update 🔄", "update");
bot.command("start", function (ctx) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, ctx.reply("Welcome back! 👋 Set your reminder preferences:", {
                    reply_markup: start,
                })];
            case 1:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); });
// Remind menu
var remind = new grammy_1.InlineKeyboard()
    .text("Select a time ⏲️", "select_time")
    .text("Stop ❌", "stop")
    .row()
    .text("Time ⏰", "time")
    .text("Update 🔄", "update");
// Start command or any message
bot.hears(/^\d+\s*(h|m)$/i, function (ctx) { return __awaiter(void 0, void 0, void 0, function () {
    var message, match, value, unit;
    var _a, _b;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                clearInterval(timer);
                console.log("Received time");
                message = (_b = (_a = ctx.message) === null || _a === void 0 ? void 0 : _a.text) === null || _b === void 0 ? void 0 : _b.trim();
                if (!message) return [3 /*break*/, 5];
                match = message.match(/^(\d+)\s*(h|m)$/i);
                console.log(match);
                if (!match) return [3 /*break*/, 3];
                value = parseInt(match[1]);
                console.log(value);
                unit = match[2].toLowerCase();
                console.log(unit);
                // Example calculation: Convert everything to minutes
                totalMinutes = unit === "h" ? value * 60 : value;
                time = totalMinutes;
                timer = setInterval(function () { return __awaiter(void 0, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                if (!(time !== 0)) return [3 /*break*/, 1];
                                time -= 1;
                                return [3 /*break*/, 3];
                            case 1: return [4 /*yield*/, ctx.reply("It's time to take sip")];
                            case 2:
                                _a.sent();
                                time = totalMinutes;
                                _a.label = 3;
                            case 3: return [2 /*return*/];
                        }
                    });
                }); }, 1000 * 60);
                return [4 /*yield*/, ctx.reply("Timer set for ".concat(totalMinutes > 60 ? totalMinutes / 60 : "00", ":").concat(totalMinutes % 60, " hr"))];
            case 1:
                _c.sent();
                return [4 /*yield*/, ctx.reply("Set your reminder preferences:", {
                        reply_markup: remind,
                    })];
            case 2:
                _c.sent();
                return [3 /*break*/, 5];
            case 3: return [4 /*yield*/, ctx.reply("Invalid format. Please enter like `30m` or `1 h`.")];
            case 4:
                _c.sent();
                _c.label = 5;
            case 5: return [4 /*yield*/, ctx.reply("Got time duration: ".concat(totalMinutes > 60 ? Math.floor(totalMinutes / 60) : "00", ":").concat(totalMinutes % 60, " hr"))];
            case 6:
                _c.sent();
                return [2 /*return*/];
        }
    });
}); });
// Handle button clicks
bot.callbackQuery("remind", function (ctx) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, ctx.answerCallbackQuery()];
            case 1:
                _a.sent();
                console.log("remind");
                return [4 /*yield*/, ctx.reply("Set your reminder preferences:", {
                        reply_markup: remind,
                    })];
            case 2:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); });
bot.callbackQuery("select_time", function (ctx) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, ctx.answerCallbackQuery()];
            case 1:
                _a.sent();
                return [4 /*yield*/, ctx.reply("Please type the time you want to be reminded (e.g. 1h, 30m):")];
            case 2:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); });
// You can add more callback handlers
bot.callbackQuery("stop", function (ctx) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, ctx.answerCallbackQuery()];
            case 1:
                _a.sent();
                clearInterval(timer);
                totalMinutes = 0;
                time = 0;
                return [4 /*yield*/, ctx.reply("Reminders stopped.")];
            case 2:
                _a.sent();
                return [4 /*yield*/, ctx.reply("Set your reminder preferences:", {
                        reply_markup: remind,
                    })];
            case 3:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); });
bot.callbackQuery("time", function (ctx) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, ctx.answerCallbackQuery()];
            case 1:
                _a.sent();
                if (!(totalMinutes === 0)) return [3 /*break*/, 4];
                return [4 /*yield*/, ctx.reply("Current reminder time: Not set yet.")];
            case 2:
                _a.sent();
                return [4 /*yield*/, ctx.reply("Set your reminder preferences:", {
                        reply_markup: remind,
                    })];
            case 3:
                _a.sent();
                return [3 /*break*/, 6];
            case 4: return [4 /*yield*/, ctx.reply("Time Remaining ".concat(time > 60 ? Math.floor(time / 60) : "00", ":").concat(time % 60, " hr."))];
            case 5:
                _a.sent();
                _a.label = 6;
            case 6: return [2 /*return*/];
        }
    });
}); });
bot.callbackQuery("update", function (ctx) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, ctx.answerCallbackQuery()];
            case 1:
                _a.sent();
                return [4 /*yield*/, ctx.reply("You can update your reminder settings now.")];
            case 2:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); });
bot.start();
