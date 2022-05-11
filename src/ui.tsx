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

  const options: Array<TabsOption> = [
    { children: <Home selectedId={selectedId} selectedData={selectedData} />, value: 'Home' },
    { children: <Document />, value: 'Document' },
  ];

  function handleChange(event: JSX.TargetedEvent<HTMLInputElement>) {
    const newValue = event.currentTarget.value
    console.log(newValue)
    setValue(newValue)
  };

  onmessage = (event) => {
    const nodeId = event.data.pluginMessage.nodeId;
    const properties = event.data.pluginMessage.properties;

    console.log("nodeId", nodeId)

    if (nodeId != "") {
      setSelectedData(properties);
      setSelectedId(nodeId);
    } else {
      setSelectedId("");
    }
  }

  return (
    <Tabs onChange={handleChange} options={options} value={value} />
  )
}

export default render(Plugin)