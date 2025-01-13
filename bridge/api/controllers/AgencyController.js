const AgencyService = require('../services/AgencyService');

class AgencyController {
  async getAgencyStaff(req, res, next) {
    try {
      const agencyId = req.user.id; // Assuming you have authentication middleware
      const staff = await AgencyService.getStaffForAgency(agencyId);
      res.json(staff);
    } catch (error) {
      next(error);
    }
  }

  async addStaffToAgency(req, res, next) {
    try {
      const agencyId = req.user.id;
      const { staffId } = req.body;
      await AgencyService.addStaffToAgency(agencyId, staffId);
      res.json({ message: 'Staff added to agency successfully' });
    } catch (error) {
      next(error);
    }
  }

  // ... other agency-related controller methods ...
}

module.exports = new AgencyController();
