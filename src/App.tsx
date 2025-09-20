import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { WelcomePage } from "./components/WelcomePage/WelcomePage";
import { CalcPage } from "./components/CalcPage/CalcPage";
import styles from "./App.module.css";

function App() {
  return (
    <div className={styles.app_container}>
      <Router>
        <Routes>
          <Route path="/" element={<WelcomePage />} />
          <Route path="/calc" element={<CalcPage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
