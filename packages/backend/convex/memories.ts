import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

// Save or update a memory for a user and date
export const saveMemory = mutation({
  args: {
    userId: v.string(),
    date: v.string(), // e.g. '2024-06-09'
    places: v.array(v.any()),
    chat: v.array(v.any()),
  },
  handler: async (ctx, { userId, date, places, chat }) => {
    const existing = await ctx.db
      .query("memories")
      .withIndex("by_userId_date", q => q.eq("userId", userId).eq("date", date))
      .first();
    if (existing) {
      await ctx.db.patch(existing._id, { places, chat });
      return existing._id;
    }
    return await ctx.db.insert("memories", { userId, date, places, chat });
  },
});

export const getMemories = query({
  args: { userId: v.string() },
  handler: async (ctx, { userId }) => {
    return await ctx.db
      .query("memories")
      .withIndex("by_userId_date", q => q.eq("userId", userId))
      .order("desc")
      .collect();
  },
});

export const getMemoryByDate = query({
  args: { userId: v.string(), date: v.string() },
  handler: async (ctx, { userId, date }) => {
    return await ctx.db
      .query("memories")
      .withIndex("by_userId_date", q => q.eq("userId", userId).eq("date", date))
      .first();
  },
});

// Delete a memory by ID
export const deleteMemory = mutation({
  args: { memoryId: v.id("memories") },
  handler: async (ctx, { memoryId }) => {
    await ctx.db.delete(memoryId);
  },
});

// Edit a memory's places and chat
export const editMemory = mutation({
  args: {
    memoryId: v.id("memories"),
    places: v.array(v.any()),
    chat: v.array(v.any()),
  },
  handler: async (ctx, { memoryId, places, chat }) => {
    await ctx.db.patch(memoryId, { places, chat });
  },
}); 