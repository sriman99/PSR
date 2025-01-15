# from fastapi import FastAPI, Depends, HTTPException, status
# from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
# from passlib.context import CryptContext
# from jose import JWTError, jwt
# from pymongo import MongoClient
# from datetime import datetime, timedelta

# # Initialize FastAPI
# app = FastAPI()

# # MongoDB Setup
# client = MongoClient("mongodb://localhost:27017")
# db = client.carpool_system
# users_collection = db.users

# # Security Setup
# SECRET_KEY = "your_secret_key"
# ALGORITHM = "HS256"
# ACCESS_TOKEN_EXPIRE_MINUTES = 30
# pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
# oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/auth/login")

# # Utility Functions
# def hash_password(password: str) -> str:
#     return pwd_context.hash(password)

# def verify_password(plain_password: str, hashed_password: str) -> bool:
#     return pwd_context.verify(plain_password, hashed_password)

# def create_access_token(data: dict, expires_delta: timedelta | None = None):
#     to_encode = data.copy()
#     expire = datetime.utcnow() + (expires_delta or timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES))
#     to_encode.update({"exp": expire})
#     return jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)

# def decode_access_token(token: str):
#     try:
#         payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
#         return payload
#     except JWTError:
#         return None

# # Dependency
# def get_current_user(token: str = Depends(oauth2_scheme)):
#     payload = decode_access_token(token)
#     if not payload:
#         raise HTTPException(
#             status_code=status.HTTP_401_UNAUTHORIZED,
#             detail="Invalid or expired token",
#             headers={"WWW-Authenticate": "Bearer"},
#         )
#     user = users_collection.find_one({"email": payload.get("sub")})
#     if not user:
#         raise HTTPException(status_code=404, detail="User not found")
#     return user

# def get_current_admin(user: dict = Depends(get_current_user)):
#     if user.get("role") != "admin":
#         raise HTTPException(status_code=403, detail="Access forbidden")
#     return user

# # Routes
###################################>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
# @app.post("/auth/signup")
# def signup(name: str, email: str, password: str, role: str):
#     if users_collection.find_one({"email": email}):
#         raise HTTPException(status_code=400, detail="Email already registered")
#     hashed_password = hash_password(password)
#     user = {
#         "name": name,
#         "email": email,
#         "password": hashed_password,
#         "role": role,
#         "created_at": datetime.utcnow()
#     }
#     users_collection.insert_one(user)
#     return {"message": "User created successfully."}

# @app.post("/auth/login")
# def login(form_data: OAuth2PasswordRequestForm = Depends()):
#     user = users_collection.find_one({"email": form_data.username})
#     if not user or not verify_password(form_data.password, user["password"]):
#         raise HTTPException(status_code=400, detail="Invalid credentials")
#     access_token = create_access_token(data={"sub": user["email"]})
#     return {"access_token": access_token, "role": user["role"]}

# @app.get("/admin/features")
# def get_admin_features(admin: dict = Depends(get_current_admin)):
#     employees = list(users_collection.find({"role": "employee"}, {"password": 0}))
#     carpools = []  # Placeholder for carpool data
#     return {"employees": employees, "carpools": carpools}

# from fastapi import FastAPI, Depends, HTTPException, status, Request
# from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
# from passlib.context import CryptContext
# from jose import JWTError, jwt
# from pymongo import MongoClient
# from datetime import datetime, timedelta
# from pydantic import BaseModel, EmailStr
# import matplotlib.pyplot as plt
# import io
# import base64
# from fastapi.responses import JSONResponse
# from bson import ObjectId
# from fastapi.encoders import jsonable_encoder

# # Custom encoder for ObjectId
# def jsonable_encoder_with_objectid(obj, **kwargs):
#     if isinstance(obj, ObjectId):
#         return str(obj)
#     return jsonable_encoder(obj, **kwargs)

# # Use this encoder in your response


# # Initialize FastAPI
# app = FastAPI()

# # MongoDB Setup
# client = MongoClient("mongodb://localhost:27017")
# db = client.carpool_system
# users_collection = db.users
# routes_collection = db.routes

# # Security Setup
# SECRET_KEY = "your_secret_key"
# ALGORITHM = "HS256"
# ACCESS_TOKEN_EXPIRE_MINUTES = 30
# pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
# oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/auth/login")

# # Utility Functions
# def hash_password(password: str) -> str:
#     return pwd_context.hash(password)

# def verify_password(plain_password: str, hashed_password: str) -> bool:
#     return pwd_context.verify(plain_password, hashed_password)

# def create_access_token(data: dict, expires_delta: timedelta | None = None):
#     to_encode = data.copy()
#     expire = datetime.utcnow() + (expires_delta or timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES))
#     to_encode.update({"exp": expire})
#     return jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)

# def decode_access_token(token: str):
#     try:
#         payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
#         return payload
#     except JWTError:
#         return None

# # Dependency for current user
# def get_current_user(token: str = Depends(oauth2_scheme)):
#     payload = decode_access_token(token)
#     if not payload:
#         raise HTTPException(
#             status_code=status.HTTP_401_UNAUTHORIZED,
#             detail="Invalid or expired token",
#             headers={"WWW-Authenticate": "Bearer"},
#         )
#     user = users_collection.find_one({"email": payload.get("sub")})
#     if not user:
#         raise HTTPException(status_code=404, detail="User not found")
#     return user

# # Dependency for admin role
# def get_current_admin(user: dict = Depends(get_current_user)):
#     if user.get("role") != "admin":
#         raise HTTPException(status_code=403, detail="Access forbidden")
#     return user

# # Dependency for employee role
# def get_current_employee(user: dict = Depends(get_current_user)):
#     if user.get("role") != "employee":
#         raise HTTPException(status_code=403, detail="Access forbidden")
#     return user

# # Pydantic Models
# class UserCreate(BaseModel):
#     name: str
#     email: EmailStr
#     password: str
#     role: str

# class EmployeeUpdate(BaseModel):
#     name: str
#     email: EmailStr

