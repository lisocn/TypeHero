import { Routes, Route } from 'react-router-dom'
import MainLayout from './layouts/MainLayout'
import Home from './pages/Home'
import Login from './pages/Login'
import Profile from './pages/Profile'
import Adventure from './pages/Adventure'
import Game from './pages/Game'
import SpeedMode from './pages/SpeedMode'
import MiniGames from './pages/MiniGames'
import Checkin from './pages/Checkin'
import Achievements from './pages/Achievements'
import Leaderboard from './pages/Leaderboard'
import Shop from './pages/Shop'
import ParentDashboard from './pages/ParentDashboard'
import NotFound from './pages/NotFound'

export default function App() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/adventure" element={<Adventure />} />
        <Route path="/adventure/:chapterId/:levelId" element={<Game />} />
        <Route path="/speed" element={<SpeedMode />} />
        <Route path="/mini-games" element={<MiniGames />} />
        <Route path="/mini-games/:gameId" element={<MiniGames />} />
        <Route path="/checkin" element={<Checkin />} />
        <Route path="/achievements" element={<Achievements />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/parent" element={<ParentDashboard />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  )
}
