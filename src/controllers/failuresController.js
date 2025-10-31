const { Failures, User, Task, recurrencyType, Element, JobExecution, Job, 
  JobStatus, Maintenance_List, maintenanceLevel, ElemetModel, 
  VocalNote, TextNote, PhotographicNote, Team } = require("../models");

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
      ship_id
    } = req.body;

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
    const { gravity, executionUserType, ship_id, userId } = req.query;

    // -------- FAILURES --------
    const failuresWhere = {};
    if (gravity) failuresWhere.gravity = gravity;
    if (executionUserType) failuresWhere.executionUserType = executionUserType;
    if (ship_id) failuresWhere.ship_id = ship_id;

    const failures = await Failures.findAll({
      where: failuresWhere,
      order: [["date", "DESC"]],
      include: [
        {
          model: User,
          as: "userExecutionData",
          required: false,
        },
      ],
    });

    // -------- TASKS --------
    let tasks = [];
    if (ship_id) {
      const jobs = await JobExecution.findAll({
        where: { ship_id },
        order: [["ending_date", "ASC"]],
        include: [
          {
            model: Maintenance_List,
            as: "maintenance_list",
            required: true,
            include: [
              {
                model: maintenanceLevel,
                as: "maintenance_level",
                required: false,
              },
              {
                model: recurrencyType,
                as: "recurrencyType",
                required: false,
              },
            ],
          },
          {
            model: recurrencyType,
            as: "recurrencyType",
            required: false,
          },
          {
            model: JobStatus,
            as: "status",
            required: false,
          },
          {
            model: Element,
            as: "Element",
            required: false,
            include: [
              {
                model: ElemetModel,
                as: "element_model",
                required: false,
              },
            ],
          },
          {
            model: VocalNote,
            as: "vocalNotes",
            where: { type: "maintenance" },
            required: false,
          },
          {
            model: TextNote,
            as: "textNotes",
            where: { type: "maintenance" },
            required: false,
          },
          {
            model: PhotographicNote,
            as: "photographicNotes",
            where: { type: "maintenance" },
            required: false,
          },
        ],
      });

      // 🔧 Filtriamo solo le checklist con valore "2"
      tasks = jobs.filter(
        (job) => job.maintenance_list?.Check_List === "2"
      );
    }

    // -------- RESPONSE --------
    return res.status(200).json({
      failures,
      tasks,
    });
  } catch (error) {
    console.error("Error fetching failures/tasks:", error);
    return res
      .status(500)
      .json({ error: "Error retrieving failures and tasks" });
  }
};