# class RouteCreate(BaseModel):
#     route_name: str
#     start_location: str
#     end_location: str

# # Endpoints

# # Auth Endpoints
# @app.post("/auth/signup")
# def signup(user: UserCreate):
#     if users_collection.find_one({"email": user.email}):
#         raise HTTPException(status_code=400, detail="Email already registered")
#     hashed_password = hash_password(user.password)
#     new_user = {
#         "name": user.name,
#         "email": user.email,
#         "password": hashed_password,
#         "role": user.role,
#         "created_at": datetime.utcnow()
#     }
#     users_collection.insert_one(new_user)
#     return {"message": "User created successfully."}

# @app.post("/auth/login")
# def login(form_data: OAuth2PasswordRequestForm = Depends()):
#     user = users_collection.find_one({"email": form_data.username})
#     if not user or not verify_password(form_data.password, user["password"]):
#         raise HTTPException(status_code=400, detail="Invalid credentials")
#     access_token = create_access_token(data={"sub": user["email"]})
#     return {"access_token": access_token, "role": user["role"]}

# # Admin Endpoints (Protected by RBAC)
# @app.post("/admin/employees")
# def create_employee(employee: UserCreate, admin: dict = Depends(get_current_admin)):
#     if users_collection.find_one({"email": employee.email}):
#         raise HTTPException(status_code=400, detail="Employee already exists")
#     hashed_password = hash_password(employee.password)
#     new_employee = {
#         "name": employee.name,
#         "email": employee.email,
#         "password": hashed_password,
#         "role": "employee",
#         "created_at": datetime.utcnow()
#     }
#     users_collection.insert_one(new_employee)
#     return {"message": "Employee created successfully."}

# @app.get("/admin/employees")
# def get_employees(admin: dict = Depends(get_current_admin)):
#     employees = list(users_collection.find({"role": "employee"}, {"password": 0}))
#     return {"employees": employees}

# @app.put("/admin/employees/{employee_id}")
# def update_employee(employee_id: str, employee: EmployeeUpdate, admin: dict = Depends(get_current_admin)):
#     updated_data = {k: v for k, v in employee.dict().items() if v is not None}
#     result = users_collection.update_one({"_id": employee_id}, {"$set": updated_data})
#     if result.matched_count == 0:
#         raise HTTPException(status_code=404, detail="Employee not found")
#     return {"message": "Employee updated successfully."}

# # Route Management Endpoints
# @app.post("/admin/routes")
# def create_route(route: RouteCreate, admin: dict = Depends(get_current_admin)):
#     new_route = {
#         "route_name": route.route_name,
#         "start_location": route.start_location,
#         "end_location": route.end_location,
#         "created_at": datetime.utcnow()
#     }
#     routes_collection.insert_one(new_route)
#     return {"message": "Route created successfully."}

# @app.get("/admin/routes")
# def get_routes(admin: dict = Depends(get_current_admin)):
#     routes = list(routes_collection.find({}))
#     return {"routes": routes}

# @app.put("/admin/routes/{route_id}")
# def update_route(route_id: str, route: RouteCreate, admin: dict = Depends(get_current_admin)):
#     updated_data = {k: v for k, v in route.dict().items() if v is not None}
#     result = routes_collection.update_one({"_id": route_id}, {"$set": updated_data})
#     if result.matched_count == 0:
#         raise HTTPException(status_code=404, detail="Route not found")
#     return {"message": "Route updated successfully."}

# @app.delete("/admin/routes/{route_id}")
# def delete_route(route_id: str, admin: dict = Depends(get_current_admin)):
#     result = routes_collection.delete_one({"_id": route_id})
#     if result.deleted_count == 0:
#         raise HTTPException(status_code=404, detail="Route not found")
#     return {"message": "Route deleted successfully."}

# # Trends and Reports
# @app.get("/admin/reports/daily")
# def generate_report(admin: dict = Depends(get_current_admin)):
#     # Example of trend generation
#     data = [10, 20, 30, 40]  # Placeholder data
#     fig, ax = plt.subplots()
#     ax.plot(data)
#     buf = io.BytesIO()
#     plt.savefig(buf, format="png")
#     buf.seek(0)
#     img_str = base64.b64encode(buf.read()).decode("utf-8")
#     return {"report": img_str}

# # Complaints Management Endpoints
# @app.get("/admin/complaints")
# def get_complaints(admin: dict = Depends(get_current_admin)):
#     complaints = []  # Placeholder for complaints data
#     return {"complaints": complaints}

# @app.put("/admin/complaints/{complaint_id}")
# def resolve_complaint(complaint_id: str, admin: dict = Depends(get_current_admin)):
#     # Logic to resolve complaint
#     return {"message": "Complaint resolved."}

# # Error Handling for Unhandled Errors
# @app.exception_handler(HTTPException)
# async def custom_http_exception_handler(request: Request, exc: HTTPException):
#     return JSONResponse(
#         status_code=exc.status_code,
#         content={"message": f"Custom error: {exc.detail}"},
#     )

# # SMS and Email integration placeholders
# def send_sms(phone_number: str, message: str):
#     pass

# def send_email(email: str, subject: str, body: str):
#     pass

# from fastapi import FastAPI, Depends, HTTPException, status
# from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
# from passlib.context import CryptContext
# from jose import JWTError, jwt
# from pymongo import MongoClient
# from datetime import datetime, timedelta
# from pydantic import BaseModel, EmailStr
# from bson import ObjectId
# import matplotlib.pyplot as plt
# import io
# import base64
# import os
# from fastapi.middleware.cors import CORSMiddleware
# from fastapi.encoders import jsonable_encoder
# # Initialize FastAPI
# app = FastAPI()

# app.add_middleware(
#     CORSMiddleware,
#     allow_origins=["*"],
#     allow_credentials=True,
#     allow_methods=["*"],
#     allow_headers=["*"],
# )
# # MongoDB Setup
# client = MongoClient("mongodb://localhost:27017")
# db = client.carpool_system
# users_collection = db.users
# routes_collection = db.routes
# rides_collection = db.rides
# complaints_collection = db.complaints
# drivers_collection = db.drivers

