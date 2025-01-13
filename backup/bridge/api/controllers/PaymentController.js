const PaymentService = require('../services/PaymentService');

class PaymentController {
  async processPayment(req, res, next) {
    try {
      const { shiftId, amount } = req.body;
      const clientId = req.user.id; // Assuming you have authentication middleware
      await PaymentService.processShiftPayment(shiftId, clientId, amount);
      res.json({ message: 'Payment processed successfully' });
    } catch (error) {
      next(error);
    }
  }

  // ... other payment-related controller methods ...
}

module.exports = new PaymentController();
