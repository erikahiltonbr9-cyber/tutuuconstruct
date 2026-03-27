import { createBrowserRouter } from 'react-router';
import { RootLayout } from './layouts/RootLayout';
import { LandingPage } from './pages/LandingPage';
import { AboutPage } from './pages/AboutPage';
import { ServicesPage } from './pages/ServicesPage';
import { CatalogPage } from './pages/CatalogPage';
import { ProductDetailPage } from './pages/ProductDetailPage';
import { BlogPage } from './pages/BlogPage';
import { ContactPage } from './pages/ContactPage';
import { MortgagePage } from './pages/MortgagePage';
import { CustomerPage } from './pages/CustomerPage';
import { NotFoundPage } from './pages/NotFoundPage';
import { UIKitPage } from './pages/UIKitPage';
import { AdminPage } from './pages/AdminPage';

export const router = createBrowserRouter([
  {
    path: '/admin',
    Component: AdminPage,
  },
  {
    path: '/',
    Component: RootLayout,
    children: [
      { index: true, Component: LandingPage },
      { path: 'about', Component: AboutPage },
      { path: 'catalog', Component: CatalogPage },
      { path: 'catalog/:slug', Component: ProductDetailPage },
      { path: 'services', Component: ServicesPage },
      { path: 'blog', Component: BlogPage },
      { path: 'contact', Component: ContactPage },
      { path: 'mortgage', Component: MortgagePage },
      { path: 'customer', Component: CustomerPage },
      { path: 'ui-kit', Component: UIKitPage },
      { path: '*', Component: NotFoundPage },
    ],
  },
]);