# # Security Setup
# SECRET_KEY = os.getenv("SECRET_KEY", "your_secret_key")  # Load from env variable
# ALGORITHM = "HS256"
# ACCESS_TOKEN_EXPIRE_MINUTES = 30
# pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
# oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/auth/login")

# # Utility Functions
# def hash_password(password: str) -> str:
#     return pwd_context.hash(password)

# def verify_password(plain_password: str, hashed_password: str) -> bool:
#     return pwd_context.verify(plain_password, hashed_password)

# def create_access_token(data: dict, expires_delta: timedelta | None = None):
#     to_encode = data.copy()
#     expire = datetime.now(datetime.timezone.utc) + (expires_delta or timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES))
#     to_encode.update({"exp": expire})
#     return jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)

# def decode_access_token(token: str):
#     try:
#         payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
#         return payload
#     except JWTError:
#         raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid or expired token")

# # Dependency for current user
# def get_current_user(token: str = Depends(oauth2_scheme)):
#     payload = decode_access_token(token)
#     if not payload:
#         raise HTTPException(
#             status_code=status.HTTP_401_UNAUTHORIZED,
#             detail="Invalid or expired token",
#             headers={"WWW-Authenticate": "Bearer"},
#         )
#     user = users_collection.find_one({"email": payload.get("sub")})
#     if not user:
#         raise HTTPException(status_code=404, detail="User not found")
#     return user

# # Dependency for admin role
# def get_current_admin(user: dict = Depends(get_current_user)):
#     if user.get("role") != "admin":
#         raise HTTPException(status_code=403, detail="Access forbidden")
#     return user

# # Dependency for employee role
# def get_current_employee(user: dict = Depends(get_current_user)):
#     if user.get("role") != "employee":
#         raise HTTPException(status_code=403, detail="Access forbidden")
#     return user



# def transform_objectid(data):
#     if isinstance(data, list):
#         return [transform_objectid(item) for item in data]
#     elif isinstance(data, dict):
#         return {key: transform_objectid(value) for key, value in data.items()}
#     elif isinstance(data, ObjectId):
#         return str(data)
#     else:
#         return data
    

# # Pydantic Models
# class DriverCreate(BaseModel):
#     name: str
#     email: EmailStr
#     phone: str
#     license_number: str
    
# class UserCreate(BaseModel):
#     name: str
#     email: EmailStr
#     password: str
#     role: str

# class EmployeeUpdate(BaseModel):
#     name: str
#     email: EmailStr

# class RouteCreate(BaseModel):
#     route_name: str
#     start_location: str
#     end_location: str

# class RideCreate(BaseModel):
#     route_id: str
#     employee_id: str
#     start_time: datetime
#     end_time: datetime
#     status: str
#     cost: float

# class ComplaintCreate(BaseModel):
#     employee_id: str
#     route_id: str
#     complaint_text: str

# # Auth Endpoints
# @app.post("/auth/signup")
# def signup(user: UserCreate):
#     if users_collection.find_one({"email": user.email}):
#         raise HTTPException(status_code=400, detail="Email already registered")
#     hashed_password = hash_password(user.password)
#     new_user = {
#         "name": user.name,
#         "email": user.email,
#         "password": hashed_password,
#         "role": user.role,
#         "created_at": datetime.now(datetime.timezone.utc),
#         "updated_at": datetime.now(datetime.timezone.utc)
#     }
#     users_collection.insert_one(new_user)
#     return {"message": "User created successfully."}

# @app.post("/auth/login")
# def login(form_data: OAuth2PasswordRequestForm = Depends()):
#     user = users_collection.find_one({"email": form_data.username})
#     if not user or not verify_password(form_data.password, user["password"]):
#         raise HTTPException(status_code=400, detail="Invalid credentials")
#     access_token = create_access_token(data={"sub": user["email"]})
#     return {"access_token": access_token, "role": user["role"]}

# # Routes and Ride Endpoints
# @app.post("/admin/routes")
# def create_route(route: RouteCreate):
#     new_route = {
#         "route_name": route.route_name,
#         "start_location": route.start_location,
#         "end_location": route.end_location,
#         "created_at": datetime.now(datetime.timezone.utc),
#         "updated_at": datetime.now(datetime.timezone.utc)
#     }
#     routes_collection.insert_one(new_route)
#     return {"message": "Route created successfully."}

# @app.get("/admin/routes")
# def get_routes():
#     routes = list(routes_collection.find({}))
#     for route in routes:
#         route["_id"] = str(route["_id"])
#     return {"routes": routes}

# @app.get("/employee/routes")
# def get_available_routes():
#     routes = []
#     for route in routes_collection.find({}):
#         route_dict = {
#             "_id": str(route["_id"]),
#             "route_name": route["route_name"],
#             "start_location": route["start_location"],
#             "end_location": route["end_location"],
#             "created_at": route["created_at"],
#             "updated_at": route["updated_at"]
#         }
#         routes.append(route_dict)
#     return {"routes": routes}
# # @app.get("/employee/routes")
# # async def get_routes():
# #     try:
# #         routes = list(routes_collection.find({}))  # Fetch data from MongoDB
# #         routes = transform_objectid(routes)  # Convert ObjectId to string
# #         return jsonable_encoder(routes)
# #     except Exception as e:
# #         return {"error": str(e)}

# # Ride Management
# @app.post("/employee/rides")
# def create_ride(ride: RideCreate):
#     route = routes_collection.find_one({"_id": ObjectId(ride.route_id)})
#     if not route:
#         raise HTTPException(status_code=404, detail="Route not found")
#     ride_data = {
#         "route_id": ObjectId(ride.route_id),
#         "employee_id": ObjectId(ride.employee_id),
#         "start_time": ride.start_time,
#         "end_time": ride.end_time,
#         "status": ride.status,
#         "cost": ride.cost,
#         "created_at": datetime.utcnow(),
#         "updated_at": datetime.utcnow()
#     }
#     rides_collection.insert_one(ride_data)
#     return {"message": "Ride created successfully."}

