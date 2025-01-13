const User = require('../models/User');

class AgencyService {
  async getStaffForAgency(agencyId) {
    try {
      const staff = await User.findAll({ where: { agencyId } });
      return staff;
    } catch (error) {
      throw error;
    }
  }

  async addStaffToAgency(agencyId, staffId) {
    try {
      // You might want to add checks to ensure the user exists and has the 'staff' role
      const staff = await User.findByPk(staffId);
      if (!staff) {
        throw new Error('Staff member not found');
      }
      staff.agencyId = agencyId;
      await staff.save();
    } catch (error) {
      throw error;
    }
  }

  // ... other agency-related service methods ...
}

module.exports = new AgencyService();
