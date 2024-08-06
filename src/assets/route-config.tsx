import {
  AddressPage,
  HomePage,
  LoanPage,
  NotFoundPage,
  PersonalPage,
} from '@/pages';
import { RouteProps } from 'react-router-dom';

export enum AppRoutes {
  MAIN = 'main',
  PERSONAL = 'personal',
  ADDRESS = 'address',
  LOAN = 'loan',
  NOT_FOUND = 'not-found',
}

export const RoutePath: Record<AppRoutes, string> = {
  [AppRoutes.MAIN]: '/',
  [AppRoutes.PERSONAL]: '/personal',
  [AppRoutes.ADDRESS]: '/address',
  [AppRoutes.LOAN]: '/loan',
  [AppRoutes.NOT_FOUND]: '*',
};

export const routeConfig: Record<AppRoutes, RouteProps> = {
  [AppRoutes.MAIN]: {
    path: RoutePath.main,
    element: <HomePage />,
  },
  [AppRoutes.PERSONAL]: {
    path: RoutePath.personal,
    element: <PersonalPage />,
  },
  [AppRoutes.ADDRESS]: {
    path: RoutePath.address,
    element: <AddressPage />,
  },
  [AppRoutes.LOAN]: {
    path: RoutePath.loan,
    element: <LoanPage />,
  },
  [AppRoutes.NOT_FOUND]: {
    path: RoutePath['not-found'],
    element: <NotFoundPage />,
  },
};
