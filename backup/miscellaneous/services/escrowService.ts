import axios from 'axios';
import { 
  EscrowTransaction, 
  TransactionStatus, 
  TransactionType, 
  EscrowAccount 
} from './escrowTypes';

class EscrowService {
  private baseUrl = '/api/escrow';

  // Get user's escrow account details
  async getEscrowAccount(userId: string): Promise<EscrowAccount | null> {
    try {
      const response = await axios.get(`${this.baseUrl}/account/${userId}`);
      return response.data;
    } catch (error) {
      console.error('Failed to fetch escrow account', error);
      return null;
    }
  }

  // Create escrow transaction for a shift
  async createShiftTransaction(
    shiftId: string, 
    clientId: string, 
    amount: number
  ): Promise<EscrowTransaction | null> {
    try {
      const response = await axios.post(`${this.baseUrl}/transaction`, {
        shiftId,
        userId: clientId,
        amount,
        type: TransactionType.SHIFT_PAYMENT,
        status: TransactionStatus.PENDING
      });
      return response.data;
    } catch (error) {
      console.error('Failed to create escrow transaction', error);
      return null;
    }
  }

  // Release funds after shift completion
  async releaseShiftFunds(
    transactionId: string, 
    staffId: string
  ): Promise<boolean> {
    try {
      await axios.patch(`${this.baseUrl}/transaction/${transactionId}/release`, {
        staffId
      });
      return true;
    } catch (error) {
      console.error('Failed to release shift funds', error);
      return false;
    }
  }

  // Initiate dispute
  async initiateDispute(
    transactionId: string, 
    reason: string
  ): Promise<boolean> {
    try {
      await axios.post(`${this.baseUrl}/dispute`, {
        transactionId,
        reason
      });
      return true;
    } catch (error) {
      console.error('Failed to initiate dispute', error);
      return false;
    }
  }

  // Get transaction history
  async getTransactionHistory(
    userId: string, 
    filters?: {
      startDate?: Date, 
      endDate?: Date, 
      status?: TransactionStatus
    }
  ): Promise<EscrowTransaction[]> {
    try {
      const response = await axios.get(`${this.baseUrl}/history/${userId}`, {
        params: filters
      });
      return response.data;
    } catch (error) {
      console.error('Failed to fetch transaction history', error);
      return [];
    }
  }
}

export default new EscrowService();
