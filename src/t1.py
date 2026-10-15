
from langchain_openai import ChatOpenAI
from langgraph.graph import StateGraph, START, END, MessagesState


llm = ChatOpenAI(model="gpt-4o")


def input_guard(state: MessagesState):
    message = state["messages"][-1]

    # Replace with AgentGuard input validation.
    if "reveal secrets" in message.content.lower():
        raise ValueError("Input blocked by guardrail")

    return {}


def call_model(state: MessagesState):
    response = llm.invoke(state["messages"])
    return {"messages": [response]}


def output_guard(state: MessagesState):
    response = state["messages"][-1]

    # Replace with AgentGuard output validation.
    if "api_key=" in response.content.lower():
        raise ValueError("Output blocked by guardrail")

    return {}


graph = StateGraph(MessagesState)
graph.add_node("input_guard", input_guard)
graph.add_node("call_model", call_model)
graph.add_node("output_guard", output_guard)

graph.add_edge(START, "input_guard")
graph.add_edge("input_guard", "call_model")
graph.add_edge("call_model", "output_guard")
graph.add_edge("output_guard", END)

guarded_agent = graph.compile(name="guarded_agent")
