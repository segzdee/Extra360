#!/usr/bin/env python3

"""
Advanced Platform Data Validation System
-------------------------------------
"""

import json
import logging
from pathlib import Path
from typing import Dict, List
from datetime import datetime

class DataValidator:
    def __init__(self):
        self.setup_logging()
        self.data_path = Path('data/platform_data.json')
        
    def setup_logging(self):
        """Initialize logging system"""
        Path('logs').mkdir(exist_ok=True)
        logging.basicConfig(
            level=logging.INFO,
            format='%(asctime)s - %(levelname)s - %(message)s',
            handlers=[
                logging.FileHandler('logs/validation.log'),
                logging.StreamHandler()
            ]
        )
        self.logger = logging.getLogger(__name__)

    def validate_data(self):
        """Execute data validation"""
        try:
            # Load data
            with open(self.data_path) as f:
                data = json.load(f)
            
            # Calculate metrics
            metrics = {
                'staff': self.validate_collection(data.get('extrastaff', [])),
                'companies': self.validate_collection(data.get('companies', [])),
                'agencies': self.validate_collection(data.get('agencies', []))
            }
            
            return metrics
            
        except Exception as e:
            self.logger.error(f"Validation error: {str(e)}")
            raise

    def validate_collection(self, items: List) -> Dict:
        """Validate collection of entities"""
        return {
            'total': len(items),
            'valid': len([i for i in items if self.is_valid(i)]),
            'invalid': len([i for i in items if not self.is_valid(i)])
        }

    def is_valid(self, item: Dict) -> bool:
        """Check if entity is valid"""
        return bool(item and isinstance(item, dict) and 'id' in item)

def main():
    """Main execution"""
    validator = DataValidator()
    try:
        results = validator.validate_data()
        
        print("\nValidation Results")
        print("=================")
        
        for entity_type, metrics in results.items():
            print(f"\n{entity_type.title()}:")
            print(f"Total: {metrics['total']}")
            print(f"Valid: {metrics['valid']}")
            print(f"Invalid: {metrics['invalid']}")
            
    except Exception as e:
        logging.error(f"System error: {str(e)}")
        return 1

if __name__ == "__main__":
    main()
