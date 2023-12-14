import React from "react";
import ReactDOM from "react-dom";
import reportWebVitals from "./reportWebVitals";
import "./index.css";
import "react-app-polyfill/ie11";
import "react-app-polyfill/stable";
import awsconfig from "./aws-exports";
import AppWithAuth from "./AppWithAuth";
import Amplify from "aws-amplify";
import { Logger, AWSCloudWatchProvider } from "aws-amplify";

Amplify.configure({
  Logging: {
    logGroupName: "mr12n-new-item-approvement-front",
    logStreamName: `mr12n-${process.env.REACT_APP_ENV}_LOGS`,
  },
  ...awsconfig,
});

export const logger = new Logger("mr12n-front", "INFO");
Amplify.register(logger);

const env = process.env.REACT_APP_ENV;
if (env === "development") {
  window.LOG_LEVEL = "DEBUG";
} else if (env === "production") {
  logger.addPluggable(new AWSCloudWatchProvider());
}
// const sample = "";
// sample === "!"
//   ? ReactDOM.render(<AppWithAuth />, document.getElementById("root"))
//   : ReactDOM.render(<AppWithAuth />, document.getElementById("root2"));
ReactDOM.render(<AppWithAuth />, document.getElementById("root"));

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
