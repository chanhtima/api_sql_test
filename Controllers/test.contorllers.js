const test =require('../Models/test.model')

exports.getList = async (req, res) => {
   
    try {
        const { NE_name } = req.query;

        let result = await test.getList( NE_name);

    res.status(200).json(result);
  } catch (error) {
    res.status(401).json({
      message: "Failed to get Books",
      error: error.message,
    });
  }
};
exports.create = async (req, res) => {
    const {name} =req.body;
    try {
      
    } catch (error) {
      
    }
};