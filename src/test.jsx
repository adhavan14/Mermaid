import { StateGraph, START, END } from "@langchain/langgraph";

const g = new StateGraph(State)
  .addNode("classify", classify)
  .addNode("lookup", lookupOrder)
  .addNode("reply", reply)
  .addEdge(START, "classify")
  .addConditionalEdges("classify", route,
     { order: "lookup", other: "reply" })
  .addEdge("lookup", "reply")
  .addEdge("reply", END);

export const app = g.compile({ name: "support-agent" });
