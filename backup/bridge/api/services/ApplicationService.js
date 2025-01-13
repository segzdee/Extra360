const Application = require('../models/Application'); // Assuming you have an Application model

class ApplicationService {
  async createApplication(shiftId, staffId) {
    try {
      const existingApplication = await Application.findOne({ where: { shiftId, staffId } });
      if (existingApplication) {
        throw new Error('You have already applied for this shift.');
      }
      const application = await Application.create({ shiftId, staffId });
      return application;
    } catch (error) {
      throw error;
    }
  }

  // ... other application-related service methods ...
}

module.exports = new ApplicationService();
