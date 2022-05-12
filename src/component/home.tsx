import { Divider } from '@create-figma-plugin/ui';
import { IconTarget32 } from '@create-figma-plugin/ui';
import { h } from 'preact';
import { useState } from 'preact/hooks';
import { Help } from '../mockupData';
import { Properties } from './properties';

const Home = (props: {
  selectedName:string
  selectedId:string,
  selectedData:Help|undefined,
  selectedRefDescription:string }) => {

  const [selectedType, setSeletedType] = useState("");

  const selectedStyle = {
    'display': 'flex',
    'align-items': 'center',
    'align-self': 'stretch',
    'padding': '0px 8px 0px 0px',
    'height': '40'
  };

  const selectedLayer = {
    'flex-grow': '1'
  };

  const selectedLayerStatus = {
    'color': '#B3B3B3'
  }

  console.log(props.selectedName)
  console.log(props.selectedId)
  console.log(props.selectedRefDescription)

  return (
    <div>
      <div style={selectedStyle}>
        <IconTarget32 />
        <div style={selectedLayer}>{props.selectedName}</div>
        <div style={selectedLayerStatus}>{props.selectedRefDescription}</div>
      </div>
      <Divider />
      <div>
        <Properties data={props.selectedData}/>
      </div>
    </div>
  );
}

export { Home }