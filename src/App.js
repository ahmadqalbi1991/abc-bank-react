import './App.css';
import Header from "./components/partial/Header";
import AppRoutes from "./AppRoutes";
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import {AuthProvider} from "react-auth-kit";

function App() {
  return (
      <>
          <AuthProvider authName="_auth" authType="cookie">
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <Header />
                  <AppRoutes />
              </LocalizationProvider>
          </AuthProvider>
      </>
  );
}

export default App;
