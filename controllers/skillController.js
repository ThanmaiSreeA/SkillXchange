import Skill from "../models/SkillModel.js"; // (uppercase 'S' matches file name)


export const createSkill = async (req, res) => {
  try {
    const { skillName, description, category, type } = req.body;

    const newSkill = new Skill({
      userId: req.user.id, // From JWT middleware
      skillName,
      description,
      category,
      type
    });

    await newSkill.save();
    res.status(201).json({ message: "Skill posted successfully", skill: newSkill });
  } catch (err) {
    res.status(500).json({ message: "Error posting skill", error: err.message });
  }
};

export const getAllSkills = async (req, res) => {
  try {
    const skills = await Skill.find().populate("userId", "name email");
    res.json(skills);
  } catch (err) {
    res.status(500).json({ message: "Error fetching skills" });
  }
};

export const getMySkills = async (req, res) => {
  try {
    const mySkills = await Skill.find({ userId: req.user.id });
    res.json(mySkills);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

export const deleteSkill = async (req, res) => {
  try {
    const skill = await Skill.findById(req.params.id);

    if (!skill) {
      return res.status(404).json({ message: 'Skill not found' });
    }

    if (skill.userId.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Unauthorized' });
    }

    await skill.deleteOne(); // or skill.remove() depending on your Mongoose version

    res.json({ message: 'Skill deleted' });
  } catch (err) {
    console.error("Delete Skill Error:", err); // <-- This is the key line
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};


export const updateSkill = async (req, res) => {
  try {
    const skill = await Skill.findById(req.params.id);

    if (!skill) return res.status(404).json({ message: 'Skill not found' });
    if (skill.userId.toString() !== req.user.id)
      return res.status(403).json({ message: 'Unauthorized' });

    const { skillName, description, category, type } = req.body;

    skill.skillName = skillName || skill.skillName;
    skill.description = description || skill.description;
    skill.category = category || skill.category;
    skill.type = type || skill.type;

    await skill.save();

    res.json(skill);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};
