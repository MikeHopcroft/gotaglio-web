Various record editors depend on the Editor component that is one level up.
The Editor component depends on the useRouteData() hook, which is also one level up.
useRouteData() depends on RouteDataContext, which is used by RouteDataProvider.

Question is how to organize code without circular dependencies.