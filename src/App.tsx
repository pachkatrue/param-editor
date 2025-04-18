import React from 'react';
import ParamEditor from './components/ParamEditor';

function App() {
  const exampleParams = [
    {
      id: 1,
      name: "Назначение",
      type: "string"
    },
    {
      id: 2,
      name: "Длина",
      type: "string"
    }
  ];

  const exampleModel = {
    paramValues: [
      {
        paramId: 1,
        value: "повседневное"
      },
      {
        paramId: 2,
        value: "макси"
      }
    ],
    colors: []
  };

  const editorRef = React.useRef<ParamEditor>(null);

  const handleGetModel = () => {
    if (editorRef.current) {
      const model = editorRef.current.getModel();
      console.log(model);
    }
  };

  return (
    <div className="App">
      <ParamEditor
        ref={editorRef}
        params={exampleParams}
        model={exampleModel}
      />
      <button onClick={handleGetModel}>Получить модель</button>
    </div>
  );
}

export default App;