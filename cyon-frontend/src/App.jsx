import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Layout from "./constant/layout/Layout";

function App() {
  return (
    <Router>
      <Routes>
        {/* Layout as the parent route */}
        <Route path="/" element={<Layout />}>
          {/* Nested route for HomePage */}
          <Route index element={<HomePage />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
