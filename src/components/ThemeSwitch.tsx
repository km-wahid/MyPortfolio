import React from 'react';

interface ThemeSwitchProps {
  checked: boolean;
  onChange: () => void;
}

const ThemeSwitch: React.FC<ThemeSwitchProps> = ({ checked, onChange }) => {
  return (
    <label className="theme-switch" aria-label="Toggle day night mode">
      <input className="cb" type="checkbox" checked={checked} onChange={onChange} />
      <span className="toggle">
        <span className="left">off</span>
        <span className="right">on</span>
      </span>
    </label>
  );
};

export default ThemeSwitch;
