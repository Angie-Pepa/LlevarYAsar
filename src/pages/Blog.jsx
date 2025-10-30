export function Blog() {
  const recetas = [
    {
      id: 1,
      titulo: "Receta Chilena de Anticuchos",
      descripcion: "El clásico de la parrilla: carne, longaniza, cebolla y pimentón.",
      imagen: "/img/blog1.jpg"
    },
    {
      id: 2,
      titulo: "Asado + Chorizos: La Combinación Perfecta",
      descripcion: "Cómo armar la parrillada ideal con nuestros productos estrella.",
      imagen: "/img/blog2.jpg"
    },
    {
      id: 7,
      titulo: "Asado de Tira a la Parrilla",
      descripcion: "Corte jugoso y lleno de sabor, ideal para asar lento sobre brasas.",
      imagen: "/img/asado-tira.jpg"
    },
    {
      id: 3,
      titulo: "Ensalada Chilena",
      descripcion: "Tomate, cebolla y cilantro, el clásico infaltable para acompañar.",
      imagen: "/img/ensalada-chilena.jpg"
    },
    {
      id: 4,
      titulo: "Ensalada César con un toque especial",
      descripcion: "Romana, crutones y parmesano: frescura que combina con la parrilla.",
      imagen: "/img/ensalada-cesar.jpg"
    },
    {
      id: 6,
      titulo: "Ensalada Caprese",
      descripcion: "Tomate, mozzarella y albahaca con reducción de balsámico.",
      imagen: "/img/ensalada-caprese.jpg"
    }
  ];

  return (
    <main>
      <section>
        <h1>Nuestras Recetas</h1>
        <p>Secretos de parrilla, tips y recetas exclusivas para que tu asado sea inolvidable.</p>

        <div className="product-grid">
          {recetas.map(receta => (
            <article key={receta.id} className="product-card">
              <img src={receta.imagen} alt={receta.titulo} />
              <h3>{receta.titulo}</h3>
              <p>{receta.descripcion}</p>
              <a href={`/blog/${receta.id}`} className="btn">Leer receta</a>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}