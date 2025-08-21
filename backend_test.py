#!/usr/bin/env python3
"""
Comprehensive Backend API Testing for Exhibilo Website
Tests all API endpoints with proper validation and error handling
"""

import requests
import json
import sys
from datetime import datetime
import uuid

# Configuration
BACKEND_URL = "https://retail-solutions-1.preview.emergentagent.com"
API_BASE = f"{BACKEND_URL}/api"

class BackendTester:
    def __init__(self):
        self.results = {
            "total_tests": 0,
            "passed": 0,
            "failed": 0,
            "errors": []
        }
        
    def log_result(self, test_name, success, message=""):
        self.results["total_tests"] += 1
        if success:
            self.results["passed"] += 1
            print(f"✅ {test_name}: PASSED {message}")
        else:
            self.results["failed"] += 1
            self.results["errors"].append(f"{test_name}: {message}")
            print(f"❌ {test_name}: FAILED {message}")
    
    def test_api_root(self):
        """Test the API root endpoint"""
        try:
            response = requests.get(f"{API_BASE}/", timeout=10)
            if response.status_code == 200:
                data = response.json()
                if "message" in data and "Exhibilo API" in data["message"]:
                    self.log_result("API Root", True, f"Status: {response.status_code}")
                else:
                    self.log_result("API Root", False, f"Unexpected response: {data}")
            else:
                self.log_result("API Root", False, f"Status: {response.status_code}")
        except Exception as e:
            self.log_result("API Root", False, f"Exception: {str(e)}")
    
    def test_contact_form_valid(self):
        """Test contact form with valid data"""
        try:
            contact_data = {
                "name": "Juan Pérez",
                "company": "Empresa Test SA",
                "email": "juan.perez@empresatest.com",
                "phone": "+54 11 1234-5678",
                "industry": "Retail",
                "message": "Necesitamos exhibidores para nuestra nueva línea de productos cosméticos. Nos interesa conocer sus servicios y obtener una cotización."
            }
            
            response = requests.post(f"{API_BASE}/contact", json=contact_data, timeout=10)
            
            if response.status_code == 201:
                data = response.json()
                if data.get("success") and "contact_id" in data:
                    self.log_result("Contact Form Valid", True, f"Contact ID: {data['contact_id']}")
                else:
                    self.log_result("Contact Form Valid", False, f"Invalid response structure: {data}")
            else:
                self.log_result("Contact Form Valid", False, f"Status: {response.status_code}, Response: {response.text}")
                
        except Exception as e:
            self.log_result("Contact Form Valid", False, f"Exception: {str(e)}")
    
    def test_contact_form_invalid_email(self):
        """Test contact form with invalid email"""
        try:
            contact_data = {
                "name": "Test User",
                "company": "Test Company",
                "email": "invalid-email",
                "industry": "Test",
                "message": "Test message"
            }
            
            response = requests.post(f"{API_BASE}/contact", json=contact_data, timeout=10)
            
            # Should return 422 for validation error
            if response.status_code == 422:
                self.log_result("Contact Form Invalid Email", True, "Validation error returned correctly")
            else:
                self.log_result("Contact Form Invalid Email", False, f"Expected 422, got {response.status_code}")
                
        except Exception as e:
            self.log_result("Contact Form Invalid Email", False, f"Exception: {str(e)}")
    
    def test_contact_form_missing_fields(self):
        """Test contact form with missing required fields"""
        try:
            contact_data = {
                "name": "Test User"
                # Missing required fields
            }
            
            response = requests.post(f"{API_BASE}/contact", json=contact_data, timeout=10)
            
            # Should return 422 for validation error
            if response.status_code == 422:
                self.log_result("Contact Form Missing Fields", True, "Validation error returned correctly")
            else:
                self.log_result("Contact Form Missing Fields", False, f"Expected 422, got {response.status_code}")
                
        except Exception as e:
            self.log_result("Contact Form Missing Fields", False, f"Exception: {str(e)}")
    
    def test_projects_all(self):
        """Test getting all projects"""
        try:
            response = requests.get(f"{API_BASE}/projects", timeout=10)
            
            if response.status_code == 200:
                data = response.json()
                if "projects" in data and isinstance(data["projects"], list):
                    projects = data["projects"]
                    self.log_result("Projects All", True, f"Retrieved {len(projects)} projects")
                    
                    # Validate project structure
                    if projects:
                        project = projects[0]
                        required_fields = ["id", "title", "category", "image", "description"]
                        missing_fields = [field for field in required_fields if field not in project]
                        if missing_fields:
                            self.log_result("Projects Structure", False, f"Missing fields: {missing_fields}")
                        else:
                            self.log_result("Projects Structure", True, "All required fields present")
                else:
                    self.log_result("Projects All", False, f"Invalid response structure: {data}")
            else:
                self.log_result("Projects All", False, f"Status: {response.status_code}")
                
        except Exception as e:
            self.log_result("Projects All", False, f"Exception: {str(e)}")
    
    def test_projects_filtered_cosmetica(self):
        """Test getting projects filtered by Cosmética category"""
        try:
            response = requests.get(f"{API_BASE}/projects?category=Cosmética", timeout=10)
            
            if response.status_code == 200:
                data = response.json()
                if "projects" in data:
                    projects = data["projects"]
                    # Check if all projects are from Cosmética category
                    cosmetica_projects = [p for p in projects if p.get("category") == "Cosmética"]
                    if len(cosmetica_projects) == len(projects):
                        self.log_result("Projects Filtered Cosmética", True, f"Retrieved {len(projects)} Cosmética projects")
                    else:
                        self.log_result("Projects Filtered Cosmética", False, "Filter not working correctly")
                else:
                    self.log_result("Projects Filtered Cosmética", False, f"Invalid response: {data}")
            else:
                self.log_result("Projects Filtered Cosmética", False, f"Status: {response.status_code}")
                
        except Exception as e:
            self.log_result("Projects Filtered Cosmética", False, f"Exception: {str(e)}")
    
    def test_projects_filtered_bebidas(self):
        """Test getting projects filtered by Bebidas category"""
        try:
            response = requests.get(f"{API_BASE}/projects?category=Bebidas", timeout=10)
            
            if response.status_code == 200:
                data = response.json()
                if "projects" in data:
                    projects = data["projects"]
                    # Check if all projects are from Bebidas category
                    bebidas_projects = [p for p in projects if p.get("category") == "Bebidas"]
                    if len(bebidas_projects) == len(projects):
                        self.log_result("Projects Filtered Bebidas", True, f"Retrieved {len(projects)} Bebidas projects")
                    else:
                        self.log_result("Projects Filtered Bebidas", False, "Filter not working correctly")
                else:
                    self.log_result("Projects Filtered Bebidas", False, f"Invalid response: {data}")
            else:
                self.log_result("Projects Filtered Bebidas", False, f"Status: {response.status_code}")
                
        except Exception as e:
            self.log_result("Projects Filtered Bebidas", False, f"Exception: {str(e)}")
    
    def test_projects_invalid_category(self):
        """Test getting projects with invalid category"""
        try:
            response = requests.get(f"{API_BASE}/projects?category=InvalidCategory", timeout=10)
            
            if response.status_code == 200:
                data = response.json()
                if "projects" in data:
                    projects = data["projects"]
                    # Should return empty list for invalid category
                    if len(projects) == 0:
                        self.log_result("Projects Invalid Category", True, "Empty list returned for invalid category")
                    else:
                        self.log_result("Projects Invalid Category", False, f"Expected empty list, got {len(projects)} projects")
                else:
                    self.log_result("Projects Invalid Category", False, f"Invalid response: {data}")
            else:
                self.log_result("Projects Invalid Category", False, f"Status: {response.status_code}")
                
        except Exception as e:
            self.log_result("Projects Invalid Category", False, f"Exception: {str(e)}")
    
    def test_services(self):
        """Test getting services"""
        try:
            response = requests.get(f"{API_BASE}/services", timeout=10)
            
            if response.status_code == 200:
                data = response.json()
                if "services" in data and isinstance(data["services"], list):
                    services = data["services"]
                    self.log_result("Services", True, f"Retrieved {len(services)} services")
                    
                    # Validate service structure and ordering
                    if services:
                        service = services[0]
                        required_fields = ["id", "title", "description", "icon", "order"]
                        missing_fields = [field for field in required_fields if field not in service]
                        if missing_fields:
                            self.log_result("Services Structure", False, f"Missing fields: {missing_fields}")
                        else:
                            self.log_result("Services Structure", True, "All required fields present")
                        
                        # Check if services are ordered correctly
                        orders = [s.get("order", 0) for s in services]
                        if orders == sorted(orders):
                            self.log_result("Services Ordering", True, "Services are properly ordered")
                        else:
                            self.log_result("Services Ordering", False, f"Services not ordered correctly: {orders}")
                else:
                    self.log_result("Services", False, f"Invalid response structure: {data}")
            else:
                self.log_result("Services", False, f"Status: {response.status_code}")
                
        except Exception as e:
            self.log_result("Services", False, f"Exception: {str(e)}")
    
    def test_testimonials(self):
        """Test getting testimonials"""
        try:
            response = requests.get(f"{API_BASE}/testimonials", timeout=10)
            
            if response.status_code == 200:
                data = response.json()
                if "testimonials" in data and isinstance(data["testimonials"], list):
                    testimonials = data["testimonials"]
                    self.log_result("Testimonials", True, f"Retrieved {len(testimonials)} testimonials")
                    
                    # Validate testimonial structure
                    if testimonials:
                        testimonial = testimonials[0]
                        required_fields = ["id", "quote", "author", "position", "company", "active"]
                        missing_fields = [field for field in required_fields if field not in testimonial]
                        if missing_fields:
                            self.log_result("Testimonials Structure", False, f"Missing fields: {missing_fields}")
                        else:
                            self.log_result("Testimonials Structure", True, "All required fields present")
                        
                        # Check if only active testimonials are returned
                        inactive_testimonials = [t for t in testimonials if not t.get("active", True)]
                        if len(inactive_testimonials) == 0:
                            self.log_result("Testimonials Active Filter", True, "Only active testimonials returned")
                        else:
                            self.log_result("Testimonials Active Filter", False, f"Found {len(inactive_testimonials)} inactive testimonials")
                else:
                    self.log_result("Testimonials", False, f"Invalid response structure: {data}")
            else:
                self.log_result("Testimonials", False, f"Status: {response.status_code}")
                
        except Exception as e:
            self.log_result("Testimonials", False, f"Exception: {str(e)}")
    
    def test_company_info(self):
        """Test getting company information"""
        try:
            response = requests.get(f"{API_BASE}/company", timeout=10)
            
            if response.status_code == 200:
                data = response.json()
                required_fields = ["name", "description", "email", "phone", "address", "social"]
                missing_fields = [field for field in required_fields if field not in data]
                
                if not missing_fields:
                    # Check if it's the default fallback response
                    if data.get("name") == "Exhibilo":
                        self.log_result("Company Info", True, "Default company info returned")
                    else:
                        self.log_result("Company Info", True, "Company info retrieved")
                else:
                    self.log_result("Company Info", False, f"Missing fields: {missing_fields}")
            else:
                self.log_result("Company Info", False, f"Status: {response.status_code}")
                
        except Exception as e:
            self.log_result("Company Info", False, f"Exception: {str(e)}")
    
    def test_seed_data(self):
        """Test database seeding"""
        try:
            response = requests.post(f"{API_BASE}/seed-data", timeout=30)
            
            if response.status_code == 200:
                data = response.json()
                if "message" in data and "successfully" in data["message"]:
                    self.log_result("Database Seeding", True, "Database seeded successfully")
                else:
                    self.log_result("Database Seeding", False, f"Unexpected response: {data}")
            else:
                self.log_result("Database Seeding", False, f"Status: {response.status_code}, Response: {response.text}")
                
        except Exception as e:
            self.log_result("Database Seeding", False, f"Exception: {str(e)}")
    
    def test_contacts_retrieval(self):
        """Test retrieving contacts (after seeding and creating some)"""
        try:
            response = requests.get(f"{API_BASE}/contacts", timeout=10)
            
            if response.status_code == 200:
                data = response.json()
                if isinstance(data, list):
                    self.log_result("Contacts Retrieval", True, f"Retrieved {len(data)} contacts")
                else:
                    self.log_result("Contacts Retrieval", False, f"Expected list, got: {type(data)}")
            else:
                self.log_result("Contacts Retrieval", False, f"Status: {response.status_code}")
                
        except Exception as e:
            self.log_result("Contacts Retrieval", False, f"Exception: {str(e)}")
    
    def run_all_tests(self):
        """Run all backend tests"""
        print("🚀 Starting Exhibilo Backend API Tests")
        print(f"Backend URL: {BACKEND_URL}")
        print(f"API Base: {API_BASE}")
        print("=" * 60)
        
        # Test API connectivity first
        self.test_api_root()
        
        # Seed database first to ensure data is available
        self.test_seed_data()
        
        # Test Contact Form API (HIGH PRIORITY)
        print("\n📝 Testing Contact Form API...")
        self.test_contact_form_valid()
        self.test_contact_form_invalid_email()
        self.test_contact_form_missing_fields()
        self.test_contacts_retrieval()
        
        # Test Projects API (HIGH PRIORITY)
        print("\n📁 Testing Projects API...")
        self.test_projects_all()
        self.test_projects_filtered_cosmetica()
        self.test_projects_filtered_bebidas()
        self.test_projects_invalid_category()
        
        # Test Services API (MEDIUM PRIORITY)
        print("\n🛠️ Testing Services API...")
        self.test_services()
        
        # Test Testimonials API (MEDIUM PRIORITY)
        print("\n💬 Testing Testimonials API...")
        self.test_testimonials()
        
        # Test Company Info API (LOW PRIORITY)
        print("\n🏢 Testing Company Info API...")
        self.test_company_info()
        
        # Print summary
        print("\n" + "=" * 60)
        print("📊 TEST SUMMARY")
        print("=" * 60)
        print(f"Total Tests: {self.results['total_tests']}")
        print(f"Passed: {self.results['passed']} ✅")
        print(f"Failed: {self.results['failed']} ❌")
        
        if self.results['errors']:
            print("\n🚨 FAILED TESTS:")
            for error in self.results['errors']:
                print(f"  - {error}")
        
        success_rate = (self.results['passed'] / self.results['total_tests']) * 100 if self.results['total_tests'] > 0 else 0
        print(f"\nSuccess Rate: {success_rate:.1f}%")
        
        return self.results

if __name__ == "__main__":
    tester = BackendTester()
    results = tester.run_all_tests()
    
    # Exit with error code if tests failed
    if results['failed'] > 0:
        sys.exit(1)
    else:
        sys.exit(0)