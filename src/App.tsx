import styles from './App.module.css';
import DND from './components/DND/DND';
import Home from './components/Home/Home';

export default function App() {

  return (
    <div className={styles.App}>
      {window.location.pathname === "/" && <Home />}
      {window.location.pathname === "/dnd" && <DND />}
    </div>


  )
}