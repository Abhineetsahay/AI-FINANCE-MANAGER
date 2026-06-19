def build_prompt(user, expenses, budgets, goals, question: str):

    expense_text = "\n".join(
        [f"- {e.category}: ₹{e.amount} on {e.expense_date}" for e in expenses]
    )

    budget_text = "\n".join(
        [f"- {b.category}: Limit ₹{b.monthly_limit}" for b in budgets]
    )

    goal_text = "\n".join(
        [f"- {g.goal}: Saved ₹{g.saved_amount} / ₹{g.target_amount}" for g in goals]
    )

    return f"""
You are an AI Financial Advisor.

User Monthly Income:
₹{user.user_income}

Expenses:
{expense_text}

Budgets:
{budget_text}

Goals:
{goal_text}

Rules:
1. Only answer using the provided data.
2. Give practical financial advice.
3. Be concise.
4. Use rupees.
5. If insufficient data exists, mention it.

User Question:
{question}
"""
