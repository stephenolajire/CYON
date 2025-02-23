import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Layout from "./constant/layout/Layout";
import Donate from "./pages/Donate";
import { GlobalProvider } from "./constant/context/GlobalContext";
import RegistrationModal from "./modal/RegistrationModal";
import EmailModal from "./modal/EmailModal";
import Vote from "./pages/Vote";
import ProtectedRoute from "./constant/api/ProtectedRoute";
import ContactForm from "./pages/ContactPage";
import OutreachList from "./pages/OutreachPage";

function App() {
  return (
    <GlobalProvider>
      <Router>
        <RegistrationModal />
        <EmailModal />
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route path="donate" element={<Donate />} />
            <Route
              path="vote"
              element={
                <ProtectedRoute>
                  <Vote />
                </ProtectedRoute>
              }
            />
            <Route path="contact" element={<ContactForm/>}/>
            <Route path="outreach" element={<OutreachList/>} />
          </Route>
        </Routes>
      </Router>
    </GlobalProvider>
  );
}

export default App;
