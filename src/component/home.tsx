import { Divider } from '@create-figma-plugin/ui';
import { IconTarget32 } from '@create-figma-plugin/ui';
import { h } from 'preact';
import { useState } from 'preact/hooks';
import { Help } from '../mockupData';
import { Properties } from './properties';

const Home = (props: {selectedId:string, selectedData:Help|undefined}) => {

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

  const showId = () => {
    if (typeof props.selectedId != "undefined" && props.selectedId != "") {
      setSeletedType("reference by ID");
      return props.selectedId;
    } else {
      setSeletedType("");
      return "Select a reference layer";
    }
  }

  return (
    <div>
      <div style={selectedStyle}>
        <IconTarget32 />
        <div style={selectedLayer}>{showId()}</div>
        <div style={selectedLayerStatus}>{selectedType}</div>
      </div>
      <Divider />
      <div>
        <Properties data={props.selectedData}/>
      </div>
    </div>
  );
}

export { Home }