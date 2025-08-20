from fastapi import FastAPI, APIRouter, HTTPException
from fastapi.responses import JSONResponse
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field, EmailStr
from typing import List, Optional
import uuid
from datetime import datetime


ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Create the main app without a prefix
app = FastAPI(title="Exhibilo API", version="1.0.0")

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")


# Define Models
class Contact(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    company: str
    email: EmailStr
    phone: Optional[str] = None
    industry: str
    message: str
    created_at: datetime = Field(default_factory=datetime.utcnow)
    status: str = "new"

class ContactCreate(BaseModel):
    name: str
    company: str
    email: EmailStr
    phone: Optional[str] = None
    industry: str
    message: str

class Project(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    title: str
    category: str
    image: str
    description: str
    created_at: datetime = Field(default_factory=datetime.utcnow)
    featured: bool = False

class Service(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    title: str
    description: str
    icon: str
    order: int = 0

class Testimonial(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    quote: str
    author: str
    position: str
    company: str
    created_at: datetime = Field(default_factory=datetime.utcnow)
    active: bool = True

class CompanyInfo(BaseModel):
    name: str
    description: str
    email: str
    phone: str
    address: str
    social: dict

# Legacy models for compatibility
class StatusCheck(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    client_name: str
    timestamp: datetime = Field(default_factory=datetime.utcnow)

class StatusCheckCreate(BaseModel):
    client_name: str

# Routes

@api_router.get("/")
async def root():
    return {"message": "Exhibilo API - Ready to serve"}

# Contact endpoints
@api_router.post("/contact")
async def create_contact(contact_data: ContactCreate):
    try:
        contact_dict = contact_data.dict()
        contact_obj = Contact(**contact_dict)
        
        # Insert into database
        result = await db.contacts.insert_one(contact_obj.dict())
        
        if result.inserted_id:
            return JSONResponse(
                status_code=201,
                content={
                    "success": True,
                    "message": "Mensaje enviado correctamente. Nos pondremos en contacto contigo pronto.",
                    "contact_id": contact_obj.id
                }
            )
        else:
            raise HTTPException(status_code=500, detail="Error al enviar el mensaje")
            
    except Exception as e:
        logger.error(f"Error creating contact: {str(e)}")
        raise HTTPException(status_code=500, detail="Error interno del servidor")

@api_router.get("/contacts", response_model=List[Contact])
async def get_contacts():
    try:
        contacts = await db.contacts.find().sort("created_at", -1).to_list(1000)
        return [Contact(**contact) for contact in contacts]
    except Exception as e:
        logger.error(f"Error getting contacts: {str(e)}")
        raise HTTPException(status_code=500, detail="Error al obtener contactos")

# Projects endpoints
@api_router.get("/projects")
async def get_projects(category: Optional[str] = None):
    try:
        query = {}
        if category and category != "Todos":
            query["category"] = category
            
        projects = await db.projects.find(query).sort("created_at", -1).to_list(1000)
        return {"projects": [Project(**project) for project in projects]}
    except Exception as e:
        logger.error(f"Error getting projects: {str(e)}")
        raise HTTPException(status_code=500, detail="Error al obtener proyectos")

# Services endpoints
@api_router.get("/services")
async def get_services():
    try:
        services = await db.services.find().sort("order", 1).to_list(1000)
        return {"services": [Service(**service) for service in services]}
    except Exception as e:
        logger.error(f"Error getting services: {str(e)}")
        raise HTTPException(status_code=500, detail="Error al obtener servicios")

# Testimonials endpoints
@api_router.get("/testimonials")
async def get_testimonials():
    try:
        testimonials = await db.testimonials.find({"active": True}).sort("created_at", -1).to_list(1000)
        return {"testimonials": [Testimonial(**testimonial) for testimonial in testimonials]}
    except Exception as e:
        logger.error(f"Error getting testimonials: {str(e)}")
        raise HTTPException(status_code=500, detail="Error al obtener testimoniales")

# Company info endpoints
@api_router.get("/company")
async def get_company_info():
    try:
        company = await db.company.find_one()
        if not company:
            # Return default company info if not found
            return {
                "name": "Exhibilo",
                "description": "Especialistas en diseño y producción de exhibidores, puntos de venta y soluciones para retail.",
                "email": "info@exhibilo.com",
                "phone": "+54 11 4567-8900",
                "address": "Av. Industrial 1234, Buenos Aires, Argentina",
                "social": {
                    "linkedin": "https://linkedin.com/company/exhibilo",
                    "instagram": "https://instagram.com/exhibilo",
                    "facebook": "https://facebook.com/exhibilo"
                }
            }
        return CompanyInfo(**company)
    except Exception as e:
        logger.error(f"Error getting company info: {str(e)}")
        raise HTTPException(status_code=500, detail="Error al obtener información de la empresa")

# Data seeding endpoint
@api_router.post("/seed-data")
async def seed_database():
    try:
        # Seed services
        services_data = [
            {
                "id": str(uuid.uuid4()),
                "title": "Diseño Personalizado",
                "description": "Creamos exhibidores únicos adaptados a tu marca y objetivos comerciales.",
                "icon": "Palette",
                "order": 1
            },
            {
                "id": str(uuid.uuid4()),
                "title": "Producción Industrial",
                "description": "Fabricación con materiales de calidad: cartón, madera, metal y acrílico.",
                "icon": "Factory",
                "order": 2
            },
            {
                "id": str(uuid.uuid4()),
                "title": "Implementación en PDV",
                "description": "Logística, instalación y mantenimiento en todos tus puntos de venta.",
                "icon": "Truck",
                "order": 3
            }
        ]
        
        # Clear existing and insert new services
        await db.services.delete_many({})
        await db.services.insert_many(services_data)
        
        # Seed projects
        projects_data = [
            {
                "id": str(uuid.uuid4()),
                "title": "Display Cosmética Premium",
                "category": "Cosmética",
                "image": "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=400&h=300&fit=crop",
                "description": "Exhibidor elegante para productos de belleza premium",
                "created_at": datetime.utcnow(),
                "featured": True
            },
            {
                "id": str(uuid.uuid4()),
                "title": "Stand Bebidas Refrescantes",
                "category": "Bebidas",
                "image": "https://images.unsplash.com/photo-1544148103-0773bf10d330?w=400&h=300&fit=crop",
                "description": "Display llamativo para promocionar bebidas en supermercados",
                "created_at": datetime.utcnow(),
                "featured": True
            },
            {
                "id": str(uuid.uuid4()),
                "title": "Exhibidor Snacks Gourmet",
                "category": "Alimentos",
                "image": "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop",
                "description": "Punto de venta estratégico para productos alimenticios",
                "created_at": datetime.utcnow(),
                "featured": True
            },
            {
                "id": str(uuid.uuid4()),
                "title": "Display Tecnología Móvil",
                "category": "Retail",
                "image": "https://images.unsplash.com/photo-1512428813834-c702c7702b67?w=400&h=300&fit=crop",
                "description": "Exhibidor moderno para dispositivos tecnológicos",
                "created_at": datetime.utcnow(),
                "featured": False
            },
            {
                "id": str(uuid.uuid4()),
                "title": "Stand Productos Hogar",
                "category": "Retail",
                "image": "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=300&fit=crop",
                "description": "Solución integral para artículos del hogar",
                "created_at": datetime.utcnow(),
                "featured": False
            },
            {
                "id": str(uuid.uuid4()),
                "title": "Display Perfumería",
                "category": "Cosmética",
                "image": "https://images.unsplash.com/photo-1541643600914-78b084683601?w=400&h=300&fit=crop",
                "description": "Exhibidor sofisticado para fragancias y perfumes",
                "created_at": datetime.utcnow(),
                "featured": False
            }
        ]
        
        # Clear existing and insert new projects
        await db.projects.delete_many({})
        await db.projects.insert_many(projects_data)
        
        # Seed testimonials
        testimonials_data = [
            {
                "id": str(uuid.uuid4()),
                "quote": "Exhibilo transformó nuestros puntos de venta. Los exhibidores aumentaron nuestras ventas un 40%.",
                "author": "María González",
                "position": "Gerente de Marketing",
                "company": "Productos Premium SA",
                "created_at": datetime.utcnow(),
                "active": True
            },
            {
                "id": str(uuid.uuid4()),
                "quote": "Excelente calidad y cumplimiento de tiempos. Recomiendo Exhibilo sin dudas.",
                "author": "Carlos Rodríguez",
                "position": "Director Comercial",
                "company": "Retail Solutions",
                "created_at": datetime.utcnow(),
                "active": True
            },
            {
                "id": str(uuid.uuid4()),
                "quote": "El diseño 3D nos permitió visualizar exactamente lo que necesitábamos antes de producir.",
                "author": "Ana Martínez",
                "position": "Brand Manager",
                "company": "Cosmética Global",
                "created_at": datetime.utcnow(),
                "active": True
            }
        ]
        
        # Clear existing and insert new testimonials
        await db.testimonials.delete_many({})
        await db.testimonials.insert_many(testimonials_data)
        
        return {"message": "Database seeded successfully"}
        
    except Exception as e:
        logger.error(f"Error seeding database: {str(e)}")
        raise HTTPException(status_code=500, detail="Error al poblar la base de datos")

# Legacy endpoints for compatibility
@api_router.post("/status", response_model=StatusCheck)
async def create_status_check(input: StatusCheckCreate):
    status_dict = input.dict()
    status_obj = StatusCheck(**status_dict)
    _ = await db.status_checks.insert_one(status_obj.dict())
    return status_obj

@api_router.get("/status", response_model=List[StatusCheck])
async def get_status_checks():
    status_checks = await db.status_checks.find().to_list(1000)
    return [StatusCheck(**status_check) for status_check in status_checks]

# Include the router in the main app
app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
