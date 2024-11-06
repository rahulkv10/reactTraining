import './App.css';
import { Component1 } from './Component1';
import { Component2 } from './Component2';

export function App() {
  return (
    <div className="app-container">
      <div className="column">
        <Component1 />
      </div>
      <div className="column">
        <Component2 />
      </div>
    </div>
  );
}
