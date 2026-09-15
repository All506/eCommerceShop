import styles from './Navbar.module.css'
import { useTranslation } from 'react-i18next';

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

    const { t } = useTranslation();

    return (
        <nav className={styles.navbar}>
            <h1>Sneakers89</h1>

            <ul>
                <li onClick={onCatalogClick}>
                    {t('navbar.catalog')}
                </li>
            </ul>

            <input
                className={styles.search}
                type="text"
                placeholder={t('navbar.search')}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />
        </nav>
    )
}