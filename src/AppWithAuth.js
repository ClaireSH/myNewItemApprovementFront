import React from "react";
import { SignIn, SignUp, Greetings } from "aws-amplify-react";
import config from "./aws-exports";
import App from "./App";
import { Authenticator } from "aws-amplify-react";
import { ThemeProvider } from "@mui/material/styles";
import { StyledEngineProvider } from "@mui/material";
import theme from "./style/theme";
import { withAuthenticator } from "@aws-amplify/ui-react";

class AppWithAuth extends React.Component {
  render() {
    return (
      <div>
        <StyledEngineProvider injectFirst>
          <ThemeProvider theme={theme}>
            <Authenticator
              hide={[SignIn, SignUp, Greetings]}
              amplifyConfig={config}
            >
              <App />
            </Authenticator>
          </ThemeProvider>
        </StyledEngineProvider>
      </div>
    );
  }
}

export default withAuthenticator(AppWithAuth, true);
