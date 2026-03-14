const ContactInfo = require('../models/contactInfo.model');

// Get site contact information (create if not exists)
const getContactInfo = async (req, res) => {
  try {
    let contactInfo = await ContactInfo.findOne({ _id: 'site-contact-info' });

    if (!contactInfo) {
      // Create default if not exists
      contactInfo = new ContactInfo({
        _id: 'site-contact-info',
        address: '123 E-commerce Street, New York, NY 10001',
        email: 'support@made4uu.com',
        phone: '+1 (555) 123-4567',
        hours: 'Mon - Fri: 9:00 AM - 6:00 PM\\nSat - Sun: 10:00 AM - 4:00 PM'
      });
      await contactInfo.save();
    }

    res.json({
      success: true,
      data: contactInfo
    });
  } catch (error) {
    console.error('Get contact info error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

// Update site contact information
const updateContactInfo = async (req, res) => {
  try {
    const { address, email, phone, hours } = req.body;

    if (!address || !email || !phone || !hours) {
      return res.status(400).json({
        success: false,
        message: 'All fields are required'
      });
    }

    const contactInfo = await ContactInfo.findOneAndUpdate(
      { _id: new mongoose.Types.ObjectId('site-contact-info') },
      { 
        address, 
        email, 
        phone, 
        hours
      },
      { 
        new: true, 
        upsert: true, 
        runValidators: true 
      }
    );

    res.json({
      success: true,
      message: 'Contact information updated successfully',
      data: contactInfo
    });
  } catch (error) {
    console.error('Update contact info error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

module.exports = {
  getContactInfo,
  updateContactInfo
};

