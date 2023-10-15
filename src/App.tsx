import type { ReactElement } from "react";
import { Auth } from "./pages/auth";
import AuthenticatedApp from "./AuthenticatedApp";

const App = (): ReactElement => {
  const isAuthenticated = false;
  return <>{isAuthenticated ? <AuthenticatedApp /> : <Auth />}</>;
};

export default App;
