import { RouterProvider } from 'react-router';
import { SiteContentProvider } from './context/SiteContentContext';
import { router } from './routes';

export default function App() {
  return (
    <SiteContentProvider>
      <RouterProvider router={router} />
    </SiteContentProvider>
  );
}
