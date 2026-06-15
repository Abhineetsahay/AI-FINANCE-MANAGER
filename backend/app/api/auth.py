from fastapi import APIRouter
from fastapi import Depends
from fastapi import HTTPException

from sqlalchemy.orm import Session

from app.core.database import get_db

from app.schemas.auth import RegisterRequest, LoginRequest, TokenResponse, UserResponse

from app.services.auth_services import AuthService

from app.dependencies.auth import get_current_user

router = APIRouter(prefix="/auth", tags=["Authentication"])


@router.post("/register", response_model=UserResponse)
def register(payload: RegisterRequest, db: Session = Depends(get_db)):

    try:
        user = AuthService.register(
            db=db,
            username=payload.username,
            email=payload.email,
            password=payload.password,
            user_income=payload.user_income,
        )

        return user

    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))


@router.post("/login", response_model=TokenResponse)
def login(payload: LoginRequest, db: Session = Depends(get_db)):

    try:
        token = AuthService.login(db=db, email=payload.email, password=payload.password)

        return {"access_token": token}

    except ValueError as e:
        raise HTTPException(status_code=401, detail=str(e))


@router.get("/me", response_model=UserResponse)
def me(current_user=Depends(get_current_user)):
    return current_user
