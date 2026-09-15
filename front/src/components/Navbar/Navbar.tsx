import styles from './Navbar.module.css'

interface NavbarProps {
    search: string;
    setSearch: React.Dispatch<React.SetStateAction<string>>;
    onCatalogClick: () => void;
}

export default function Navbar({
    search,
    setSearch,
    onCatalogClick
}: NavbarProps) {

    return (
        <nav className={styles.navbar}>
            <h1>Sneakers89</h1>

            <ul>
                <li onClick={onCatalogClick}>
                    Catálogo
                </li>
            </ul>

            <input
                className={styles.search}
                type="text"
                placeholder="Buscar..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />
        </nav>
    )
}