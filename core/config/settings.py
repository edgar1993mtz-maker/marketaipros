from pydantic import BaseSettings

class Settings(BaseSettings):
    SECRET_KEY: str
    DATABASE_URL: str
    REDIS_URL: str
    ENV: str = "dev"

    class Config:
        env_file = ".env"

settings = Settings()
