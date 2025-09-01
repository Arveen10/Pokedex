import Image from "next/image";
import styles from "./PokemonCard.module.css";

// A map to assign a color to each Pokémon type for the badges
const typeColorMap: { [key: string]: string } = {
  grass: "#78C850",
  poison: "#A040A0",
  fire: "#F08030",
  water: "#6890F0",
  bug: "#A8B820",
  normal: "#A8A878",
  flying: "#A890F0",
  electric: "#F8D030",
  ground: "#E0C068",
  fairy: "#EE99AC",
  fighting: "#C03028",
  psychic: "#F85888",
  rock: "#B8A038",
  steel: "#B8B8D0",
  ice: "#98D8D8",
  ghost: "#705898",
  dragon: "#7038F8",
};

interface PokemonCardProps {
  name: string;
  image: string;
  types: string[];
}

export default function PokemonCard({ name, image, types }: PokemonCardProps) {
  return (
    <div className={styles.card}>
      <div className={styles.imageContainer}>
        <Image src={image} alt={name} width={120} height={120} />
      </div>
      <h2 className={styles.name}>{name}</h2>
      <div className={styles.typesContainer}>
        {types.map((type) => (
          <span
            key={type}
            className={styles.typeBadge}
            style={{ backgroundColor: typeColorMap[type] || "#68A090" }}
          >
            {type}
          </span>
        ))}
      </div>
    </div>
  );
}
