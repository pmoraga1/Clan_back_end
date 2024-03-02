const generateUserName = () => {
  const adjetivoAleatorio =
    adjetivos[Math.floor(Math.random() * adjetivos.length)];
  const sustantivoAleatorio =
    sustantivos[Math.floor(Math.random() * sustantivos.length)];
  const userName = `${sustantivoAleatorio}${adjetivoAleatorio}`;
  return userName;
};

const adjetivos = [
  "Bueno",
  "Malo",
  "Grande",
  "Pequeño",
  "Dulce",
  "Fuerte",
  "Débil",
  "Feliz",
  "Triste",
  "Rápido",
  "Lento",
  "Nuevo",
  "Viejo",
  "Claro",
  "Oscuro",
  "Frio",
  "Calor",
  "Bajo",
  "Alto",
  "Bello",
];

const sustantivos = [
  "Gato",
  "Perro",
  "Pez",
  "Lobo",
  "Oso",
  "Ratón",
  "Árbol",
  "Flor",
  "Sol",
  "Luna",
  "Mar",
  "Río",
  "Casa",
  "Auto",
  "Tren",
  "Toro",
  "Ave",
  "Oveja",
  "Vaca",
  "Cabra",
];

module.exports = { generateUserName };
