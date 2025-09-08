import HomeView from './views/HomeView/HomeView';
import LoginView from './views/LoginView/LoginView';
import LogoutView from './views/LogoutView';
import RegisterView from './views/RegisterView/RegisterView';
import UserProfileView from './views/UserProfileView/UserProfileView';
import MainNav from './components/MainNav/MainNav';
import ProtectedRoute from './components/ProtectedRoute';
import Footer from './components/Footer/Footer';
import AboutCreators from './views/AboutTheCreatorsView/AboutTheCreatorsView';
import DeckCreateView from './views/DeckCreateView/DeckCreateView';
import DecksView from './views/DecksView/DecksView';
import CardView from './views/CardView/CardView';
import DeckDetailsView from './views/DeckDetailsView/DeckDetailsView';
import CardCreateView from './views/CardCreateView/CardCreateView';
import CardEditView from './views/CardEditView/CardEditView';
import StudySession from './components/StudySession/StudySession';
import PageNotFoundView from './views/PageNotFoundView/PageNotFoundView';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

export default function App() {
  return (
    <BrowserRouter>
      <div id="app">
        <MainNav />
        <main id="main-content">
          <Routes>
            <Route path='/create-card/:deckId' element={
              <ProtectedRoute>
                <CardCreateView />
              </ProtectedRoute>
            } />
            <Route path='/decks/:id' element={
              <ProtectedRoute>
                <DeckDetailsView />
              </ProtectedRoute>
            } />
            <Route path='/decks' element={
              <ProtectedRoute>
                <DecksView />
              </ProtectedRoute>
            } />
            <Route path='/decks/createdeck' element={
              <ProtectedRoute>
                <DeckCreateView />
              </ProtectedRoute>
            } />
            <Route path="/card/:id" element={
              <ProtectedRoute>
                <CardEditView />
              </ProtectedRoute>
            } />
            <Route path="/decks/:deckId/study" element={
              <ProtectedRoute>
                <StudySession />
              </ProtectedRoute>
            } />
            <Route path="/" element={<HomeView />} />
            <Route path="/login" element={<LoginView />} />
            <Route path="/logout" element={<LogoutView />} />
            <Route path="/register" element={<RegisterView />} />
            <Route path="/about" element={<AboutCreators />} />
            <Route
              path="/userProfile"
              element={
                <ProtectedRoute>
                  <UserProfileView />
                </ProtectedRoute>
              }
            />
            <Route path='*' element={<PageNotFoundView />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}