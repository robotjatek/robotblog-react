import React, { setGlobal } from 'reactn';
import './App.css';
import Navbar from 'react-bootstrap/Navbar';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Nav, Container } from 'react-bootstrap';
import {
  BrowserRouter,
  Route,
  Switch,
  NavLink,
} from 'react-router-dom';
import initReactnPersist from 'reactn-persist';
import { useTranslation } from 'react-i18next';
import NotFound from './components/not-found/NotFound';
import Login from './components/login';
import ProtectedRoute from './router/ProtectedRoute';
import LanguageSelector from './components/language-selector';
import initI18n from './i18n/i18n';
import CvPage from './pages/cv/cvPage';
import Blog from './pages/blog';
import BlogPost from './pages/blog/BlogPost';

initReactnPersist({ storage: localStorage });
setGlobal({ loginResult: null });
initI18n();

const App = () => {
  const [t] = useTranslation();

  return (
    <BrowserRouter>
      <div>
        <div id="bg_wrapper">
          <div className="bg_image" />
        </div>

        <Container id="main_container">
          <div id="header">
            <div id="header_top">
              <Login />
            </div>
            <Navbar expand="lg">
              <div id="navbar_status" />
              <Navbar.Brand href="#"><img src="/img/logo.png" alt="RobotBlog" height="35px" /></Navbar.Brand>
              <Navbar.Toggle aria-controls="basic-navbar-nav" />
              <Navbar.Collapse>
                <Nav className="mr-auto">
                  <NavLink exact to="/">{t('nav.home')}</NavLink>
                  <NavLink exact to="/blog">{t('nav.blog')}</NavLink>
                  <NavLink exact to="/projects">{t('nav.projects')}</NavLink>
                  <NavLink exact to="/cv">{t('nav.cv')}</NavLink>
                  <NavLink exact to="/social">{t('nav.social')}</NavLink>
                  <LanguageSelector />
                </Nav>
              </Navbar.Collapse>
            </Navbar>
          </div>
          <div id="content">
            <Switch>
              <Route exact path="/" component={() => <div>Home</div>} />
              <Route exact path="/blog" component={Blog} />
              <Route path="/blog/:id" component={BlogPost} />
              <ProtectedRoute exact path="/projects" component={() => <>Projects page</>} roles={['Admin']} />
              <Route exact path="/cv" component={CvPage} />
              <Route component={NotFound} />
            </Switch>
          </div>
        </Container>
      </div>
    </BrowserRouter>
  );
};

export default App;
