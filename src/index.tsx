import React from 'react';
import ReactDOM from 'react-dom';
import { ThemeProvider } from 'styled-components';
import App from './App';
import { theme } from './theme';

// const darkTheme = {
//   textColor: "whitesmoke",
//   backgroundColor: "#111"
// }

// const lightTheme = {
//   textColor: "111",
//   backgroundColor: "#whitesmoke"
// }

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <App /> 
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
