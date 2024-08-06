import { Route, Routes } from 'react-router-dom';
import { routeConfig } from '@/assets';

export function AppRouter() {
  return (
    <Routes>
      {Object.values(routeConfig).map((route) => (
        <Route element={route.element} path={route.path} key={route.path} />
      ))}
    </Routes>
  );
}
