const { recurrencyType, maintenanceLevel, Maintenance_List, Team,
  JobExecution, Job, JobStatus, Element, ElemetModel, StatusCommentsMaintenance, VocalNote, 
  TextNote, PhotographicNote, User } = require("../models");
const { Op } = require("sequelize");

exports.getJobs = async (req, res) => {
  try {
    const { type_id, ship_id, user_id } = req.query;

    if (!ship_id || !user_id) {
      return res.status(400).json({ error: "Missing ship_id or user_id" });
    }

    const whereClause = {
      ship_id,
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
          include: [
            {
              model: Maintenance_List,
              as: 'maintenance_list',
              include: [
                {
                  model: maintenanceLevel,
                  as: 'maintenance_level',
                }
              ]
            },
          ]
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
        }
      ],
    });


    res.status(200).json({ jobs });

  } catch (error) {
    console.error("Error fetching jobs:", error);
    res.status(500).json({ error: "Error fetching jobs" });
  }
};

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

exports.getGeneralTypes = async (req, res) => {
  try {

    const generalTypes = await recurrencyType.findAll();

    return res.status(200).json(generalTypes);

  } catch (error) {
    console.error("Error fetching maintenance types:", error);
    return res.status(500).json({ error: "Error fetching maintenance types" });
  }
};

exports.getMaintenanceLevels = async (req, res) => {
  try {

    const generalLevels = await maintenanceLevel.findAll();

    return res.status(200).json(generalLevels);

  } catch (error) {
    console.error("Error fetching maintenance types:", error);
    return res.status(500).json({ error: "Error fetching maintenance types" });
  }
};

exports.getJob = async (req, res) => {
  try {
    const { taskId } = req.query;

    if (!taskId) {
      return res.status(400).json({ error: "Missing taskId" });
    }

    const whereClause = {
      id: taskId,
    };

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
          include: [
            {
              model: Maintenance_List,
              as: 'maintenance_list',
              include: [
                {
                  model: maintenanceLevel,
                  as: 'maintenance_level',
                }
              ]
            },
            {
              model: Team,
              as: 'team',
              include: [
                {
                  model: User,
                  as: 'teamLeader',
                }
              ]
            },
          ]
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

exports.updateStatus = async (req, res) => {
  try {
    const jobExecutionId = req.params.id;
    const { status_id } = req.body;

    if (!status_id || ![1, 2, 3, 4, 5, 6].includes(Number(status_id))) {
      return res.status(400).json({ error: "Invalid or missing status_id. Allowed values: 1 (Attivo), 2 (In pausa), 3 (Non attivo)" });
    }

    const jobExecution = await JobExecution.findByPk(jobExecutionId);

    if (!jobExecution) {
      return res.status(404).json({ error: "JobExecution not found" });
    }
 
    jobExecution.status_id = status_id;

    if(status_id){
      jobExecution.pauseDate = Date.now();
    }
 
    await jobExecution.save();

    res.status(200).json({ message: "Status updated successfully", jobExecution });

  } catch (error) {
    console.error("Error updating status:", error);
    res.status(500).json({ error: "Error updating status" });
  }
};

exports.saveStatusComment = async (req, res) => {
  try {
    const jobExecutionId = req.params.id;
    const {
      date,
      date_flag,
      reason,
      only_this,
      all_from_this_product,
      old_status_id,
      new_status_id,
    } = req.body;

    if (!new_status_id || ![1, 2, 3].includes(Number(new_status_id))) {
      return res.status(400).json({
        error: "Invalid or missing new_status_id. Allowed values: 1 (Attivo), 2 (In pausa), 3 (Non attivo)",
      });
    }

    const jobExecution = await JobExecution.findByPk(jobExecutionId);
    if (!jobExecution) {
      return res.status(404).json({ error: "JobExecution not found" });
    }

    // Aggiorna stato jobExecution
    jobExecution.status_id = new_status_id;
    await jobExecution.save();

    // Salva commento
    await StatusCommentsMaintenance.create({
      maintenance_id: jobExecutionId,
      date: date || new Date(),
      date_flag: date_flag || null,
      reason: reason || null,
      only_this: only_this || null,
      all_from_this_product: all_from_this_product || null,
      old_status_id: old_status_id || jobExecution.status_id, // fallback
      new_status_id,
    });

    res.status(200).json({
      message: "Status and comment saved successfully",
      jobExecution,
    });
  } catch (error) {
    console.error("Error updating status and saving comment:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.reportAnomaly = async (req, res) => {
  try {
    const jobExecutionId = req.params.id;
    const { mark } = req.body;

    if (!mark || ![1, 2, 3].includes(Number(mark))) {
      return res.status(400).json({ error: "Invalid or missing status_id. Allowed values: 1 (Attivo), 2 (In pausa), 3 (Non attivo)" });
    }

    const jobExecution = await JobExecution.findByPk(jobExecutionId);

    if (!jobExecution) {
      return res.status(404).json({ error: "JobExecution not found" });
    }

    jobExecution.execution_state = mark;
    await jobExecution.save();

    res.status(200).json({ message: "Status updated successfully", jobExecution });

  } catch (error) {
    console.error("Error updating status:", error);
    res.status(500).json({ error: "Error updating status" });
  }
};

exports.markAsOk = async (req, res) => {
  try {
    const jobExecutionId = req.params.id;
    const mark = 1;
    const { brand, model, part_number, description, maintenanceList_id } = req.body;

    if (!mark || ![1, 2, 3].includes(Number(mark))) {
      return res.status(400).json({ error: "Invalid or missing status_id. Allowed values: 1 (Attivo), 2 (In pausa), 3 (Non attivo)" });
    }

    const jobExecution = await JobExecution.findByPk(jobExecutionId);

    if (!jobExecution) {
      return res.status(404).json({ error: "JobExecution not found" });
    }

    jobExecution.execution_state = mark;
    await jobExecution.save();

    res.status(200).json({ message: "Status updated successfully", jobExecution });

  } catch (error) {
    console.error("Error updating status:", error);
    res.status(500).json({ error: "Error updating status" });
  }
};