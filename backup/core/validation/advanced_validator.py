#!/usr/bin/env python3

import json
import logging
from pathlib import Path
from typing import Dict, List, Set
from datetime import datetime

class ValidationMetrics:
    def __init__(self):
        self.start_time = datetime.now()
        self.total_processed = 0
        self.validation_scores = {}
        self.data_quality = {}

class AdvancedValidator:
    def __init__(self):
        self.setup_system()
        self.metrics = ValidationMetrics()
        self.validation_schemas = {
            'extrastaff': {
                'required': {'id', 'profile', 'metrics'},
                'profile_fields': {'name', 'industry', 'skills'}
            },
            'companies': {
                'required': {'id', 'profile'},
                'profile_fields': {'name', 'industry', 'requirements'}
            },
            'agencies': {
                'required': {'id', 'profile'},
                'profile_fields': {'name', 'industry_focus', 'capabilities'}
            }
        }

    def setup_system(self):
        Path('logs').mkdir(exist_ok=True)
        Path('reports').mkdir(exist_ok=True)
        logging.basicConfig(
            level=logging.INFO,
            format='%(asctime)s - %(levelname)s - %(message)s',
            handlers=[
                logging.FileHandler('logs/validation.log'),
                logging.StreamHandler()
            ]
        )
        self.logger = logging.getLogger(__name__)

    def validate_platform_data(self):
        try:
            with open('data/platform_data.json') as f:
                data = json.load(f)

            results = {
                'extrastaff': self.validate_collection(data.get('extrastaff', []), 'extrastaff'),
                'companies': self.validate_collection(data.get('companies', []), 'companies'),
                'agencies': self.validate_collection(data.get('agencies', []), 'agencies')
            }

            self.generate_report(results)
            return results

        except Exception as e:
            self.logger.error(f"Validation error: {str(e)}")
            raise

    def validate_collection(self, entities: List[Dict], entity_type: str) -> Dict:
        schema = self.validation_schemas[entity_type]
        metrics = {
            'total': len(entities),
            'valid': 0,
            'invalid': 0,
            'field_completeness': {},
            'data_quality': {
                'complete': 0,
                'partial': 0,
                'invalid': 0
            }
        }

        for entity in entities:
            result = self.validate_entity(entity, schema)
            if result['valid']:
                metrics['valid'] += 1
                metrics['data_quality']['complete'] += 1
            else:
                metrics['invalid'] += 1
                metrics['data_quality']['invalid'] += 1

        return metrics

    def validate_entity(self, entity: Dict, schema: Dict) -> Dict:
        return {
            'valid': bool(
                isinstance(entity, dict) and
                all(field in entity for field in schema['required']) and
                isinstance(entity.get('profile'), dict) and
                all(field in entity['profile'] for field in schema['profile_fields'])
            )
        }

    def generate_report(self, results: Dict):
        report = {
            'timestamp': datetime.now().isoformat(),
            'summary': results,
            'metrics': {
                'execution_time': str(datetime.now() - self.metrics.start_time)
            }
        }

        report_path = Path('reports') / f'validation_report_{datetime.now().strftime("%Y%m%d_%H%M%S")}.json'
        with open(report_path, 'w') as f:
            json.dump(report, f, indent=2)

def main():
    validator = AdvancedValidator()
    try:
        results = validator.validate_platform_data()
        
        print("\nValidation Results")
        print("==================")
        
        for entity_type, metrics in results.items():
            print(f"\n{entity_type.title()}:")
            print(f"Total: {metrics['total']}")
            print(f"Valid: {metrics['valid']}")
            print(f"Invalid: {metrics['invalid']}")
            print("\nData Quality:")
            print(f"Complete: {metrics['data_quality']['complete']}")
            print(f"Invalid: {metrics['data_quality']['invalid']}")
            
    except Exception as e:
        logging.error(f"System error: {str(e)}")
        return 1

if __name__ == "__main__":
    main()