# @app.get("/employee/rides")
# def get_employee_rides(employee: dict = Depends(get_current_employee)):
#     rides = list(rides_collection.find({"employee_id": employee["_id"]}))
#     return {"rides": rides}

# # Complaint Management
# @app.post("/employee/complaints")
# def create_complaint(complaint: ComplaintCreate):
#     complaint_data = {
#         "employee_id": ObjectId(complaint.employee_id),
#         "route_id": ObjectId(complaint.route_id),
#         "complaint_text": complaint.complaint_text,
#         "status": "pending", 
#         "created_at": datetime.utcnow(),
#         "updated_at": datetime.utcnow()
#     }
#     complaints_collection.insert_one(complaint_data)
#     return {"message": "Complaint created successfully."}

# @app.get("/admin/complaints")
# def get_complaints():
#     complaints = list(complaints_collection.find({}))
#     return {"complaints": complaints}

# @app.put("/admin/complaints/{complaint_id}")
# def resolve_complaint(complaint_id: str):
#     complaint = complaints_collection.find_one({"_id": ObjectId(complaint_id)})
#     if not complaint:
#         raise HTTPException(status_code=404, detail="Complaint not found")
#     complaints_collection.update_one(
#         {"_id": ObjectId(complaint_id)},
#         {"$set": {"status": "resolved", "updated_at": datetime.now(datetime.timezone.utc)}}
#     )
#     return {"message": "Complaint resolved successfully."}

# # Trend Reporting and Graph Generation
# @app.get("/admin/trends")
# def get_trends():
#     trends = []
#     for route in routes_collection.find({}):
#         ride_count = rides_collection.count_documents({"route_id": route["_id"]})
#         avg_cost = list(rides_collection.aggregate([
#             {"$match": {"route_id": route["_id"]}},
#             {"$group": {"_id": "$route_id", "avg_cost": {"$avg": "$cost"}}}
#         ]))
#         avg_cost = avg_cost[0]["avg_cost"] if avg_cost else 0
#         trends.append({
#             "route_name": route["route_name"],
#             "ride_count": ride_count,
#             "avg_cost": avg_cost
#         })
#     return {"trends": trends}

# @app.get("/admin/graph")
# def get_graph(admin: dict = Depends(get_current_admin)):
#     trends = get_trends(admin)
#     routes = [trend["route_name"] for trend in trends["trends"]]
#     ride_counts = [trend["ride_count"] for trend in trends["trends"]]
#     avg_costs = [trend["avg_cost"] for trend in trends["trends"]]

#     fig, ax = plt.subplots(2, 1, figsize=(10, 10))

#     ax[0].bar(routes, ride_counts, color="blue")
#     ax[0].set_title("Ride Count per Route")
#     ax[0].set_ylabel("Ride Count")

#     ax[1].bar(routes, avg_costs, color="green")
#     ax[1].set_title("Average Cost per Route")
#     ax[1].set_ylabel("Average Cost")

#     img_stream = io.BytesIO()
#     plt.savefig(img_stream, format="png")
#     img_stream.seek(0)
#     img_b64 = base64.b64encode(img_stream.read()).decode("utf-8")
#     plt.close(fig)

#     return {"graph": img_b64}

# # Employee submits driver details
# @app.post("/employee/submit-driver")
# def submit_driver(driver: DriverCreate, employee: dict = Depends(get_current_employee)):
#     if drivers_collection.find_one({"email": driver.email}):
#         raise HTTPException(status_code=400, detail="Driver already exists or is pending verification.")
#     new_driver = {
#         "name": driver.name,
#         "email": driver.email,
#         "phone": driver.phone,
#         "license_number": driver.license_number,
#         "submitted_by": employee["_id"],  # Track which employee submitted the driver
#         "status": "pending",  # Default status: pending
#         "created_at": datetime.utcnow(),
#         "updated_at": datetime.utcnow()
#     }
#     drivers_collection.insert_one(new_driver)
#     return {"message": "Driver details submitted successfully and pending admin approval."}

# # Admin views all submitted drivers
# @app.get("/admin/pending-drivers")
# def view_pending_drivers():
#     drivers = list(drivers_collection.find({"status": "pending"}))
#     for driver in drivers:
#         driver["_id"] = str(driver["_id"])
#     return {"pending_drivers": drivers}

# # Admin verifies or rejects a driver
# @app.put("/admin/verify-driver/{driver_id}")
# def verify_driver(driver_id: str, action: str):
#     driver = drivers_collection.find_one({"_id": ObjectId(driver_id)})
#     if not driver:
#         raise HTTPException(status_code=404, detail="Driver not found.")
#     if action not in ["verified", "rejected"]:
#         raise HTTPException(status_code=400, detail="Invalid action. Use 'verified' or 'rejected'.")
#     drivers_collection.update_one(
#         {"_id": ObjectId(driver_id)},
#         {"$set": {"status": action, "updated_at": datetime.now(datetime.timezone.utc)}}
#     )
#     return {"message": f"Driver has been {action}."}

# # Employee views available drivers when booking rides
# @app.get("/employee/available-drivers")
# def get_available_drivers():
#     drivers = list(drivers_collection.find({"status": "verified"}))
#     for driver in drivers:
#         driver["_id"] = str(driver["_id"])
#     return {"available_drivers": drivers}

# # Employees can book rides only with verified drivers
# @app.post("/employee/book-ride")
# def book_ride(ride: RideCreate, employee: dict = Depends(get_current_employee)):
#     driver = drivers_collection.find_one({"_id": ObjectId(ride.driver_id)})
#     if not driver or driver["status"] != "verified":
#         raise HTTPException(status_code=400, detail="The selected driver is not verified.")
#     new_ride = {
#         "driver_id": ObjectId(ride.driver_id),
#         "employee_id": ObjectId(employee["_id"]),
#         "route_id": ObjectId(ride.route_id),
#         "start_time": ride.start_time,
#         "end_time": ride.end_time,
#         "status": "booked",
#         "created_at": datetime.utcnow(),
#         "updated_at": datetime.utcnow()
#     }
#     rides_collection.insert_one(new_ride)
#     return {"message": "Ride booked successfully with a verified driver."}

