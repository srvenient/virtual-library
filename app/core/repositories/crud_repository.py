from abc import ABC, abstractmethod
from typing import Type, List, Optional, Generic

from typing_extensions import TypeVar

T = TypeVar("T")
ID = TypeVar("ID")

class CrudRepository(ABC, Generic[T, ID]):
    def __init__(self, model: Type[T]):
        self.model = model

    @abstractmethod
    def get(self, identifier: ID) -> Optional[T] | None:
        pass

    @abstractmethod
    def get_all(self) -> List[T] | None:
        pass

    @abstractmethod
    def create(self, obj_in: dict) -> T:
        pass

    @abstractmethod
    def update(self, obj: T, obj_in: dict) -> T | None:
        pass

    @abstractmethod
    def delete(self, obj: T):
        pass
