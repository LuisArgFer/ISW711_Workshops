
import Category from "../models/Categories.js";

const obtenerCategories = async (req, res) => {
  const category = await Category.find().select("propiedad");
  res.json(Category);
};

const nuevoCategory = async (req, res) => {
  const category = new Category(req.body);
  Category.creador = req.usuario._id;

  try {
    const CategoryAlmacenado = await Category.save();
    res.json(CategoryAlmacenado);
  } catch (error) {
    console.log(error);
  }
};

const obtenerCategory = async (req, res) => {
  const { id } = req.params;

  const category = await Category.findById(id)
    .populate({
      path: "tareas",
      populate: { path: "completado", select: "nombre" },
    })
    .populate("colaboradores", "nombre email");

  if (!Category) {
    const error = new Error("No Encontrado");
    return res.status(404).json({ msg: error.message });
  }

  if (
    Category.creador.toString() !== req.usuario._id.toString() &&
    !Category.colaboradores.some(
      (colaborador) => colaborador._id.toString() === req.usuario._id.toString()
    )
  ) {
    const error = new Error("Acción No Válida");
    return res.status(401).json({ msg: error.message });
  }

  res.json(Category);
};

const editarCategory = async (req, res) => {
  const { id } = req.params;

  const category = await Category.findById(id);

  if (!category) {
    const error = new Error("No Encontrado");
    return res.status(404).json({ msg: error.message });
  }

  if (category.creador.toString() !== req.usuario._id.toString()) {
    const error = new Error("Acción No Válida");
    return res.status(401).json({ msg: error.message });
  }

  category.nombre = req.body.nombre || category.nombre;
  category.descripcion = req.body.descripcion || category.descripcion;
  category.fechaEntrega = req.body.fechaEntrega || category.fechaEntrega;
  category.cliente = req.body.cliente || category.cliente;

  try {
    const categoryAlmacenado = await category.save();
    res.json(categoryAlmacenado);
  } catch (error) {
    console.log(error);
  }
};

const eliminarCategory = async (req, res) => {
  const { id } = req.params;

  const category = await Category.findById(id);

  if (!category) {
    const error = new Error("No Encontrado");
    return res.status(404).json({ msg: error.message });
  }

  if (category.creador.toString() !== req.usuario._id.toString()) {
    const error = new Error("Acción No Válida");
    return res.status(401).json({ msg: error.message });
  }

  try {
    await Category.deleteOne();
    res.json({ msg: "Category Eliminado" });
  } catch (error) {
    console.log(error);
  }
};



export {
  obtenerCategories,
  nuevoCategory,
  obtenerCategory,
  editarCategory,
  eliminarCategory,
};
