import React, { useState } from 'react';
import './SensorHub.css';

interface SensorHubProps {
  sensors: {
    light: number;
    temperature: number;
    noise: number;
    energy: number;
  };
  setSensors: React.Dispatch<React.SetStateAction<{
    light: number;
    temperature: number;
    noise: number;
    energy: number;
  }>>;
}

const SensorHub: React.FC<SensorHubProps> = ({ sensors, setSensors }) => {
  const [isOpen, setIsOpen] = useState(false);

  const updateSensor = (key: keyof typeof sensors, value: number) => {
    setSensors(prev => ({ ...prev, [key]: value }));
  };

  return (
    <div className="sensor-hub-container">
      <button 
        className="sensor-hub-trigger" 
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Environmental Sensors"
      >
        <div className={`sensor-dot ${sensors.energy > 50 ? 'vibrant' : 'calm'}`}></div>
        {isOpen ? 'Close Sensors' : 'Sanctuary Sensors'}
      </button>

      {isOpen && (
        <div className="sensor-hub-panel">
          <h3>Environmental Sync</h3>
          <p className="sensor-hint">Simulate your home's energy to see the sanctuary respond.</p>
          
          <div className="sensor-group">
            <label>Ambient Light: {sensors.light}%</label>
            <input 
              type="range" min="0" max="100" 
              value={sensors.light} 
              onChange={(e) => updateSensor('light', parseInt(e.target.value))} 
            />
          </div>

          <div className="sensor-group">
            <label>Temperature: {sensors.temperature}°C</label>
            <input 
              type="range" min="-10" max="40" 
              value={sensors.temperature} 
              onChange={(e) => updateSensor('temperature', parseInt(e.target.value))} 
            />
          </div>

          <div className="sensor-group">
            <label>Noise Level: {sensors.noise}%</label>
            <input 
              type="range" min="0" max="100" 
              value={sensors.noise} 
              onChange={(e) => updateSensor('noise', parseInt(e.target.value))} 
            />
          </div>

          <div className="sensor-group">
            <label>Home Energy: {sensors.energy}%</label>
            <input 
              type="range" min="0" max="100" 
              value={sensors.energy} 
              onChange={(e) => updateSensor('energy', parseInt(e.target.value))} 
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default SensorHub;
