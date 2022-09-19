import PropTypes from 'prop-types';
import { useRef } from 'react';

const InputText = props => {
  return (
    <div className="mb-3">
      <label htmlFor={props.id} className="form-label">{props.label}</label>
      <input 
        id={props.id}
        value={props.value}
        onChange={e => props.onChange(e.target.value)}
        type={props.type} 
        className={`form-control ${props.error && props.showError ? 'is-invalid' : ''}`} />
      <div className="invalid-feedback">{props.error}</div>
    </div>
  );
}

const InputTextarea = props => {
  return (
    <div className="mb-3">
      <label htmlFor={props.id} className="form-label">{props.label}</label>
      <textarea 
        id={props.id}
        value={props.value}
        onChange={e => props.onChange(e.target.value)}
        type={props.type} 
        className={`form-control ${props.error && props.showError ? 'is-invalid' : ''}`} />
      <div className="invalid-feedback">{props.error}</div>
    </div>
  );
}

const InputSelect = props => {
  return (
    <div className="mb-3">
      <label htmlFor={props.id} className="form-label">{props.label}</label>
      <select 
        id={props.id}
        value={props.value} 
        onChange={e => props.onChange(e.target.value)}
        className={`form-control ${props.error && props.showError ? 'is-invalid' : ''}`}
        aria-label={props.label}>
          {props.options.map(option => 
            <option value={option.value} key={option.value}>{option.label}</option>
          )}
      </select>
      <div className="invalid-feedback">{props.error}</div>
    </div>
  );
}

const InputCheckbox = props => {
  const changeFeatureHandler = e => {
    const value = e.target.value;
    const isChecked = e.target.checked;

    if (isChecked) {
      const newValue = [...props.value, value];
      props.onChange(newValue);
    } else {
      const newValue = props.value.filter(x => x !== value);
      props.onChange(newValue);
    }
  }

  return (
    <div className="form-group">
      {props.options.map(option => (
        <div className="form-check" key={option.value}>
          <input 
            type="checkbox" 
            id={option.value}
            value={option.value}
            checked={props.value.find(x => x === option.value) || false}
            onChange={changeFeatureHandler}
            className="form-check-input" />
          <label className="form-check-label" htmlFor={option.value}>{option.label}</label>
        </div>
      ))}
    </div>
  );
}

const InputFile = props => {
  const changeHandler = (e) => props.onChange(e.target.files[0]);

  return (
    <input 
      type="file" 
      onChange={changeHandler}
      ref={props.fileRef}
      className="form-control" />
  )
}

const InputRadio = props => {
  return (
    <div className="mb-3">
      {props.options.map(option => (
        <div className="form-check" key={option.value}>
          <input 
            type="radio" 
            id={`radio-${option.value}-${props.name}`} 
            value={option.value}
            name={props.name}
            onChange={e => props.onChange(e.target.value)}
            checked={props.value == option.value}
            className="form-check-input" />
          <label className="form-check-label" htmlFor={`radio-${option.value}-${props.name}`}>{option.label}</label>
        </div>
      ))}
    </div>
  );
}

function Input(props) {
  switch (props.type) {
    case 'select':
      return <InputSelect {...props} />;
    case 'password':
      return <InputText {...props} type="password" />;
    case 'email':
      return <InputText {...props} type="email" />;
    case 'checkbox':
      return <InputCheckbox {...props} />;
    case 'file':
      return <InputFile {...props} />;
    case 'radio':
      return <InputRadio {...props} />;
    case 'textarea':
      return <InputTextarea {...props} />;
    default: 
      return <InputText {...props} />;
  }
}

Input.defaultProps = {
  type: 'text',
  isValid: false,
  showError: false,
};

export default Input;