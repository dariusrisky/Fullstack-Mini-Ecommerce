const { prisma } = require("./utils/prismaClient");

const createCategrory = async (req, res) => {
  const { name } = req.body;
  if (!name) {
    return res.status(400).json({ msg: "Name is required." });
  }
  try {
    const category = await prisma.category.create({
      data: {
        name: name,
      },
    });

    res.status(201).json({
      msg: "Category created successfully.",
      category: {
        id: category.id,
        name: category.name,
      },
    });
  } catch (error) {
    console.error("Error creating category:", error);
    res
      .status(500)
      .json({ error: "An error occurred while creating the category." });
  }
};

const viewCategories = async (req, res) => {
  try {
    const categories = await prisma.category.findMany();
    res.status(200).json({
      msg: "Categories retrieved successfully.",
      categories,
    });
  } catch (error) {
    console.error("Error retrieving categories:", error);
    res
      .status(500)
      .json({ error: "An error occurred while retrieving categories." });
  }
};

const removeCategory = async (req, res) => {
  try {
    const id = req.params.id;
    if (!id) {
      return res.status(400).json({ msg: "Category ID is required." });
    }
    const category = await prisma.category.delete({
      where: { id: id },
    });
    res.status(200).json({
      msg: "Category removed successfully.",
      category,
    });
  } catch (error) {
    console.error("Error removing category:", error);
    res
      .status(500)
      .json({ error: "An error occurred while removing the category." });
  }
};

module.exports = {
  createCategrory,
  viewCategories,
  removeCategory,
};
