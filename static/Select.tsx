import React from 'react';
import cx from 'classnames'; 

interface SelectProps {
  dataSource: { value: string; label: string }[];
  id: string;
  name: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  error?: string;
  touched?: boolean;
}

const Select: React.FC<SelectProps> = ({ dataSource, id, name, value, onChange, error, touched }) => {
  return (
    <div className="formGroup">
      <label htmlFor={id}>{name}</label>
      <select
        id={id}
        name={id}
        value={value}
        onChange={onChange}
        className={cx({ error: touched && error })}
      >
        <option value="">Wybierz...</option>
        {dataSource.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {touched && error && <div className="error">{error}</div>}
    </div>
  );
};

export default Select;