# @app.post("/employee/add-route")
# def add_route(route: RouteCreate, employee: dict = Depends(get_current_employee)):
#     new_route = {
#         "route_name": route.route_name,
#         "start_location": route.start_location,
#         "end_location": route.end_location,
#         "created_at": datetime.utcnow(),
#         "updated_at": datetime.utcnow(),
#         "created_by": employee["_id"]  # Track which employee created the route
#     }
#     routes_collection.insert_one(new_route)
#     return {"message": "Route created successfully by employee."}
#######################&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&777

from fastapi import FastAPI, Depends, HTTPException, status, Body
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from passlib.context import CryptContext
from jose import JWTError, jwt
from pymongo import MongoClient
from datetime import datetime, timedelta, timezone
from pydantic import BaseModel, EmailStr, Field
from bson import ObjectId
import matplotlib.pyplot as plt
import io
import base64
import os
from fastapi.middleware.cors import CORSMiddleware
# Initialize FastAPI
app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
# MongoDB Setup
client = MongoClient("mongodb://localhost:27017")
db = client.carpool_system
users_collection = db.users
routes_collection = db.routes
rides_collection = db.rides
complaints_collection = db.complaints
drivers_collection = db.drivers

# Security Setup
SECRET_KEY = os.getenv("SECRET_KEY", "your_secret_key")  # Load from env variable
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/auth/login")

# Utility Functions
def hash_password(password: str) -> str:
    return pwd_context.hash(password)

def verify_password(plain_password: str, hashed_password: str) -> bool:
    return pwd_context.verify(plain_password, hashed_password)

def create_access_token(data: dict, expires_delta: timedelta | None = None):
    to_encode = data.copy()
    expire = datetime.utcnow() + (expires_delta or timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES))
    to_encode.update({"exp": expire})
    return jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)

def decode_access_token(token: str):
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        return payload
    except JWTError:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid or expired token")

# Dependency for current user
def get_current_user(token: str = Depends(oauth2_scheme)):
    payload = decode_access_token(token)
    if not payload:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid or expired token",
            headers={"WWW-Authenticate": "Bearer"},
        )
    user = users_collection.find_one({"email": payload.get("sub")})
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    return user

# Dependency for admin role
def get_current_admin(user: dict = Depends(get_current_user)):
    if user.get("role") != "admin":
        raise HTTPException(status_code=403, detail="Access forbidden")
    return user

# Dependency for employee role
def get_current_employee(user: dict = Depends(get_current_user)):
    if user.get("role") != "employee":
        raise HTTPException(status_code=403, detail="Access forbidden")
    return user

# Pydantic Models
class DriverCreate(BaseModel):
    name: str
    email: EmailStr
    phone: str
    license_number: str
    
class UserCreate(BaseModel):
    name: str
    email: EmailStr
    password: str
    role: str

class EmployeeUpdate(BaseModel):
    name: str
    email: EmailStr

class RideCreate(BaseModel):
    Ride_name: str
    start_location: str
    start_time: datetime
    end_location: str
    end_time: datetime
    ride_discription:str
    available_seats:int
    cost:float
    

class ComplaintCreate(BaseModel):
    employee_id: str
    ride_id: str
    complaint_text: str

# Auth Endpoints
@app.post("/auth/signup")
def signup(user: UserCreate):
    if users_collection.find_one({"email": user.email}):
        raise HTTPException(status_code=400, detail="Email already registered")
    hashed_password = hash_password(user.password)
    new_user = {
        "name": user.name,
        "email": user.email,
        "password": hashed_password,
        "role": user.role,
        "created_at": datetime.now(timezone.utc),
        "updated_at": datetime.now(timezone.utc)
    }
    users_collection.insert_one(new_user)
    return {"message": "User created successfully."}

@app.post("/auth/login")
def login(form_data: OAuth2PasswordRequestForm = Depends()):
    user = users_collection.find_one({"email": form_data.username})
    if not user or not verify_password(form_data.password, user["password"]):
        raise HTTPException(status_code=400, detail="Invalid credentials")
    access_token = create_access_token(data={"sub": user["email"]})
    return {"access_token": access_token, "role": user["role"],"name":user["name"],"user_id":str(user["_id"])}





@app.get("/admin/pending-drivers")
def view_pending_drivers(admin: dict = Depends(get_current_admin)):
    drivers = []
    for driver in drivers_collection.find({}):
        if driver["status"] == "pending":
            drivers.append({
            "name": driver['name'],
            "email": driver['email'],
            "phone": driver['phone'],
            "license_number": driver['license_number'],
            "submitted_by": str(driver['submitted_by']),
            "status": driver['status'],
            "created_at": driver['created_at'],
            "updated_at": driver['updated_at']
            })
        
    
    return {"pending_drivers": drivers}


# Admin verifies or rejects a driver
@app.put("/admin/verify-driver/{driver_id}")
def verify_driver(driver_id: str, action: str, admin: dict = Depends(get_current_admin)):
    driver = drivers_collection.find_one({"_id": ObjectId(driver_id)})
    if not driver:
        raise HTTPException(status_code=404, detail="Driver not found.")
    if action not in ["verified", "rejected"]:
        raise HTTPException(status_code=400, detail="Invalid action. Use 'verified' or 'rejected'.")
    drivers_collection.update_one(
        {"_id": ObjectId(driver_id)},
        {"$set": {"status": action, "updated_at": datetime.utcnow()}}
    )
    return {"message": f"Driver has been {action}."}

# @app.get("/admin/complaints")
# def get_complaints(admin: dict = Depends(get_current_admin)):
#     complaints = list(complaints_collection.find({}))
#     return {"complaints": complaints}

