import React from 'react';
import { renderToString } from 'react-dom/server';
import App from './src/App.jsx';

try {
  const html = renderToString(<App />);
  console.log("SUCCESS. App rendered without crashing.");
  console.log("HTML snippet:", html.substring(0, 200));
} catch (error) {
  console.error("RUNTIME CRASH:", error);
}
