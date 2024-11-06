import AppLayout from './components/layout/AppLayout';
import { Routes, Route } from 'react-router-dom';
import Campaigns from './pages/Campaigns';
import Banners from './pages/Banners';
import DeviceGroups from './pages/DeviceGroups';



export default function App() {
  return (
    <Routes >
      <Route path="/" element={<AppLayout />}>
        {/* <Route index element={<Homepage />} /> */}
        <Route path="campaigns" element={<Campaigns />} />
        <Route path="devices" element={<Banners />} />
        <Route path="banners" element={<DeviceGroups />} />
      </Route>
    </Routes>)
}
