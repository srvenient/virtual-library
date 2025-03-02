import os
from dotenv import load_dotenv

load_dotenv()

HOST = os.getenv("HOST", "localhost")
APP_PORT = int(os.getenv("APP_PORT", 8000))
DATABASE_URL = os.getenv("DATABASE_URL", "postgresql://library_owner:npg_jLdbhi7x1Ycv@ep-withered-fog-a8jq1uxt-pooler.eastus2.azure.neon.tech/library?sslmode=require")
ENV = os.getenv("ENVIRONMENT", "dev")
ALLOWED_ORIGINS = os.getenv("ALLOWED_ORIGINS", ["http://localhost:5173"])
SECRET_KEY = os.getenv("SECRET_KEY", "cbb6280f2ae62fa5c35b9bdfe9f9f074814f420aefd3d7c83841f0b4ecc58f60")
ALGORITHM = os.getenv("ALGORITHM", "HS256")
ACCESS_TOKEN_EXPIRE_MINUTES = int(os.getenv("ACCESS_TOKEN_EXPIRE_MINUTES", 30))
DEBUG_MODE = True
