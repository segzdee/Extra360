#!/usr/bin/env python3

import json
import random
import uuid
from datetime import datetime, timedelta
from typing import Dict, List, Optional
import os
import sys

class PlatformDataGenerator:
    def __init__(self):
        self.jurisdictions = [
            "United Kingdom", "United States", "Germany", "France", 
            "Spain", "Italy", "Netherlands", "Australia"
        ]
        self.skills = [
            "Bartending", "Waiting", "Hosting", "Barista", "Chef",
            "Kitchen Porter", "Food Runner", "Restaurant Manager",
            "Event Coordinator", "Sommelier"
        ]
        self.certifications = [
            "Food Safety Level 2", "Food Safety Level 3",
            "Personal License", "First Aid", "Health and Safety",
            "Fire Safety", "Customer Service Excellence"
        ]
        self.industries = [
            "Hotels", "Restaurants", "Bars", "Cafes",
            "Event Venues", "Catering", "Nightclubs"
        ]
        self.company_names = [
            "Grand Plaza Hotels", "Royal Hospitality Group",
            "Elite Dining Collection", "Premium Venues Ltd",
            "Luxury Resorts International", "Fine Dining Enterprises"
        ]
        self.agency_names = [
            "Professional Staffing Solutions", "Elite Recruitment Agency",
            "Hospitality Talent Hub", "Premier Personnel Services",
            "Expert Staffing Group", "Specialized Recruitment Partners"
        ]

    def generate_location(self) -> Dict:
        jurisdiction = random.choice(self.jurisdictions)
        return {
            "jurisdiction": jurisdiction,
            "city": f"{jurisdiction} City {random.randint(1, 5)}",
            "coordinates": {
                "latitude": round(random.uniform(-90, 90), 6),
                "longitude": round(random.uniform(-180, 180), 6)
            }
        }

    def generate_extrastaff(self) -> Dict:
        registration_date = datetime.now() - timedelta(days=random.randint(30, 730))
        return {
            "id": str(uuid.uuid4()),
            "profile": {
                "full_name": f"Staff Member {random.randint(1000, 9999)}",
                "email": f"staff{random.randint(1000, 9999)}@example.com",
                "phone": f"+{random.randint(1, 99)}{random.randint(1000000000, 9999999999)}",
                "profile_photo": f"staff_photo_{random.randint(1000, 9999)}.jpg"
            },
            "location": self.generate_location(),
            "professional_info": {
                "skills": random.sample(self.skills, random.randint(2, 5)),
                "certifications": random.sample(self.certifications, random.randint(1, 4)),
                "hourly_rate": {
                    "min": round(random.uniform(12, 18), 2),
                    "max": round(random.uniform(19, 35), 2)
                }
            },
            "metrics": {
                "rating": round(random.uniform(3.5, 5.0), 1),
                "total_shifts": random.randint(10, 200),
                "completion_rate": round(random.uniform(0.85, 1.0), 2)
            },
            "account_status": random.choice(["Active", "Verified", "Premium"]),
            "registration_date": registration_date.strftime('%Y-%m-%d'),
            "verification": {
                "background_check": random.choice(["Verified", "Pending Review"]),
                "identity_verified": True,
                "documents_verified": True
            }
        }

    def generate_company(self) -> Dict:
        registration_date = datetime.now() - timedelta(days=random.randint(30, 1095))
        return {
            "id": str(uuid.uuid4()),
            "profile": {
                "name": random.choice(self.company_names),
                "industry": random.choice(self.industries),
                "company_size": random.choice(["Small", "Medium", "Large"]),
                "company_logo": f"company_logo_{random.randint(1000, 9999)}.svg"
            },
            "location": self.generate_location(),
            "contact": {
                "primary_contact": f"Contact {random.randint(1000, 9999)}",
                "email": f"company{random.randint(1000, 9999)}@example.com",
                "phone": f"+{random.randint(1, 99)}{random.randint(1000000000, 9999999999)}"
            },
            "metrics": {
                "rating": round(random.uniform(3.8, 5.0), 1),
                "total_shifts_posted": random.randint(50, 1000),
                "payment_reliability": round(random.uniform(0.90, 1.0), 2)
            },
            "account_status": random.choice(["Active", "Premium", "Enterprise"]),
            "registration_date": registration_date.strftime('%Y-%m-%d'),
            "financial": {
                "payment_method": random.choice(["Credit Card", "Bank Transfer"]),
                "verification_status": "Verified",
                "credit_limit": round(random.uniform(5000, 50000), 2)
            }
        }

    def generate_agency(self) -> Dict:
        registration_date = datetime.now() - timedelta(days=random.randint(30, 1825))
        return {
            "id": str(uuid.uuid4()),
            "profile": {
                "name": random.choice(self.agency_names),
                "agency_type": random.choice(["Hospitality Specialist", "General Staffing", "Executive Search"]),
                "agency_logo": f"agency_logo_{random.randint(1000, 9999)}.svg"
            },
            "location": self.generate_location(),
            "business_info": {
                "specializations": random.sample(self.industries, random.randint(2, 4)),
                "staff_count": random.randint(20, 200),
                "active_clients": random.randint(5, 50)
            },
            "metrics": {
                "rating": round(random.uniform(4.0, 5.0), 1),
                "total_placements": random.randint(1000, 10000),
                "success_rate": round(random.uniform(0.85, 0.98), 2)
            },
            "registration_date": registration_date.strftime('%Y-%m-%d'),
            "compliance": {
                "license_status": "Active",
                "insurance_verified": True,
                "tax_compliance": "Verified"
            }
        }

    def generate_platform_data(self, num_extrastaff: int = 500,
                             num_companies: int = 100,
                             num_agencies: int = 50) -> Dict:
        platform_data = {
            "extrastaff": [self.generate_extrastaff() for _ in range(num_extrastaff)],
            "companies": [self.generate_company() for _ in range(num_companies)],
            "agencies": [self.generate_agency() for _ in range(num_agencies)],
            "metadata": {
                "generation_date": datetime.now().strftime('%Y-%m-%d %H:%M:%S'),
                "total_users": num_extrastaff + num_companies + num_agencies,
                "version": "1.0"
            }
        }
        return platform_data

    def save_to_json(self, data: Dict, filename: str = "platform_data.json"):
        try:
            with open(filename, 'w') as f:
                json.dump(data, f, indent=2)
            print(f"Successfully saved data to {filename}")
        except Exception as e:
            print(f"Error saving data: {str(e)}")

def main():
    # Parse command line arguments
    if len(sys.argv) > 1:
        num_staff = int(sys.argv[1])
        num_companies = int(sys.argv[2])
        num_agencies = int(sys.argv[3])
    else:
        num_staff = 2
        num_companies = 2
        num_agencies = 2

    # Initialize generator
    generator = PlatformDataGenerator()
    
    # Generate platform data
    platform_data = generator.generate_platform_data(
        num_extrastaff=num_staff,
        num_companies=num_companies,
        num_agencies=num_agencies
    )
    
    # Save to JSON file
    output_file = "platform_data.json"
    generator.save_to_json(platform_data, output_file)
    
    # Print summary
    print("\nPlatform Data Generation Summary:")
    print(f"Total ExtraStaff: {len(platform_data['extrastaff'])}")
    print(f"Total Companies: {len(platform_data['companies'])}")
    print(f"Total Agencies: {len(platform_data['agencies'])}")
    print(f"Generation Date: {platform_data['metadata']['generation_date']}")

if __name__ == "__main__":
    main()
