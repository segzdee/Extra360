import axios from 'axios';
import { TaxInformation } from '../../types/financial/paymentTypes';

export interface TaxCalculationRequest {
  income: number;
  country: string;
  employmentType: 'freelance' | 'contract' | 'full-time';
  year: number;
}

export interface TaxReport {
  totalIncome: number;
  taxableIncome: number;
  totalTaxDue: number;
  effectiveTaxRate: number;
  deductions: number[];
  taxBreakdown: Record<string, number>;
}

class TaxComplianceService {
  private baseUrl = '/api/tax-compliance';

  // Calculate tax liability
  async calculateTaxLiability(
    request: TaxCalculationRequest
  ): Promise<TaxReport | null> {
    try {
      const response = await axios.post(`${this.baseUrl}/calculate`, request);
      return response.data;
    } catch (error) {
      console.error('Tax calculation failed', error);
      return null;
    }
  }

  // Generate tax report
  async generateTaxReport(
    userId: string, 
    year: number
  ): Promise<TaxReport | null> {
    try {
      const response = await axios.get(`${this.baseUrl}/report/${userId}`, {
        params: { year }
      });
      return response.data;
    } catch (error) {
      console.error('Tax report generation failed', error);
      return null;
    }
  }

  // Get tax compliance status
  async checkTaxComplianceStatus(
    userId: string
  ): Promise<{
    isCompliant: boolean;
    warnings: string[];
    requiredActions: string[];
  }> {
    try {
      const response = await axios.get(`${this.baseUrl}/status/${userId}`);
      return response.data;
    } catch (error) {
      console.error('Tax compliance check failed', error);
      return {
        isCompliant: false,
        warnings: [],
        requiredActions: []
      };
    }
  }
}

export default new TaxComplianceService();
