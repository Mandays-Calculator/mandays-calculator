import type { ReactElement } from "react";
import { Auth } from "./pages/auth";
import AuthenticatedApp from "./AuthenticatedApp";

const App = (): ReactElement => {
  const isAuthenticated = true;
  return <>{isAuthenticated ? <AuthenticatedApp /> : <Auth />}</>;
};

export default App;
