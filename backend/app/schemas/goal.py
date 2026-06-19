from pydantic import BaseModel


class GoalCreate(BaseModel):
    goal: str
    target_amount: float


class GoalUpdate(BaseModel):
    goal: str | None = None
    target_amount: float | None = None
    saved_amount: float | None = None
    is_achieved: bool | None = None


class GoalResponse(BaseModel):
    goal_id: int
    goal: str
    target_amount: float
    saved_amount: float
    is_achieved: bool

    class Config:
        from_attributes = True