@app.get("/admin/complaints")
def get_complaints(admin: dict = Depends(get_current_admin)):
    complaints = []
    for complaint in complaints_collection.find({}).sort("created_at", -1):
        # Get employee and ride details
        employee = users_collection.find_one({"_id": complaint["employee_id"]})
        ride = rides_collection.find_one({"_id": complaint["ride_id"]})
        
        complaints.append({
            "_id": str(complaint["_id"]),
            "employee_id": employee["name"] if employee else "Unknown",
            "ride_id": ride["Ride_name"] if ride else "Unknown",
            "complaint_text": complaint["complaint_text"],
            "status": complaint["status"],
            "created_at": complaint["created_at"],
            "updated_at": complaint["updated_at"]
        })
    return {"complaints": complaints}


@app.put("/admin/complaints/{complaint_id}")
def resolve_complaint(complaint_id: str):
    complaint = complaints_collection.find_one({"_id": ObjectId(complaint_id)})
    if not complaint:
        raise HTTPException(status_code=404, detail="Complaint not found")
    complaints_collection.update_one(
        {"_id": ObjectId(complaint_id)},
        {"$set": {"status": "resolved", "updated_at": datetime.now(datetime.timezone.utc)}}
    )
    return {"message": "Complaint resolved successfully."}

# Trend Reporting and Graph Generation
@app.get("/admin/trends")
def get_trends(admin: dict = Depends(get_current_admin)):
    trends = []
    for route in routes_collection.find({}):
        ride_count = rides_collection.count_documents({"route_id": route["_id"]})
        avg_cost = list(rides_collection.aggregate([
            {"$match": {"route_id": route["_id"]}},
            {"$group": {"_id": "$route_id", "avg_cost": {"$avg": "$cost"}}}
        ]))
        avg_cost = avg_cost[0]["avg_cost"] if avg_cost else 0
        trends.append({
            "route_name": route["route_name"],
            "ride_count": ride_count,
            "avg_cost": avg_cost
        })
    return {"trends": trends}

@app.get("/admin/graph")
def get_graph(admin: dict = Depends(get_current_admin)):
    trends = get_trends(admin)
    routes = [trend["route_name"] for trend in trends["trends"]]
    ride_counts = [trend["ride_count"] for trend in trends["trends"]]
    avg_costs = [trend["avg_cost"] for trend in trends["trends"]]

    fig, ax = plt.subplots(2, 1, figsize=(10, 10))

    ax[0].bar(routes, ride_counts, color="blue")
    ax[0].set_title("Ride Count per Route")
    ax[0].set_ylabel("Ride Count")

    ax[1].bar(routes, avg_costs, color="green")
    ax[1].set_title("Average Cost per Route")
    ax[1].set_ylabel("Average Cost")

    img_stream = io.BytesIO()
    plt.savefig(img_stream, format="png")
    img_stream.seek(0)
    img_b64 = base64.b64encode(img_stream.read()).decode("utf-8")
    plt.close(fig)

    return {"graph": img_b64}

@app.post("/admin/rides")
def get_ride_details(admin:dict = Depends(get_current_admin)):
    rides = []
    for ride in rides_collection.find({}):
        rides.append({
            "Ride_name": ride['Ride_name'],
            "start_location": ride['start_location'],
            "start_time": ride['start_time'],
            "end_location": ride['end_location'],
            "end_time": ride['end_time'],
            "available_seats": ride['available_seats'],
            "cost": ride['cost'],
            "ride_discription": ride['ride_discription'],
            "booked_by": ride['booked_by'],
            "created_by": ride['created_by'],
            "created_at": ride['created_at'],
            "updated_at": ride['updated_at']
        })
    return {"rides": rides}

## ADMIN ENDPOINTS &&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&(AI generated)
@app.get("/admin/rides")
def get_rides(admin: dict = Depends(get_current_admin)):
    rides = []
    for ride in rides_collection.find({}).sort("created_at", -1):
        rides.append({
            "_id": str(ride['_id']),
            "Ride_name": ride.get('Ride_name', 'N/A'),
            "start_location": ride.get('start_location', 'N/A'),
            "end_location": ride.get('end_location', 'N/A'),
            "start_time": ride.get('start_time', 'N/A'),
            "end_time": ride.get('end_time', 'N/A'),
            "available_seats": ride.get('available_seats', 0),
            "cost": ride.get('cost', 0.0),
            "status": ride.get('status', 'N/A'),
            "created_by": str(ride.get('created_by', 'N/A')),
            "created_at": ride.get("created_at", 'N/A')
        })
    return {"rides": rides}

@app.get("/admin/ride-stats")
def get_ride_stats(admin: dict = Depends(get_current_admin)):
    total_rides = rides_collection.count_documents({})
    active_rides = rides_collection.count_documents({"status": "active"})
    completed_rides = rides_collection.count_documents({"status": "completed"})
    total_complaints = complaints_collection.count_documents({})
    
    return {
        "totalRides": total_rides,
        "activeRides": active_rides,
        "completedRides": completed_rides,
        "totalComplaints": total_complaints
    }


@app.get("/admin/trends")
def get_ride_trends(admin: dict = Depends(get_current_admin)):
    # Get ride and complaint trends for the last 7 days
    seven_days_ago = datetime.now(timezone.utc) - timedelta(days=7)
    
    # Get rides per day
    rides_pipeline = [
        {
            "$match": {
                "created_at": {"$gte": seven_days_ago}
            }
        },
        {
            "$group": {
                "_id": {
                    "$dateToString": {
                        "format": "%Y-%m-%d",
                        "date": "$created_at"
                    }
                },
                "rides": {"$sum": 1}
            }
        },
        {
            "$sort": {"_id": 1}
        }
    ]
    
    # Get complaints per day
    complaints_pipeline = [
        {
            "$match": {
                "created_at": {"$gte": seven_days_ago}
            }
        },
        {
            "$group": {
                "_id": {
                    "$dateToString": {
                        "format": "%Y-%m-%d",
                        "date": "$created_at"
                    }
                },
                "complaints": {"$sum": 1}
            }
        },
        {
            "$sort": {"_id": 1}
        }
    ]
    
    rides_data = list(rides_collection.aggregate(rides_pipeline))
    complaints_data = list(complaints_collection.aggregate(complaints_pipeline))
    
    # Format the results
    formatted_trends = []
    current_date = seven_days_ago
    for _ in range(7):
        date_str = current_date.strftime("%Y-%m-%d")
        
        # Find matching data for the current date
        rides = next((r for r in rides_data if r["_id"] == date_str), None)
        complaints = next((c for c in complaints_data if c["_id"] == date_str), None)
        
        formatted_trends.append({
            "date": date_str,
            "rides": rides["rides"] if rides else 0,
            "complaints": complaints["complaints"] if complaints else 0
        })
        current_date += timedelta(days=1)
    
    return {"trends": formatted_trends}



