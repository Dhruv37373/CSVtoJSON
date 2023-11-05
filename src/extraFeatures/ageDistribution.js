const { Sequelize } = require('sequelize');
const User = require('../models/User'); 

async function calculateAgeDistribution() {
  try {
    
    const users = await User.findAll(); // fetching all users

    // Initialize counters for age groups
    let ageGroupCount = {
      '< 20': 0,
      '20 to 40': 0,
      '40 to 60': 0,
      '> 60': 0,
    };

    // Calculating age distribution
    for (const user of users) {
      const age = user.age;

      if (age < 20) {
        ageGroupCount['< 20']++;
      } else if (age >= 20 && age <= 40) {
        ageGroupCount['20 to 40']++;
      } else if (age > 40 && age <= 60) {
        ageGroupCount['40 to 60']++;
      } else {
        ageGroupCount['> 60']++;
      }
    }

    const totalCount = users.length;

    console.log('Age-Group  | % Distribution');
    console.log('------------------------------');
    for (const group in ageGroupCount) {
      const percentage = ((ageGroupCount[group] / totalCount) * 100).toFixed(2);
      console.log(`${group.padEnd(10)} | ${percentage}`);
    }
  } catch (error) {
    console.error('Error calculating age distribution:', error);
  }
}


module.exports = calculateAgeDistribution;