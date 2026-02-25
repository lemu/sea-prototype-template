import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom'
import './index.css'
import App from './App.tsx'
import Home from './pages/Home.tsx'
import Boards from './pages/Boards.tsx'
// User Menu
import UserProfile from './pages/UserProfile.tsx'
import OrganizationSettings from './pages/OrganizationSettings.tsx'
// Operations
import VoyageEconomics from './pages/VoyageEconomics.tsx'
import TradeDesk from './pages/TradeDesk.tsx'
import AgreementsContracts from './pages/AgreementsContracts.tsx'
import AgreementsRecaps from './pages/AgreementsRecaps.tsx'
import AgreementsClauseLibrary from './pages/AgreementsClauseLibrary.tsx'
import Compliance from './pages/Compliance.tsx'
// Intelligence
import SeaNet from './pages/SeaNet.tsx'
import GlobalMarket from './pages/GlobalMarket.tsx'
import GlobalMarketSupply from './pages/GlobalMarketSupply.tsx'
import GlobalMarketCommodities from './pages/GlobalMarketCommodities.tsx'
import GlobalMarketFreight from './pages/GlobalMarketFreight.tsx'
import Assets from './pages/Assets.tsx'
import AssetsVessels from './pages/AssetsVessels.tsx'
import AssetsFleets from './pages/AssetsFleets.tsx'
import AssetsPorts from './pages/AssetsPorts.tsx'
import AssetsCanals from './pages/AssetsCanals.tsx'
import Fixtures from './pages/Fixtures.tsx'
// Support
import Notifications from './pages/Notifications.tsx'
import HelpSupport from './pages/HelpSupport.tsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
  },
  {
    path: '/home',
    element: <Home />,
    handle: { crumb: () => 'Home' },
  },
  {
    path: '/boards',
    element: <Boards />,
    handle: { crumb: () => 'Boards' },
  },
  // Operations
  {
    path: '/voyage-economics',
    element: <VoyageEconomics />,
    handle: { crumb: () => 'Voyage economics' },
  },
  {
    path: '/trade-desk',
    element: <TradeDesk />,
    handle: { crumb: () => 'Trade desk' },
  },
  {
    path: '/agreements',
    element: <Navigate to="/agreements/contracts" replace />,
    handle: { crumb: () => 'Agreements', redirectOnly: true },
  },
  {
    path: '/agreements/contracts',
    element: <AgreementsContracts />,
    handle: { crumb: () => 'Contracts' },
  },
  {
    path: '/agreements/recaps',
    element: <AgreementsRecaps />,
    handle: { crumb: () => 'Recaps' },
  },
  {
    path: '/agreements/clause-library',
    element: <AgreementsClauseLibrary />,
    handle: { crumb: () => 'Clause library' },
  },
  {
    path: '/compliance',
    element: <Compliance />,
    handle: { crumb: () => 'Compliance' },
  },
  // Intelligence
  {
    path: '/seanet',
    element: <SeaNet />,
    handle: { crumb: () => 'SeaNet' },
  },
  {
    path: '/global-market',
    element: <Navigate to="/global-market/supply" replace />,
    handle: { crumb: () => 'Global market', redirectOnly: true },
  },
  {
    path: '/global-market/supply',
    element: <GlobalMarketSupply />,
    handle: { crumb: () => 'Supply' },
  },
  {
    path: '/global-market/commodities',
    element: <GlobalMarketCommodities />,
    handle: { crumb: () => 'Commodities' },
  },
  {
    path: '/global-market/freight',
    element: <GlobalMarketFreight />,
    handle: { crumb: () => 'Freight' },
  },
  {
    path: '/assets',
    element: <Navigate to="/assets/vessels" replace />,
    handle: { crumb: () => 'Assets', redirectOnly: true },
  },
  {
    path: '/assets/vessels',
    element: <AssetsVessels />,
    handle: { crumb: () => 'Vessels' },
  },
  {
    path: '/assets/fleets',
    element: <AssetsFleets />,
    handle: { crumb: () => 'Fleets' },
  },
  {
    path: '/assets/ports',
    element: <AssetsPorts />,
    handle: { crumb: () => 'Ports' },
  },
  {
    path: '/assets/canals',
    element: <AssetsCanals />,
    handle: { crumb: () => 'Canals' },
  },
  {
    path: '/fixtures',
    element: <Fixtures />,
    handle: { crumb: () => 'Fixtures' },
  },
  // Support
  {
    path: '/notifications',
    element: <Notifications />,
    handle: { crumb: () => 'Notifications' },
  },
  {
    path: '/help-support',
    element: <HelpSupport />,
    handle: { crumb: () => 'Help & support' },
  },
  // User Menu
  {
    path: '/user-profile',
    element: <UserProfile />,
    handle: { crumb: () => 'User profile' },
  },
  {
    path: '/organization-settings',
    element: <OrganizationSettings />,
    handle: { crumb: () => 'Organization settings' },
  },
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
