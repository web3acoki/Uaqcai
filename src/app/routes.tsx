import { createBrowserRouter } from 'react-router';
import { Layout } from './components/Layout';
import { Home } from './pages/Home';
import { Fund } from './pages/Fund';
import { RWAFi } from './pages/RWAFi';
import { About } from './pages/About';

export const router = createBrowserRouter([
  {
    path: '/',
    Component: Layout,
    children: [
      { index: true, Component: Home },
      { path: 'fund', Component: Fund },
      { path: 'rwafi', Component: RWAFi },
      { path: 'about', Component: About },
      { path: '*', Component: Home }, // Fallback to home
    ],
  },
]);
