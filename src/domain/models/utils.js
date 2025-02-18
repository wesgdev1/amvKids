const reemplazarEspacios = (texto) => {
  return texto.replace(/ /g, "%20");
};

export const generateFilterFormat = (filters) => {
  let query = "";
  let marcas = filters.marca;
  let colores = filters.color;
  let tallas = filters.talla;
  let genero = filters.genero;

  if (marcas !== undefined) {
    marcas = reemplazarEspacios(marcas);
    query += `filtersBrand=${marcas}`;
  }
  if (colores !== undefined) {
    colores = reemplazarEspacios(colores);
    query += `&filtersColor=${colores}`;
  }
  if (tallas !== undefined) {
    tallas = reemplazarEspacios(tallas);
    query += `&filtersSize=${tallas}`;
  }
  if (genero !== undefined) {
    genero = reemplazarEspacios(genero);
    query += `&filtersGenre=${genero}`;
  }
  return query;
};
