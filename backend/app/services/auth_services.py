from sqlalchemy.orm import Session

from app.models.user import User

from app.core.security import hash_password, verify_password, create_access_token


class AuthService:

    @staticmethod
    def register(
        db: Session, username: str, email: str, password: str, user_income: float
    ):

        existing_user = db.query(User).filter(User.email == email).first()

        if existing_user:
            raise ValueError("Email already registered")

        user = User(
            username=username,
            email=email,
            password=hash_password(password),
            user_income=user_income,
        )

        db.add(user)
        db.commit()
        db.refresh(user)

        return user

    @staticmethod
    def login(db: Session, email: str, password: str):

        user = db.query(User).filter(User.email == email).first()

        if not user:
            raise ValueError("Invalid credentials")
        print(user)
        if not verify_password(password, str(user.password)):
            raise ValueError("Invalid credentials")

        token = create_access_token({"sub": str(user.id)})

        return token
