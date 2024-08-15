const db = require('../config/db');
const getList = async (NE_name) => {
    try {
      let query = 'SELECT * FROM tests ';
      let params = [];
      
      if (NE_name) {
          query += ' AND name ILIKE $1'; // Case-insensitive search
          params.push(`%${NE_name}%`);
        }
  
        
        console.log("query ",query);
        const newsList = await db.any(query);
        
        console.log("newsList ",newsList);
      return {
        success: true,
        newsData: newsList,
      };
    } catch (error) {
      throw new Error('Failed to get Books: ' + error.message);
    }
  };
module.exports = { getList };
