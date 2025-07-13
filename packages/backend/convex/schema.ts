import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  notes: defineTable({
    userId: v.string(),
    title: v.string(),
    content: v.string(),
    summary: v.optional(v.string()),
  }),
  memories: defineTable({
    userId: v.string(),
    date: v.string(),
    places: v.array(v.any()),
    chat: v.array(v.any()),
  }).index("by_userId_date", ["userId", "date"]),
});
