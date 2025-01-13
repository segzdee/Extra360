#!/usr/bin/env python3

import json
import logging
import sys
from pathlib import Path
from datetime import datetime
import matplotlib.pyplot as plt
import seaborn as sns
import pandas as pd

class DataValidator:
    def __init__(self):
        self.setup_directories()
        self.setup_logging()
        self.load_validation_rules()
        
    def setup_directories(self):
        for dir_name in ['logs', 'reports', 'visualizations']:
            Path(dir_name).mkdir(exist_ok=True)
            
    def setup_logging(self):
        logging.basicConfig(
            level=logging.INFO,
            format='%(asctime)s - %(levelname)s - %(message)s',
            handlers=[
                logging.FileHandler('logs/validation.log'),
                logging.StreamHandler()
            ]
        )
        self.logger = logging.getLogger(__name__)
        
    def load_validation_rules(self):
        self.rules = {
            'extrastaff': {
                'required_fields': ['id', 'profile', 'metrics'],
                'profile_fields': ['name', 'industry', 'skills'],
                'metrics_fields': ['rating', 'reliability'],
                'value_ranges': {
                    'metrics.rating': (0, 5),
                    'metrics.reliability': (0, 1)
                }
            },
            'companies': {
                'required_fields': ['id', 'profile'],
                'profile_fields': ['name', 'industry', 'requirements'],
            },
            'agencies': {
                'required_fields': ['id', 'profile'],
                'profile_fields': ['name', 'industry_focus', 'capabilities']
            }
        }

    def validate_data(self, data_file='data/platform_data.json'):
        try:
            with open(data_file) as f:
                data = json.load(f)
                
            results = {}
            for entity_type in ['extrastaff', 'companies', 'agencies']:
                results[entity_type] = self.validate_entities(
                    data.get(entity_type, []),
                    self.rules[entity_type]
                )
                
            self.generate_report(results)
            self.create_visualizations(results)
            return results
            
        except Exception as e:
            self.logger.error(f"Validation error: {e}")
            raise

    def validate_entities(self, entities, rules):
        metrics = {
            'total': len(entities),
            'valid': 0,
            'invalid': 0,
            'field_completeness': {},
            'value_distributions': {},
            'validation_details': []
        }
        
        for entity in entities:
            result = self.validate_entity(entity, rules)
            if result['valid']:
                metrics['valid'] += 1
            else:
                metrics['invalid'] += 1
            metrics['validation_details'].append(result)
            
        return metrics

    def validate_entity(self, entity, rules):
        result = {'valid': True, 'errors': []}
        
        # Check required fields
        for field in rules['required_fields']:
            if field not in entity:
                result['valid'] = False
                result['errors'].append(f"Missing required field: {field}")
        
        # Check profile fields
        if 'profile' in entity:
            for field in rules['profile_fields']:
                if field not in entity['profile']:
                    result['valid'] = False
                    result['errors'].append(f"Missing profile field: {field}")
        
        # Check value ranges
        for field, (min_val, max_val) in rules.get('value_ranges', {}).items():
            if '.' in field:
                parent, child = field.split('.')
                if parent in entity and child in entity[parent]:
                    value = entity[parent][child]
                    if not min_val <= value <= max_val:
                        result['valid'] = False
                        result['errors'].append(
                            f"Value out of range for {field}: {value}"
                        )
        
        return result

    def generate_report(self, results):
        report = {
            'timestamp': datetime.now().isoformat(),
            'results': results,
            'summary': {
                'total_entities': sum(
                    m['total'] for m in results.values()
                ),
                'total_valid': sum(
                    m['valid'] for m in results.values()
                ),
                'total_invalid': sum(
                    m['invalid'] for m in results.values()
                )
            }
        }
        
        report_file = f"reports/validation_report_{datetime.now().strftime('%Y%m%d_%H%M%S')}.json"
        with open(report_file, 'w') as f:
            json.dump(report, f, indent=2)

    def create_visualizations(self, results):
        self.create_entity_distribution_plot(results)
        self.create_validity_plot(results)
        
    def create_entity_distribution_plot(self, results):
        plt.figure(figsize=(10, 6))
        entities = list(results.keys())
        counts = [results[e]['total'] for e in entities]
        
        plt.bar(entities, counts)
        plt.title('Entity Distribution')
        plt.xlabel('Entity Type')
        plt.ylabel('Count')
        
        plt.savefig('visualizations/entity_distribution.png')
        plt.close()
        
    def create_validity_plot(self, results):
        plt.figure(figsize=(12, 6))
        
        entities = list(results.keys())
        valid = [results[e]['valid'] for e in entities]
        invalid = [results[e]['invalid'] for e in entities]
        
        x = range(len(entities))
        plt.bar(x, valid, label='Valid')
        plt.bar(x, invalid, bottom=valid, label='Invalid')
        
        plt.xticks(x, entities)
        plt.title('Data Validity Distribution')
        plt.xlabel('Entity Type')
        plt.ylabel('Count')
        plt.legend()
        
        plt.savefig('visualizations/validity_distribution.png')
        plt.close()

def main():
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
            print(f"Validity Rate: {(metrics['valid']/metrics['total']*100):.1f}%")
            
        print("\nVisualizations generated in: visualizations/")
        print("Detailed report generated in: reports/")
        
    except Exception as e:
        logging.error(f"System error: {e}")
        return 1

if __name__ == "__main__":
    main()
