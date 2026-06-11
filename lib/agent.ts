import { Agent, AIModel } from "eidentic";
import { LibsqlStore } from "@eidentic/libsql";
import { openai } from "@ai-sdk/openai";

const store = new LibsqlStore("file:eidentic.db");
await store.migrate();

export const agent = new Agent({
  id: "chat-agent",
  instructions:
    "You are a helpful assistant with memory of the conversation. " +
    "Refer back to earlier topics when relevant.",
  model: new AIModel(openai("gpt-4o-mini")),
  store,
});
