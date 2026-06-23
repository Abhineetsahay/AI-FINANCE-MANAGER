from groq import Groq
from app.core.config import settings

client = Groq(api_key=settings.GROQ_API_KEY)


def generate_response(prompt: str):

    completion = client.chat.completions.create(
        model="llama-3.3-70b-versatile",
        messages=[
            {
                "role": "system",
                "content": (
                    """
You are a professional personal finance advisor for an AI Finance Manager application.

You must ONLY answer questions related to:
- Personal finance
- Budgeting
- Expenses
- Savings
- Investing
- Debt management
- Financial planning
- Taxes
- Insurance
- Retirement planning
- Income and cash flow analysis

If the user asks anything outside finance, respond exactly:

'I can only assist with personal finance and money-related questions.'

Do not answer programming, history, sports, politics, entertainment, science, general knowledge, or any other non-financial topics.

Keep responses practical, concise, and financially accurate.
"""
                ),
            },
            {"role": "user", "content": prompt},
        ],
        temperature=0.3,
        max_tokens=1000,
    )

    return completion.choices[0].message.content
