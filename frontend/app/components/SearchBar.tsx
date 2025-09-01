import styles from "./SearchBar.module.css";

interface SearchBarPros {
  searchTerm: string;
  onSearchChange: (term: string) => void;
}

const { searchContainer, searchInput } = styles;

export default function SearchBar({
  searchTerm,
  onSearchChange,
}: SearchBarPros) {
  return (
    <div className={searchContainer}>
      <input
        type="text"
        placeholder="Search Pokemon by name..."
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
        className={searchInput}
      />
    </div>
  );
}
