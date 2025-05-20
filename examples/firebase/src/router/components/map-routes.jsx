import PrivateRoute from "./private-routes";
import PublicRoutes from "./public-routes";

export function MapRoutes(routes) {
  return routes.map((route) => {
    const children = route.children ? MapRoutes(route.children) : undefined;

    let element = route.element;
    if (route?.public === true) {
      element = <PublicRoutes>{route.element}</PublicRoutes>;
    } else {
      element = <PrivateRoute>{route.element}</PrivateRoute>;
    }

    return {
      ...route,
      element,
      children,
    };
  });
}
