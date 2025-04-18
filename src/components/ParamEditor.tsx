import React from 'react';

// Types
interface Param {
  id: number;
  name: string;
  type: 'string';
}

interface ParamValue {
  paramId: number;
  value: string;
}

interface Color {
  id: number;
  name: string;
}

interface Model {
  paramValues: ParamValue[];
  colors: Color[];
}

interface Props {
  params: Param[];
  model: Model;
}

interface State {
  currentModel: Model;
}

// Parameter component factory
interface ParamComponentProps {
  param: Param;
  value: string;
  onChange: (value: string) => void;
}

// Text parameter component
const StringParamComponent: React.FC<ParamComponentProps> = ({ param, value, onChange }) => {
  return (
    <div className="param-field">
      <label htmlFor={`param-${param.id}`}>{param.name}</label>
      <input
        id={`param-${param.id}`}
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
};

// Parameter component registry - can be extended with new parameter types
const paramComponentRegistry = {
  string: StringParamComponent,
};

class ParamEditor extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    // Initialize state with the provided model
    this.state = {
      currentModel: {
        paramValues: [...props.model.paramValues],
        colors: [...(props.model.colors || [])]
      }
    };
  }

  // Handle parameter value changes
  handleParamChange = (paramId: number, value: string) => {
    const updatedParamValues = [...this.state.currentModel.paramValues];

    // Find the existing parameter value
    const existingValueIndex = updatedParamValues.findIndex(
      param => param.paramId === paramId
    );

    if (existingValueIndex !== -1) {
      // Update existing value
      updatedParamValues[existingValueIndex] = {
        ...updatedParamValues[existingValueIndex],
        value
      };
    } else {
      // Add new value
      updatedParamValues.push({ paramId, value });
    }

    this.setState({
      currentModel: {
        ...this.state.currentModel,
        paramValues: updatedParamValues
      }
    });
  }

  // Get current model - returns the complete structure with all parameter values
  public getModel(): Model {
    return this.state.currentModel;
  }

  // Find parameter value by ID
  getParamValue(paramId: number): string {
    const paramValue = this.state.currentModel.paramValues.find(
      param => param.paramId === paramId
    );

    return paramValue ? paramValue.value : '';
  }

  render() {
    const { params } = this.props;

    return (
      <div className="param-editor">
        <h2>Редактор параметров</h2>

        <div className="param-list">
          {params.map(param => {
            const value = this.getParamValue(param.id);
            const ParamComponent = paramComponentRegistry[param.type];

            return (
              <ParamComponent
                key={param.id}
                param={param}
                value={value}
                onChange={(newValue) => this.handleParamChange(param.id, newValue)}
              />
            );
          })}
        </div>

        <div className="actions">
          <button onClick={() => console.log(this.getModel())}>
            Показать модель в консоли
          </button>
        </div>
      </div>
    );
  }
}

export default ParamEditor;