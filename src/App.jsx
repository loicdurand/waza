import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';

import SettingsPage from './pages/SettingsPage';

import MaterialsPage from './pages/MaterialsPage';

import ModelEditorPage from './pages/ModelEditorPage';

import DashboardPage from './pages/DashboardPage';

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<DashboardPage />} />
          <Route path="/settings" element={<SettingsPage />} />
          <Route path="/materials" element={<MaterialsPage />} />
          <Route path="/models/new" element={<ModelEditorPage />} />
          <Route path="/models/edit/:id" element={<ModelEditorPage />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;