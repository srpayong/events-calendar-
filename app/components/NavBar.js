import Link from 'next/link';
import styles from './navBar.module.scss';

export default function NavBar() {
  return (
    <div className={styles.navBar}>
      <nav>
        <Link href="/">Overview</Link>
        <Link href="/Schedules">Schedules</Link>
      </nav>
    </div>
  );
}
