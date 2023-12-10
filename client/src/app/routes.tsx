import { Pages } from '../pages';

import {
  ARTICLE_ROUTE,
  MAIN_ROUTE,
  NOT_FOUND_ROUTE,
  PROFILE_ROUTE,
  SELLER_PROFILE_ROUTE,
} from '../utils/consts';

export type RouteType = {
  path: string;
  component: JSX.Element;
};

export const publicRoutes: RouteType[] = [
  { path: MAIN_ROUTE, component: <Pages.Main /> },
  { path: PROFILE_ROUTE, component: <Pages.Profile /> },
  { path: `${ARTICLE_ROUTE}/:id`, component: <Pages.Article /> },
  { path: `${SELLER_PROFILE_ROUTE}/:id`, component: <Pages.SellerProfile /> },

  //...
  { path: NOT_FOUND_ROUTE, component: <Pages.NotFound /> },
];
