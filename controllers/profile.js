const handleProfile = (req, res, db) => {
	const { id } = req.params;
	db("users")
		.where("id", "=", id)
		.returning("*")
		.then((user) => res.json(user))
		.catch((err) => res.status(400).json("Error occured."));
};

module.exports = {
	handleProfile,
};
