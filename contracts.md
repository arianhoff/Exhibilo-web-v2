# Contratos API - Exhibilo Website

## Datos Mockeados Actuales (mock.js)
- Hero section data
- Client logos (6 companies)
- Services (3 services with icons)
- Projects (6 projects with categories)
- Process steps (4 steps)
- Testimonials (3 testimonials)
- Company info and contact data
- Contact form industries list

## Endpoints a Implementar

### 1. Contact Form Submission
**POST /api/contact**
```json
Request:
{
  "name": "string",
  "company": "string", 
  "email": "string",
  "phone": "string (optional)",
  "industry": "string",
  "message": "string"
}

Response:
{
  "success": true,
  "message": "Mensaje enviado correctamente",
  "contact_id": "string"
}
```

### 2. Get Projects (with filtering)
**GET /api/projects?category={category}**
```json
Response:
{
  "projects": [
    {
      "id": "string",
      "title": "string",
      "category": "string",
      "image": "string (URL)",
      "description": "string",
      "created_at": "datetime"
    }
  ]
}
```

### 3. Get Company Info
**GET /api/company**
```json
Response:
{
  "name": "string",
  "description": "string",
  "email": "string",
  "phone": "string",
  "address": "string",
  "social": {
    "linkedin": "string",
    "instagram": "string", 
    "facebook": "string"
  }
}
```

### 4. Get Services
**GET /api/services**
```json
Response:
{
  "services": [
    {
      "id": "string",
      "title": "string",
      "description": "string",
      "icon": "string"
    }
  ]
}
```

### 5. Get Testimonials
**GET /api/testimonials**
```json
Response:
{
  "testimonials": [
    {
      "id": "string",
      "quote": "string",
      "author": "string",
      "position": "string",
      "company": "string"
    }
  ]
}
```

## Modelos MongoDB

### Contact Model
```python
class Contact(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    company: str
    email: str
    phone: Optional[str] = None
    industry: str
    message: str
    created_at: datetime = Field(default_factory=datetime.utcnow)
    status: str = "new"  # new, contacted, closed
```

### Project Model
```python
class Project(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    title: str
    category: str
    image: str
    description: str
    created_at: datetime = Field(default_factory=datetime.utcnow)
    featured: bool = False
```

### Service Model
```python
class Service(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    title: str
    description: str
    icon: str
    order: int = 0
```

### Testimonial Model
```python
class Testimonial(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    quote: str
    author: str
    position: str
    company: str
    created_at: datetime = Field(default_factory=datetime.utcnow)
    active: bool = True
```

## Integración Frontend-Backend

### Cambios necesarios en Frontend:
1. **ContactForm.jsx**: Reemplazar mock submission con real API call
2. **ProjectsGrid.jsx**: Fetch projects from API instead of mock data
3. **Services.jsx**: Load services from API
4. **Testimonials.jsx**: Load testimonials from API
5. **Footer.jsx**: Load company info from API

### API Client Setup:
- Usar axios para todas las llamadas
- Implementar error handling
- Añadir loading states
- Usar REACT_APP_BACKEND_URL para todas las llamadas

### Data Seeding:
- Poblar la base de datos con los datos del mock.js
- Crear script de inicialización para cargar datos por defecto

## Funcionalidades Adicionales

### Email Notifications (Opcional):
- Enviar email de confirmación al usuario
- Notificar al equipo de Exhibilo sobre nuevos contactos

### Admin Panel (Futuro):
- Gestionar proyectos
- Ver y gestionar contactos
- Editar información de la empresa
- Gestionar testimoniales

## Testing Plan

### Backend Testing:
1. Test contact form submission
2. Test projects API with filtering
3. Test all GET endpoints
4. Test data validation
5. Test error handling

### Integration Testing:
1. Test frontend form submission
2. Test project filtering
3. Test data loading states
4. Test error scenarios