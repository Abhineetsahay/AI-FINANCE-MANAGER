from sqlalchemy.orm import Session
from app.models.goals import Goal

class GoalService:
    @staticmethod
    def create_goal(db, user_id, data):
        goal = Goal(
            user_id=user_id,
            goal=data.goal,
            target_amount=data.target_amount,
            saved_amount=0,
        )

        db.add(goal)
        db.commit()
        db.refresh(goal)

        return goal

    @staticmethod
    def get_goals(db: Session, user_id: int):

        return db.query(Goal).filter(Goal.user_id == user_id).all()

    @staticmethod
    def get_goal(db, goal_id, user_id):

        return (
            db.query(Goal)
            .filter(Goal.goal_id == goal_id, Goal.user_id == user_id)
            .first()
        )

    @staticmethod
    def update_goal(db, goal, data):

        for key, value in data.model_dump(exclude_unset=True).items():
            setattr(goal, key, value)

        if goal.saved_amount >= goal.target_amount:
            goal.is_achieved = True

        db.commit()
        db.refresh(goal)

        return goal

    @staticmethod
    def delete_goal(db, goal):

        db.delete(goal)
        db.commit()

    @staticmethod
    def progress(goal):

        return {
            "goal": goal.goal,
            "target": goal.target_amount,
            "saved": goal.saved_amount,
            "progress_percentage": round(
                (goal.saved_amount / goal.target_amount) * 100, 2
            ),
        }
