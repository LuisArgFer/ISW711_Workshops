import NewsSourses from "../models/NewsSourses.js";
import Usuario from "../models/Usuario.js";

const obtenerNewsSourses = async (req, res) => {
  const newsSourses = await NewsSourses.find({
    $or: [
      { user_id: { $in: req.usuario } },
      { creador: { $in: req.usuario } },
    ],
  }).select("-tareas");
  res.json(newsSourses);
};

const nuevoNewsSourse = async (req, res) => {
  const NewsSourses = new NewsSourses(req.body);
  NewsSourses.creador = req.usuario._id;

  try {
    const NewsSoursesAlmacenado = await NewsSourses.save();
    res.json(NewsSoursesAlmacenado);
  } catch (error) {
    console.log(error);
  }
};

const obtenerNewsSourse = async (req, res) => {
  const { id } = req.params;

  const NewsSourses = await NewsSourses.findById(id)
    .populate({
      path: "tareas",
      populate: { path: "completado", select: "nombre" },
    })
    .populate("colaboradores", "nombre email");

  if (!NewsSourses) {
    const error = new Error("No Encontrado");
    return res.status(404).json({ msg: error.message });
  }

  if (
    NewsSourses.creador.toString() !== req.usuario._id.toString() &&
    !NewsSourses.colaboradores.some(
      (colaborador) => colaborador._id.toString() === req.usuario._id.toString()
    )
  ) {
    const error = new Error("Acción No Válida");
    return res.status(401).json({ msg: error.message });
  }

  res.json(NewsSourses);
};

const editarNewsSourses = async (req, res) => {
  const { id } = req.params;

  const NewsSourses = await NewsSourses.findById(id);

  if (!NewsSourses) {
    const error = new Error("No Encontrado");
    return res.status(404).json({ msg: error.message });
  }

  if (NewsSourses.creador.toString() !== req.usuario._id.toString()) {
    const error = new Error("Acción No Válida");
    return res.status(401).json({ msg: error.message });
  }

  NewsSourses.nombre = req.body.nombre || NewsSourses.nombre;
  NewsSourses.descripcion = req.body.descripcion || NewsSourses.descripcion;
  NewsSourses.fechaEntrega = req.body.fechaEntrega || NewsSourses.fechaEntrega;
  NewsSourses.cliente = req.body.cliente || NewsSourses.cliente;

  try {
    const NewsSoursesAlmacenado = await NewsSourses.save();
    res.json(NewsSoursesAlmacenado);
  } catch (error) {
    console.log(error);
  }
};

const eliminarNewsSourses = async (req, res) => {
  const { id } = req.params;

  const NewsSourses = await NewsSourses.findById(id);

  if (!NewsSourses) {
    const error = new Error("No Encontrado");
    return res.status(404).json({ msg: error.message });
  }

  if (NewsSourses.creador.toString() !== req.usuario._id.toString()) {
    const error = new Error("Acción No Válida");
    return res.status(401).json({ msg: error.message });
  }

  try {
    await NewsSourses.deleteOne();
    res.json({ msg: "NewsSourses Eliminado" });
  } catch (error) {
    console.log(error);
  }
};



export {
  obtenerNewsSourses,
  nuevoNewsSourse,
  obtenerNewsSourse,
  editarNewsSourses,
  eliminarNewsSourses,
};
