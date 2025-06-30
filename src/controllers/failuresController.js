const { Failures, User } = require("../models");

exports.addFailure = async (req, res) => {
  try {
    const {
      title,
      description,
      date,
      gravity,
      executionUserType,
      userExecution,
      partNumber,
      customFields,
    } = req.body;

    if (!description || !date || !gravity || !executionUserType) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const newFailure = await Failures.create({
      title,
      description,
      date,
      gravity,
      executionUserType,
      userExecution,
      partNumber,
      customFields,
      ship_id
    });

    return res.status(201).json({ message: "Failure created successfully", failure: newFailure });
  } catch (error) {
    console.error("Error adding failure:", error);
    return res.status(500).json({ error: "Error creating failure" });
  }
};

exports.getFailures = async (req, res) => {
  try {
    const { gravity, executionUserType, ship_id } = req.query;

    const whereClause = {};
    if (gravity) whereClause.gravity = gravity;
    if (executionUserType) whereClause.executionUserType = executionUserType;
    if (ship_id) whereClause.ship_id = ship_id;

    const failures = await Failures.findAll({
      where: whereClause,
      order: [["date", "DESC"]],
      include: [
        {
          model: User,
          as: "userExecutionData",
        },
      ],
    });

    return res.status(200).json({ failures });
  } catch (error) {
    console.error("Error fetching failures:", error);
    return res.status(500).json({ error: "Error retrieving failures" });
  }
};