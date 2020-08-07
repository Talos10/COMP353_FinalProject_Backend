module.exports = (sequelize, Sequelize) => {
    const Job = sequelize.define("job", {
      title: {
        type: Sequelize.STRING
      },
      description: {
        type: Sequelize.STRING
      },
      published: {
        type: Sequelize.BOOLEAN
      }
    });
  
    return Job;
  };