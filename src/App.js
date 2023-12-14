import React from "react";

import { withAuthenticator } from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";
import ClippedDrawer from "./components/organisms/ClippedDrawer";
import { RecoilRoot } from "recoil";
import RecoilStore from "./recoil/RecoilStore";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import ImportExternalFilesList from "./pages/ImportExternalFilesList";
import NewProductList from "./pages/NewProductList";
import NewProductDetail from "./pages/NewProductDetail";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "@mui/material/styles";
import theme from "./style/theme";
import CssBaseline from "@mui/material/CssBaseline";

function App({ authState }) {
  return (
    <div className="App">
      {authState === "signedIn" ? (
        <RecoilRoot>
          <RecoilStore />
          <ErrorBoundary>
            <Router>
              <div style={{ display: "flex" }}>
                <ThemeProvider theme={theme.palette.primary.main}>
                  <CssBaseline />
                  <ClippedDrawer />
                </ThemeProvider>
                <React.Suspense fallback={<div>Loading...</div>}>
                  <Switch>
                    <Route exact path="/">
                      <ImportExternalFilesList />
                    </Route>
                    <Route exact path="/newProductList">
                      <NewProductList />
                    </Route>
                    <Route exact path="/newProductDetail">
                      <NewProductDetail />
                    </Route>
                  </Switch>
                </React.Suspense>
              </div>
            </Router>
          </ErrorBoundary>
        </RecoilRoot>
      ) : null}
    </div>
  );
}

export default withAuthenticator(App, true);
