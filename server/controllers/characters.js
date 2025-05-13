const characters = [{ name: "Waldo", x: "0.61", y: "0.38", radius: 0.05 }];

export const getCharacters = (req, res) => {
  res.json(characters.map(({ name }) => ({ name })));
};

export const validateClick = (req, res) => {
  const { name, x, y } = req.body;

  const character = characters.find((c) => c.name === name);

  if (!character) return res.status(400).json({ correct: false });

  const dx = x - character.x;
  const dy = y - character.y;
  const distance = Math.sqrt(dx * dx + dy * dy);

  res.json({ correct: distance <= character.radius });
};
