import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { Container } from '@mui/material';
import Navigation from './components/Navigation';
import Home from './pages/Home';
import Users from './pages/Users';
import AddUser from './pages/AddUser';
import EditUser from './pages/EditUser';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
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
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', margin: 0, padding: 0 }}>
          <Navigation />
          <Container 
            maxWidth="lg"
            disableGutters
            component="main" 
            sx={{ 
              paddingX: { xs: 1, sm: 2 },
              paddingY: 0,
              margin: 0,
              width: '100%',
              maxWidth: '100% !important',
              flex: 1,
            }}
          >
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/users" element={<Users />} />
              <Route path="/add-user" element={<AddUser />} />
              <Route path="/edit-user/:id" element={<EditUser />} />
            </Routes>
          </Container>
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;
