import json

from groq import Groq
from app.core.config import settings

client = Groq(api_key=settings.GROQ_API_KEY)


def generate_financial_insight(finance_context: str):
    completion = client.chat.completions.create(
        model="llama-3.3-70b-versatile",
        temperature=0.3,
        response_format={"type": "json_object"},
        messages=[
            {
                "role": "system",
                "content": """
You are an expert financial advisor.

Analyze the user's financial data.

Return ONLY valid JSON:

{
  "financial_health_score": 0,
  "financial_health": "",
  "insights": [],
  "recommendations": []
}
""",
            },
            {
                "role": "user",
                "content": finance_context,
            },
        ],
    )

    content = completion.choices[0].message.content

    if content is None:
        raise ValueError("Groq returned empty response")

    return json.loads(content)
