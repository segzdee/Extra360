const ShiftService = require('../services/ShiftService'); 
const ApplicationService = require('../services/ApplicationService'); 

class StaffController {
  async getShifts(req, res, next) {
    try {
      const { skills, availability, ...otherFilters } = req.query; 
      const shifts = await ShiftService.getAvailableShifts(skills, availability, otherFilters);
      res.json(shifts);
    } catch (error) {
      next(error);
    }
  }

  async applyForShift(req, res, next) {
    try {
      const shiftId = req.params.shiftId;
      const staffId = req.user.id; 
      await ApplicationService.createApplication(shiftId, staffId);
      res.json({ message: 'Application submitted successfully' });
    } catch (error) {
      next(error);
    }
  }

  // ... other staff-related controller methods ...
}

module.exports = new StaffController();
