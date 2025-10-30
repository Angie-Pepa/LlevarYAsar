export function Blog() {
    const recetas = [
    {
        id: 1,
        titulo: "Receta Chilena de Anticuchos",
        descripcion: "El clásico de la parrilla: carne, longaniza, cebolla y pimentón.",
        imagen: "/src/assets/image/blog1.jpg"
    },
    {
        id: 2,
        titulo: "Asado + Chorizos: La Combinación Perfecta",
        descripcion: "Cómo armar la parrillada ideal con nuestros productos estrella.",
        imagen: "/src/assets/image/blog2.jpg"
    },
    {
        id: 7,
        titulo: "Asado de Tira a la Parrilla",
        descripcion: "Corte jugoso y lleno de sabor, ideal para asar lento sobre brasas.",
        imagen: "/src/assets/image/entrania1.jpg"
    },
    {
        id: 3,
        titulo: "Entraña a la Parrilla",
        descripcion: "Corte de entraña sabroso y tierno, perfecto para asar lento.",
        imagen: "/src/assets/image/entrania3.jpg"
    },
    {
        id: 4,
        titulo: "Lomo Liso: Jugosidad Garantizada",
        descripcion: "Lomo liso especial para asados familiares, tierno y delicioso.",
        imagen: "/src/assets/image/lomo-liso1.jpg"
    },
    {
        id: 6,
        titulo: "Parrillada Familiar Completa",
        descripcion: "Combina nuestros mejores cortes para una parrillada inolvidable.",
        imagen: "/src/assets/image/parrillada.jpg"
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