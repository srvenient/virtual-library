from student.models.models import StudentInDB
from student.services.auth_service import verify_password

fake_students_db = {
    "john@unimonserrate.edu.co": {
        "full_name": "John Doe",
        "email": "john@unimonserrate.edu.co",
        "phone_number": "1234567890",
        "disabled": False,
        "hashed_password": "$2a$12$Qh/VJwsQEHkgVJCJtxdxcOpjBj2P./MnomxpcQyzrjwQOX8tyCsqq"
    },
    "jane@unimonserrate.edu.co": {
        "full_name": "Jane Doe",
        "email": "jane@unimonserrate.edu.co",
        "phone_number": "0987654321",
        "disabled": True,
        "hashed_password": "$2a$12$9FLfM.YmQ35GZoVUXvQD7OyTMVbh1DSF60mzRDk5QTONxEEcOpNF6"
    }
}

def get_student(username: str):
    student_data = fake_students_db.get(username)
    if student_data:
        return StudentInDB(**student_data)
    return None


def authenticate_student(db, username: str, password: str):
    student = db.get(username)
    if not student:
        return None
    student_in_db = StudentInDB(**student)
    if not verify_password(password, student_in_db.hashed_password):
        return None
    return student_in_db