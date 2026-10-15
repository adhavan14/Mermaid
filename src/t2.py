
from langchain_openai import ChatOpenAI
from langchain_core.tools import tool
from langgraph.graph import StateGraph, START, END, MessagesState
from langgraph.prebuilt import ToolNode


@tool
def get_customer(customer_id: str) -> str:
    """Fetch a customer record."""
    return f"Customer record for {customer_id}"


tools = [get_customer]
llm = ChatOpenAI(model="gpt-4o").bind_tools(tools)


def call_model(state: MessagesState):
    return {"messages": [llm.invoke(state["messages"])]}


def route(state: MessagesState):
    return "guarded_tools" if state["messages"][-1].tool_calls else END


def validate_tool_calls(state: MessagesState):
    calls = state["messages"][-1].tool_calls

    for call in calls:
        if call["name"] == "get_customer":
            customer_id = call["args"].get("customer_id", "")

            if not customer_id.startswith("CUST-"):
                raise ValueError("Invalid customer ID")

    return {}


graph = StateGraph(MessagesState)
graph.add_node("call_model", call_model)
graph.add_node("validate_tool_calls", validate_tool_calls)
graph.add_node("tools", ToolNode(tools))

graph.add_edge(START, "call_model")
graph.add_conditional_edges("call_model", route)
graph.add_edge("validate_tool_calls", "tools")
graph.add_edge("tools", "call_model")

app = graph.compile(name="guarded_tool_agent")
