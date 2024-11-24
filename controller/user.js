const userService = require("../service/user");
exports.postSearch = async (req, res) => {
    try {
        const email = req.body.email;
        const password = req.body.password;

        const response = await userService.login(email,password);
        res.json(response);
    } catch (error) {
        console.error(`Error occurred JSON: ${error}`);

        res.status(500).json({ error: error.message });
    }
};