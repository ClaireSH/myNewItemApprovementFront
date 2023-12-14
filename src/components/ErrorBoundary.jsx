import React, { Component } from 'react';
import { Box } from '@material-ui/core';

export class ErrorBoundary extends Component {
  constructor(props) {
    super(props);

    this.state = {
      error: false,
      errorInfo: null,
    };
  }

  static getDerivedStateFromError(error) {
    return {
      error: true,
    };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({ error, errorInfo });
  }

  render() {
    if (this.state.error) {
      return (
        <div>
          <Box m={10} />
          <h1>エラーが発生しました。</h1>
          <details style={{ whiteSpace: 'pre-wrap' }}>
            {this.state.errorInfo && JSON.stringify(this.state.errorInfo)}
          </details>
        </div>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
