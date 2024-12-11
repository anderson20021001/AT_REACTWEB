import { ThemeProvider } from '@mui/material/styles';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { BabyProvider } from './context/BabyContext';
import { TrackingProvider } from './context/TrackingContext';
import { theme } from './theme';
import AppRoutes from './routes';
import './i18n';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <AuthProvider>
          <BabyProvider>
            <TrackingProvider>
              <AppRoutes />
            </TrackingProvider>
          </BabyProvider>
        </AuthProvider>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;