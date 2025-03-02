from typing import Optional

from pydantic import BaseModel


class Token(BaseModel):
    """
    Schema for the JWT token response.
    """
    access_token: str
    token_type: str


class TokenData(BaseModel):
    """
    Schema for data stored in the token.
    """
    username: Optional[str] = None
