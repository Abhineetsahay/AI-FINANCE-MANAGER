from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.core.database import get_db
from app.dependencies.auth import get_current_user

from app.schemas.goal import GoalCreate, GoalUpdate, GoalResponse

from app.services.goal_service import GoalService

router = APIRouter(prefix="/goals", tags=["Goals"])


@router.post("", response_model=GoalResponse)
def create_goal(
    payload: GoalCreate,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user),
):

    return GoalService.create_goal(db, current_user.id, payload)


@router.get("", response_model=list[GoalResponse])
def get_goals(db: Session = Depends(get_db), current_user=Depends(get_current_user)):

    return GoalService.get_goals(db, current_user.id)


@router.put("/{goal_id}")
def update_goal(
    goal_id: int,
    payload: GoalUpdate,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user),
):

    goal = GoalService.get_goal(db, goal_id, current_user.id)

    if not goal:
        raise HTTPException(status_code=404, detail="Goal not found")

    return GoalService.update_goal(db, goal, payload)


@router.delete("/{goal_id}")
def delete_goal(
    goal_id: int, db: Session = Depends(get_db), current_user=Depends(get_current_user)
):

    goal = GoalService.get_goal(db, goal_id, current_user.id)

    if not goal:
        raise HTTPException(status_code=404, detail="Goal not found")

    GoalService.delete_goal(db, goal)

    return {"message": "Goal deleted"}


@router.get("/{goal_id}/progress")
def goal_progress(
    goal_id: int, db: Session = Depends(get_db), current_user=Depends(get_current_user)
):

    goal = GoalService.get_goal(db, goal_id, current_user.id)

    if not goal:
        raise HTTPException(status_code=404, detail="Goal not found")

    return GoalService.progress(goal)
