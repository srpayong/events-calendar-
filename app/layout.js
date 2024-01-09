import './globals.scss';
import { Inter } from 'next/font/google';
import styles from '../Styles/navBar.module.scss';
import NavBar from './Components/NavBar';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Sports Events Calendar',
  description: 'Frontend Exercise',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className={styles.navBar}>
          <NavBar />
        </div>
        {children}
      </body>
    </html>
  );
}