############################################################33
# Complaint Management
# @app.post("/employee/complaints")
# def create_complaint(complaint: ComplaintCreate, employee: dict = Depends(get_current_employee)):
#     complaint_data = {
#         "employee_id": ObjectId(complaint.employee_id),
#         "route_id": ObjectId(complaint.route_id),
#         "complaint_text": complaint.complaint_text,
#         "status": "pending", 
#         "created_at": datetime.utcnow(),
#         "updated_at": datetime.utcnow()
#     }
#     complaints_collection.insert_one(complaint_data)
#     return {"message": "Complaint created successfully."}

@app.post("/employee/complaints")
def create_complaint(complaint: ComplaintCreate, employee: dict = Depends(get_current_employee)):
    complaint_data = {
        "employee_id": ObjectId(complaint.employee_id),
        "ride_id": ObjectId(complaint.route_id),
        "complaint_text": complaint.complaint_text,
        "status": "pending",
        "created_at": datetime.now(timezone.utc),
        "updated_at": datetime.now(timezone.utc)
    }
    result = complaints_collection.insert_one(complaint_data)
    return {"message": "Complaint created successfully.", "id": str(result.inserted_id)}




# Employee submits driver details
@app.post("/employee/submit-driver")
def submit_driver(driver: DriverCreate, employee: dict = Depends(get_current_employee)):
    if drivers_collection.find_one({"email": driver.email}):
        raise HTTPException(status_code=400, detail="Driver already exists or is pending verification.")
    new_driver = {
        "name": driver.name,
        "email": driver.email,
        "phone": driver.phone,
        "license_number": driver.license_number,
        "submitted_by": employee["_id"],  # Track which employee submitted the driver
        "status": "pending",  # Default status: pending
        "created_at": datetime.utcnow(),
        "updated_at": datetime.utcnow()
    }
    drivers_collection.insert_one(new_driver)
    return {"message": "Driver details submitted successfully and pending admin approval."}


# Employee views available drivers when booking rides
@app.get("/employee/available-drivers")
def get_available_drivers(employee: dict = Depends(get_current_employee)):
    drivers = list(drivers_collection.find({"status": "verified"}))
    for driver in drivers:
        driver["_id"] = str(driver["_id"])
    return {"available_drivers": drivers}




### --------------------- Ride methods -------------- #########
@app.post("/employee/book-ride/{ride_id}")
def book_ride(ride_id: str, ride:RideCreate, employee:dict=Depends(get_current_employee)):
    ride_data = rides_collection.find_one({"_id":ObjectId(ride_id)})
    if not ride_data:
        raise HTTPException(status_code=404, detail="Ride not found")
    if ride_data["available_seats"] == 0:
        raise HTTPException(status_code=400, detail="No available seats")
    rides_collection.update_one(
        {"_id": ObjectId(ride_id)},
        {"$push": {"booked_by": {"employee_id": employee["_id"], "employee_name": employee["name"]}}, "$set": {"available_seats": ride_data["available_seats"] - 1}}
    )
    return {"message": "Ride booked successfully."}

@app.post("/employee/add-ride")
def add_ride(ride: RideCreate,employee: dict = Depends(get_current_employee)):
    new_ride = {
        "Employee_Id" : employee["_id"],
        "created_by" : employee["name"],
        "Ride_name": ride.Ride_name,
        "start_location": ride.start_location,
        "start_time": ride.start_time,
        "end_location": ride.end_location,
        "end_time": ride.end_time,
        "available_seats": ride.available_seats,
        "cost": ride.cost,
        "status" : "active",
        "ride_discription": ride.ride_discription,
        "booked_by": [],
        "created_at": datetime.utcnow(),
        "updated_at": datetime.utcnow()
    }
    rides_collection.insert_one(new_ride)
    return {"message": "Ride created successfully."}


@app.get("/employee/rides")
def get_rides(employee: dict = Depends(get_current_employee)):
    rides = []
    for ride in rides_collection.find({"Employee_Id": employee["_id"]}):
        rides.append({
            "Ride_name": ride['Ride_name'],
            "start_location": ride['start_location'],
            "start_time": ride['start_time'],
            "end_location": ride['end_location'],
            "end_time": ride['end_time'],
            "available_seats": ride['available_seats'],
            "cost": ride['cost'],
            "ride_discription": ride['ride_discription'],
            "created_by": ride['created_by'],
            "created_at": ride['created_at'],
            "updated_at": ride['updated_at']
        })
    return {"rides": rides}

@app.get("/get-avilable-rides")
def get_available_rides():
    available_rides = []
    for ride in rides_collection.find({}):
        if ride["status"] == "active":
            available_rides.append({
                "Ride_name": ride['Ride_name'],
                "start_location": ride['start_location'],
                "start_time": ride['start_time'],
                "end_location": ride['end_location'],
                "end_time": ride['end_time'],
                "available_seats": ride['available_seats'],
                "cost": ride['cost'],
                "ride_discription": ride['ride_discription'],
                "created_by": ride['created_by'],
                "created_at": ride['created_at'],
                "updated_at": ride['updated_at']
            })
    return {"available_rides": available_rides}

