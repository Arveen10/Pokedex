"use client";

import { useEffect, useMemo, useState } from "react";
import PokemonCard from "./components/PokemonCard";
import styles from "./page.module.css";
import SearchBar from "./components/SearchBar";
import Carousel from "./components/Carousel";

interface Pokemon {
  name: string;
  image: string;
  types: string[];
}

export default function HomePage() {
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const fetchPokemons = async (pageNum: number) => {
    setIsLoading(true);
    try {
      // Fetch data from backend using the environment variable
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/pokemons?page=${pageNum}&limit=20`
      );
      const newPokemons: Pokemon[] = await response.json();

      // Append the new Pokémon to the existing list
      setPokemons((prev) => [...prev, ...newPokemons]);
    } catch (error) {
      console.error("Failed to fetch pokemons:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // useEffect hook to fetch the first page of Pokémon when the component loads
  useEffect(() => {
    fetchPokemons(page);
  }, [page]);

  const loadMorePokemons = () => {
    setPage((prevPage) => prevPage + 1);
  };

  const filteredPokemons = useMemo(() => {
    if (!searchTerm) {
      return pokemons;
    }
    return pokemons.filter((pokemon) => {
      return pokemon.name.toLowerCase().includes(searchTerm.toLowerCase());
    });
  }, [pokemons, searchTerm]);

  const {
    main,
    topSection,
    sideBanners,
    middleSection,
    leftSidebar,
    centerContent,
    pokemonListContainer,
    pokemonGrid,
    loadingText,
    loadMoreButton,
    rightSidebar,
  } = styles;

  return (
    <main className={main}>
      {/* Top Section */}
      <section className={topSection}>
        {/* <div className={carousel}>Carousel Placeholder</div> */}
        <Carousel />
        <div className={sideBanners}>
          <div>Static Banner</div>
          <div>Static Banner</div>
        </div>
      </section>

      {/* Bottom Section */}
      <section className={middleSection}>
        <aside className={leftSidebar}>Static Image Left</aside>

        <div className={centerContent}>
          <SearchBar searchTerm={searchTerm} onSearchChange={setSearchTerm} />

          <div className={pokemonListContainer}>
            <div className={pokemonGrid}>
              {filteredPokemons.map((pokemon) => (
                <PokemonCard
                  key={pokemon.name}
                  name={pokemon.name}
                  image={pokemon.image}
                  types={pokemon.types}
                />
              ))}
            </div>

            {isLoading && <p className={loadingText}>Loading...</p>}

            {/* Only show Load More if not searching and not loading */}
            {!isLoading && !searchTerm && (
              <button onClick={loadMorePokemons} className={loadMoreButton}>
                Load More
              </button>
            )}
          </div>
        </div>

        <aside className={rightSidebar}>Static Image Right</aside>
      </section>
    </main>
  );
}
