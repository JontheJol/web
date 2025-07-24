import { Container } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Navigation from './components/Navigation';
import NotificationDialog from './components/NotificationDialog';
import ProtectedRoute from './components/ProtectedRoute';
import AddUser from './pages/AddUser';
import EditUser from './pages/EditUser';
import Estantes from './pages/Estantes';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Users from './pages/Users';
import EmailConfirmation from './pages/EmailConfirmation';
import ValidationExample from './pages/ValidationExample';
import { useAppStore } from './store/appStore';

const theme = createTheme({
  palette: {
    primary: {
      main: '#453726', // From Figma design
    },
    secondary: {
      main: '#2e5131', // BookSmart green
    },
    background: {
      default: '#fff9ec', // Figma background color
    },
  },
  typography: {
    fontFamily: '"League Spartan", "Roboto", "Helvetica", "Arial", sans-serif',
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        html: {
          margin: 0,
          padding: 0,
          height: '100%',
        },
        body: {
          margin: 0,
          padding: 0,
          height: '100%',
        },
        '#root': {
          margin: 0,
          padding: 0,
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
        },
      },
    },
  },
});

function App() {
  const { isAuthenticated, notification, showNotification, hideNotification } = useAppStore();

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', margin: 0, padding: 0 }}>
          {isAuthenticated && <Navigation />}
          <Container 
            maxWidth="lg"
            disableGutters
            component="main" 
            sx={{ 
              paddingX: isAuthenticated ? { xs: 1, sm: 2 } : 0,
              paddingY: 0,
              margin: 0,
              width: '100%',
              maxWidth: '100% !important',
              flex: 1,
            }}
          >
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/email-confirmation" element={<EmailConfirmation />} />
              <Route path="/validation-example" element={<ValidationExample />} />
              <Route path="/" element={
                <ProtectedRoute>
                  <Home />
                </ProtectedRoute>
              } />
              <Route path="/users" element={
                <ProtectedRoute>
                  <Users />
                </ProtectedRoute>
              } />
              <Route path="/add-user" element={
                <ProtectedRoute>
                  <AddUser />
                </ProtectedRoute>
              } />
              <Route path="/edit-user/:id" element={
                <ProtectedRoute>
                  <EditUser />
                </ProtectedRoute>
              } />
              <Route path="/estantes" element={
                  <Estantes />
              } />
            </Routes>
          </Container>
          
          {/* Global Notification Dialog */}
          <NotificationDialog
            open={showNotification}
            notification={notification}
            onClose={hideNotification}
          />
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;