@app.put("/employee/update-ride/{ride_id}")
def update_ride(ride_id: str, ride: RideCreate):
    ride_data = rides_collection.find_one({"_id": ObjectId(ride_id)})
    if not ride_data:
        raise HTTPException(status_code=404, detail="Ride not found")
    rides_collection.update_one(
        {"_id": ObjectId(ride_id)},
        {"$set": {"Ride_name": ride.Ride_name, "start_location": ride.start_location, "start_time": ride.start_time, "end_location": ride.end_location, "end_time": ride.end_time, "available_seats": ride.available_seats, "cost": ride.cost, "ride_discription": ride.ride_discription, "updated_at": datetime.utcnow()}}
    )
    return {"message": "Ride updated successfully."}


@app.delete("/employee/delete-ride/{ride_id}")
def delete_ride(ride_id: str, employee: dict = Depends(get_current_employee)):
    # Check if ride exists and belongs to the employee
    ride = rides_collection.find_one({
        "_id": ObjectId(ride_id),
        "Employee_Id": employee["_id"]
    })
    
    if not ride:
        raise HTTPException(
            status_code=404,
            detail="Ride not found or you don't have permission to delete it"
        )
    
    # Check if ride has any bookings
    if ride.get("booked_by") and len(ride["booked_by"]) > 0:
        raise HTTPException(
            status_code=400,
            detail="Cannot delete ride with active bookings"
        )
    
    # Delete the ride
    rides_collection.delete_one({
        "_id": ObjectId(ride_id),
        "Employee_Id": employee["_id"]
    })
    
    return {"message": "Ride deleted successfully"}

# Enhance the update endpoint to include validation
@app.put("/employee/update-ride/{ride_id}")
def update_ride(
    ride_id: str,
    ride: RideCreate,
    employee: dict = Depends(get_current_employee)
):
    # Check if ride exists and belongs to the employee
    existing_ride = rides_collection.find_one({
        "_id": ObjectId(ride_id),
        "Employee_Id": employee["_id"]
    })
    
    if not existing_ride:
        raise HTTPException(
            status_code=404,
            detail="Ride not found or you don't have permission to update it"
        )
    
    # Validate the update
    if existing_ride.get("booked_by") and len(existing_ride["booked_by"]) > 0:
        # If ride has bookings, restrict certain changes
        if ride.available_seats < len(existing_ride["booked_by"]):
            raise HTTPException(
                status_code=400,
                detail="Cannot reduce available seats below number of current bookings"
            )
    
    # Update the ride
    update_data = {
        "Ride_name": ride.Ride_name,
        "start_location": ride.start_location,
        "start_time": ride.start_time,
        "end_location": ride.end_location,
        "end_time": ride.end_time,
        "available_seats": ride.available_seats,
        "cost": ride.cost,
        "ride_discription": ride.ride_discription,
        "updated_at": datetime.utcnow()
    }
    
    rides_collection.update_one(
        {"_id": ObjectId(ride_id)},
        {"$set": update_data}
    )
    
    return {"message": "Ride updated successfully"}




@app.get("/employee/ride/{ride_id}/driver")
def get_ride_driver(ride_id:str):
    try:
        ride = rides_collection.find_one({"_id": ObjectId(ride_id)})
        if not ride:
            raise HTTPException(status_code=404, detail="Ride not found")
        driver = drivers_collection.find_one({"submitted_by": ObjectId(ride["Employee_Id"])})
        if not driver:
            raise HTTPException(status_code=404, detail="Driver not found")
        return {
            "driver": {
                "name": driver["name"],
                "phone": driver["phone"],
                "email": driver["email"],
                "status":driver["status"],
            }
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    



# Routes and Ride Endpoints
# @app.post("/admin/routes")
# def create_route(route: RouteCreate, admin: dict = Depends(get_current_admin)):
#     new_route = {
#         "route_name": route.route_name,
#         "start_location": route.start_location,
#         "end_location": route.end_location,
#         "created_at": datetime.utcnow(),
#         "updated_at": datetime.utcnow()
#     }
#     routes_collection.insert_one(new_route)
#     return {"message": "Route created successfully."}

# @app.get("/admin/routes")
# def get_routes(admin: dict = Depends(get_current_admin)):
#     # routes = list(routes_collection.find({}))
#     # for route in routes:
#     #     route["_id"] = str(route["_id"])
#     # return {"routes": routes}
#     routes = []
#     for route in routes_collection.find({}):
#         route_dict = {
#             "_id": str(route["_id"]),
#             "route_name": route["route_name"],
#             "start_location": route["start_location"],
#             "end_location": route["end_location"],
#             "created_at": route["created_at"],
#             "updated_at": route["updated_at"]
#         }
#         routes.append(route_dict)
#     return {"routes": routes}


# @app.get("/employee/ride/{ride_id}/driver")
# def get_ride_driver(ride_id: str):
#     try:
#         ride = rides_collection.find_one({"_id": ObjectId(ride_id)})
#         if not ride:
#             raise HTTPException(status_code=404, detail="Ride not found")
        
#         # Get driver details
#         driver = drivers_collection.find_one({"_id": ObjectId(ride["Employee_Id"])})
#         if not driver:
#             raise HTTPException(status_code=404, detail="Driver not found")
        
#         # Return sanitized driver details
#         return {
#             "driver": {
#                 "name": driver["name"],
#                 "phone": driver["phone"],
#                 "email": driver["email"]
#             }
#         }
#     except Exception as e:
#         raise HTTPException(status_code=500, detail=str(e))


# Employees can book rides only with verified drivers
# @app.post("/employee/book-ride")
# def book_ride(ride: RideCreate, employee: dict = Depends(get_current_employee)):
#     driver = drivers_collection.find_one({"_id": ObjectId(ride.driver_id)})
#     if not driver or driver["status"] != "verified":
#         raise HTTPException(status_code=400, detail="The selected driver is not verified.")
#     new_ride = {
#         "driver_id": ObjectId(ride.driver_id),
#         "employee_id": ObjectId(employee["_id"]),
#         "route_id": ObjectId(ride.route_id),
#         "start_time": ride.start_time,
#         "end_time": ride.end_time,
#         "status": "booked",
#         "created_at": datetime.utcnow(),
#         "updated_at": datetime.utcnow()
#     }
#     rides_collection.insert_one(new_ride)
#     return {"message": "Ride booked successfully with a verified driver."}