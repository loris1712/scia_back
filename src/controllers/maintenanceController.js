const { recurrencyType, JobExecution, Job, JobStatus, Element, ElemetModel } = require("../models");
const { Op } = require("sequelize");

exports.getTypes = async (req, res) => {
  try {
    const { ship_id, user_id } = req.query;

    if (!ship_id || !user_id) {
      return res.status(400).json({ error: "Missing ship_id or user_id" });
    }

    const maintenanceTypes = await recurrencyType.findAll();
    const formattedData = [];

    for (const type of maintenanceTypes) {
      const recurrencyTypeId = type.id;

      const lastExecution = await JobExecution.findOne({
        where: {
          recurrency_type_id: recurrencyTypeId,
          ship_id,
          user_id,
          execution_date: { [Op.ne]: null }
        },
        order: [["execution_date", "DESC"]]
      });

      const upcomingDue = await JobExecution.findOne({
        where: {
          recurrency_type_id: recurrencyTypeId,
          ship_id,
          user_id,
          ending_date: {
            [Op.gt]: new Date()
          }
        },
        order: [["ending_date", "ASC"]]
      });

      const jobCount = await JobExecution.count({
        where: {
          recurrency_type_id: recurrencyTypeId,
          ship_id,
          user_id
        }
      });

      formattedData.push({
        id: recurrencyTypeId,
        title: type.name,
        tasks: jobCount,
        lastExecution: lastExecution?.execution_date?.toISOString() || "N/A",
        dueDate: upcomingDue?.ending_date?.toISOString() || "N/A"
      });
    }

    return res.status(200).json({ maintenanceTypes: formattedData });

  } catch (error) {
    console.error("Error fetching maintenance types:", error);
    return res.status(500).json({ error: "Error fetching maintenance types" });
  }
};

exports.getJobs = async (req, res) => {
  try {
    const { type_id, ship_id, user_id } = req.query;

    if (!ship_id || !user_id) {
      return res.status(400).json({ error: "Missing ship_id or user_id" });
    }

    const whereClause = {
      ship_id,
      user_id,
    };

    if (type_id !== "undefined") {
      whereClause.recurrency_type_id = type_id;
    }

    const jobs = await JobExecution.findAll({
      where: whereClause,
      order: [["ending_date", "ASC"]],
      include: [
        {
          model: recurrencyType,
          as: 'recurrencyType',
        },
        {
          model: Job,
          as: 'job',
        },
        {
          model: JobStatus,
          as: 'status',
        },
        {
          model: Element,
          as: 'Element',
          include: [
            {
              model: ElemetModel,
              as: 'element_model',
            }
          ],
        },
      ],
    });

    res.status(200).json({ jobs });

  } catch (error) {
    console.error("Error fetching jobs:", error);
    res.status(500).json({ error: "Error fetching jobs" });
  }
};