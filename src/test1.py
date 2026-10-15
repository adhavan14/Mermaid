
from typing import Literal
from typing_extensions import TypedDict
from langgraph.graph import StateGraph, START, END


class State(TypedDict):
    query: str
    intent: str
    result: str


def classify(state: State):
    query = state["query"].lower()

    if "order" in query:
        return {"intent": "order"}

    return {"intent": "general"}


def lookup_order(state: State):
    return {"result": "Your order is shipped."}


def general_reply(state: State):
    return {"result": "How can I help you?"}


def route(state: State) -> Literal["lookup_order", "general_reply"]:
    if state["intent"] == "order":
        return "lookup_order"
    return "general_reply"


graph = StateGraph(State)
graph.add_node("classify", classify)
graph.add_node("lookup_order", lookup_order)
graph.add_node("general_reply", general_reply)

graph.add_edge(START, "classify")
graph.add_conditional_edges("classify", route)
graph.add_edge("lookup_order", END)
graph.add_edge("general_reply", END)

app = graph.compile(name="routing_agent")
