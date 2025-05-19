"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const grammy_1 = require("grammy");
require("dotenv/config");
const bot = new grammy_1.Bot(`${process.env.TELEGRAM_BOT_TOKEN}`);
let timer;
let time = 0;
let totalMinutes = 0;
// Initial menu
const start = new grammy_1.InlineKeyboard()
    .text("Remind 💧", "remind")
    .text("Stop ❌", "stop")
    .row()
    .text("Time ⏰", "time")
    .text("Update 🔄", "update");
bot.command("start", async (ctx) => {
    await ctx.reply("Welcome back! 👋 Set your reminder preferences:", {
        reply_markup: start,
    });
});
// Remind menu
const remind = new grammy_1.InlineKeyboard()
    .text("Select a time ⏲️", "select_time")
    .text("Stop ❌", "stop")
    .row()
    .text("Time ⏰", "time")
    .text("Update 🔄", "update");
// Start command or any message
bot.hears(/^\d+\s*(h|m)$/i, async (ctx) => {
    clearInterval(timer);
    console.log("Received time");
    const message = ctx.message?.text?.trim();
    if (message) {
        const match = message.match(/^(\d+)\s*(h|m)$/i);
        console.log(match);
        if (match) {
            const value = parseInt(match[1]); // e.g., 30
            console.log(value);
            const unit = match[2].toLowerCase(); // e.g., "m"
            console.log(unit);
            // Example calculation: Convert everything to minutes
            totalMinutes = unit === "h" ? value * 60 : value;
            time = totalMinutes;
            timer = setInterval(async () => {
                if (time !== 0) {
                    time -= 1;
                }
                else {
                    await ctx.reply("It's time to take sip");
                    time = totalMinutes;
                }
            }, 1000 * 60);
            await ctx.reply(`Timer set for ${totalMinutes >= 60 ? Math.floor(totalMinutes / 60) : `00:${totalMinutes}`} hr`);
            await ctx.reply("Set your reminder preferences:", {
                reply_markup: remind,
            });
        }
        else {
            await ctx.reply("Invalid format. Please enter like `30m` or `1 h`.");
        }
    }
    await ctx.reply(`Got time duration: ${totalMinutes >= 60 ? Math.floor(totalMinutes / 60) : `00:${totalMinutes}`}  hr`);
});
// Handle button clicks
bot.callbackQuery("remind", async (ctx) => {
    await ctx.answerCallbackQuery();
    console.log("remind");
    await ctx.reply("Set your reminder preferences:", {
        reply_markup: remind,
    });
});
bot.callbackQuery("select_time", async (ctx) => {
    await ctx.answerCallbackQuery();
    await ctx.reply("Please type the time you want to be reminded (e.g. 1h, 30m):");
});
// You can add more callback handlers
bot.callbackQuery("stop", async (ctx) => {
    await ctx.answerCallbackQuery();
    clearInterval(timer);
    totalMinutes = 0;
    time = 0;
    await ctx.reply("Reminders stopped.");
    await ctx.reply("Set your reminder preferences:", {
        reply_markup: remind,
    });
});
bot.callbackQuery("time", async (ctx) => {
    await ctx.answerCallbackQuery();
    if (totalMinutes === 0) {
        await ctx.reply("Current reminder time: Not set yet.");
        await ctx.reply("Set your reminder preferences:", {
            reply_markup: remind,
        });
    }
    else {
        await ctx.reply(`Time Remaining ${time >= 60 ? Math.floor(time / 60) : "00"}:${time % 60} hr.`);
    }
});
bot.callbackQuery("update", async (ctx) => {
    await ctx.answerCallbackQuery();
    await ctx.reply("You can update your reminder settings now.");
});
bot.start();
