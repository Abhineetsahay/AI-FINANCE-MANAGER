from fastapi import APIRouter
from fastapi import Depends

from sqlalchemy.orm import Session
from app.core.database import get_db
from app.dependencies.auth import get_current_user
from app.schemas.chat import ChatRequest, ChatResponse
from app.services.chat_service import ChatService

router = APIRouter(prefix="/chat", tags=["AI Chat"])


@router.post("", response_model=ChatResponse)
def chat(
    payload: ChatRequest,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user),
):

    response = ChatService.ask_question(db, current_user.id, payload.question)

    return {"response": response}


@router.get("/history")
def history(db: Session = Depends(get_db), current_user=Depends(get_current_user)):

    return ChatService.get_history(db, current_user.id)


@router.delete("/history")
def clear_history(
    db: Session = Depends(get_db), current_user=Depends(get_current_user)
):

    ChatService.clear_history(db, current_user.id)

    return {"message": "History cleared"}
