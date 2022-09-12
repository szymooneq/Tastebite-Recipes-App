import styles from './Header.module.css';

function Header(props) {
  return (
    <header className={styles.header}>
      {props.children}
    </header>
  );
}

export default Header;