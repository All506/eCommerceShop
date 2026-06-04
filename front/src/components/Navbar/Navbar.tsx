import styles from './Navbar.module.css'

interface NavbarProps {
    search: string;
    setSearch: React.Dispatch<React.SetStateAction<string>>;
}

export default function Navbar({ search, setSearch }: NavbarProps) {

    return (
        <nav className={styles.navbar}>
            <h1>Sneakers89</h1>
            <ul>
                <li>Catálogo</li>
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
