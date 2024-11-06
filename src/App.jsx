import AppLayout from './components/layout/AppLayout';
import { Routes, Route, Navigate } from 'react-router-dom';
import Campaigns from './pages/Campaigns';
import Banners from './pages/Banners';
import DeviceGroups from './pages/DeviceGroups';



export default function App() {
  return (
    <Routes >
      <Route path="/" element={<AppLayout />}>
        <Route index element={<Navigate to="campaigns" />} />
        <Route path="campaigns" element={<Campaigns />} />
        <Route path="devices" element={<DeviceGroups />} />
        <Route path="banners" element={<Banners />} />
      </Route>
    </Routes>)
}
