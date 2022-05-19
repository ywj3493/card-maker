import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./components/login/login";
import Maker from "./components/maker/maker";
import Test from "./components/test/test";
import styles from "./app.module.css";

function App({ FileInput, authService, cardRepository }) {
  return (
    <div className={styles.app}>
      <BrowserRouter>
        <Routes>
          <Route
            exact
            path="/"
            element={<Login authService={authService} />}
          ></Route>
          <Route
            path="maker"
            element={
              <Maker
                authService={authService}
                FileInput={FileInput}
                cardRepository={cardRepository}
              />
            }
          ></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
