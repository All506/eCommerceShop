import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import styles from './Navbar.module.css';

interface NavbarProps {
  search: string;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
  onCatalogClick: () => void;
  cartCount: number;
}

export default function Navbar({
  search,
  setSearch,
  onCatalogClick,
  cartCount
}: NavbarProps) {

  const { t, i18n } = useTranslation();
  const [languageOpen, setLanguageOpen] = useState(false);

  const isSpanish = i18n.language.startsWith('es');

  const changeLanguage = (language: string) => {
    i18n.changeLanguage(language);
    setLanguageOpen(false);
  };

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

      <div className={styles.cart}>
        <span className={styles.cartIcon}>🛒</span>

        {cartCount > 0 && (
          <span className={styles.cartCount}>
            {cartCount}
          </span>
        )}
      </div>

      <div className={styles.languageDropdown}>

        <button
          className={styles.languageSelected}
          onClick={() => setLanguageOpen(!languageOpen)}
        >
          <span>{isSpanish ? '🇪🇸' : '🇬🇧'}</span>

          <span className={styles.arrow}>
            {languageOpen ? '▲' : '▼'}
          </span>
        </button>

        {languageOpen && (
          <div className={styles.languageMenu}>

            <button
              onClick={() => changeLanguage('es')}
              className={
                isSpanish ? styles.activeLanguage : ''
              }
            >
              <span>🇪🇸</span>
              <span>Español</span>
            </button>

            <button
              onClick={() => changeLanguage('en')}
              className={
                !isSpanish ? styles.activeLanguage : ''
              }
            >
              <span>🇬🇧</span>
              <span>English</span>
            </button>

          </div>

        )}

      </div>
    </nav>
  );
}