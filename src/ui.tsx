import { render } from '@create-figma-plugin/ui';
import { Tabs, TabsOption } from '@create-figma-plugin/ui';
import { useState } from 'preact/hooks'
import { h, JSX } from 'preact';
import { Document } from './component/document';
import { Home } from './component/home';

function Plugin () {
  const [value, setValue] = useState('Home');
  const [selectedId, setSelectedId] = useState("");
  const [selectedData, setSelectedData] = useState();
  const [selectedName, setSelectedName] = useState("");
  const [selectedRefDescription, setSelectedRefDescription] = useState("");

  const options: Array<TabsOption> = [
    { children: <Home
      selectedId={selectedId}
      selectedData={selectedData}
      selectedRefDescription={selectedRefDescription}/>, value: 'Home' },
    { children: <Document />, value: 'Document' },
  ];

  function handleChange(event: JSX.TargetedEvent<HTMLInputElement>) {
    const newValue = event.currentTarget.value
    console.log(newValue)
    setValue(newValue)
  };

  onmessage = (event) => {
    const nodeId = event.data.pluginMessage.nodeId;
    const refDescription = event.data.pluginMessage.refDescription;
    const name = event.data.pluginMessage.nodeName;

    if (event.data.pluginMessage.properties !== null) {
      setSelectedData(event.data.pluginMessage.properties)
    }

    setSelectedId(nodeId);
    setSelectedRefDescription(refDescription);
    setSelectedName(name);
  }

  return (
    <Tabs onChange={handleChange} options={options} value={value} />
  )
}

export default render(Plugin)