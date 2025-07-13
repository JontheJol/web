import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { Container } from '@mui/material';
import Navigation from './components/Navigation';
import ProtectedRoute from './components/ProtectedRoute';
import Home from './pages/Home';
import Users from './pages/Users';
import AddUser from './pages/AddUser';
import EditUser from './pages/EditUser';
import Login from './pages/Login';
import Register from './pages/Register';
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
  const { isAuthenticated } = useAppStore();

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
            </Routes>
          </Container>
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;
