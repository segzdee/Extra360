import { MicroserviceType } from '../types/architecture';

export enum TestType {
  UNIT = 'unit',
  INTEGRATION = 'integration',
  E2E = 'end_to_end',
  PERFORMANCE = 'performance',
  SECURITY = 'security'
}

export interface TestCase {
  id: string;
  name: string;
  type: TestType;
  description: string;
  serviceType: MicroserviceType;
  expectedOutcome: any;
  criticalityScore: number; // 1-10
}

export interface TestReport {
  testCaseId: string;
  status: 'passed' | 'failed' | 'skipped';
  duration: number;
  errorDetails?: string;
  coveragePercentage?: number;
}
