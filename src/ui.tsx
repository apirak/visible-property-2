import { render } from '@create-figma-plugin/ui';
import { Tabs, TabsOption } from '@create-figma-plugin/ui';
import { useState } from 'preact/hooks'
import { h, JSX } from 'preact';
import { Document } from './component/document';
import { Home } from './component/home';

function Plugin () {
  const [value, setValue] = useState('Home');
  const [selectedId, setSelectedId] = useState("");
  const [selectedType, setSelectedType] = useState("Default");
  const [selectedData, setSelectedData] = useState();
  const [selectedName, setSelectedName] = useState("");
  const [selectedRefDescription, setSelectedRefDescription] = useState("");

  const options: Array<TabsOption> = [{
    children: <Home
      selectedId={selectedId}
      selectedType={selectedType}
      selectedData={selectedData}
      selectedRefDescription={selectedRefDescription}/>,
    value: 'Home' },{
    children: <Document />,
    value: 'Document'
  }];

  function handleChange(event: JSX.TargetedEvent<HTMLInputElement>) {
    const newValue = event.currentTarget.value
    setValue(newValue)
  };

  onmessage = (event) => {
    setSelectedId(event.data.pluginMessage.nodeId);
    setSelectedType(event.data.pluginMessage.nodeType);
    setSelectedRefDescription(event.data.pluginMessage.refDescription);
    setSelectedName(event.data.pluginMessage.nodeName);

    if (event.data.pluginMessage.properties !== null) {
      setSelectedData(event.data.pluginMessage.properties)
    }
  }

  return (
    <Tabs onChange={handleChange} options={options} value={value} />
  )
}

export default render(Plugin)