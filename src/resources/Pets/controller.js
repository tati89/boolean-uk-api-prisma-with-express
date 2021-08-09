const dbClient = require("../../../utils/dbClient");

async function createAPet(req, res) {
  const newPet = req.body;

  try {
    const pet = await dbClient.pet.create({
      data: newPet,
    });
    res.json({ data: pet });
  } catch (error) {
    res.json({ error: error.message });
  }
}

async function deleteAPet(req, res) {
  const petId = Number(req.params.id);

  try {
    const pet = await dbClient.pet.delete({
      where: {
        id: petId,
      },
    });
    res.json({ deleted: pet });
  } catch (error) {
    res.json({ error: error.message });
  }
}

async function updateAPet(req, res) {
  const petId = Number(req.params.id);
  const newData = req.body;

  try {
    const exictingPet = await dbClient.pet.findUnique({
      where: {
        id: petId,
      },
    });
    if (exictingPet) {
      const pet = await dbClient.pet.update({
        where: {
          id: petId,
        },
        data: {
          ...exictingPet,
          ...newData,
        },
      });
      res.json({ updated_pet: pet });
    } else {
      res.json({ msg: "Pet doesn't exict" });
    }
  } catch (error) {
    res.json({ error: error.message });
  }
}

module.exports = { createAPet, deleteAPet, updateAPet };
