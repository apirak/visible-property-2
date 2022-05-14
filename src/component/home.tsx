import { Divider } from '@create-figma-plugin/ui';
import { IconTarget32 } from '@create-figma-plugin/ui';
import { h } from 'preact';
import { useState } from 'preact/hooks';
import { Help } from '../mockupData';
import { Properties } from './properties';
import styles from '../style.css';
import tutorial from '../images/tutorial.png';

const Home = (props: {
  selectedId:string,
  selectedData:Help|undefined,
  selectedRefDescription:string }) => {

  const [selectedType, setSeletedType] = useState("");

  const selectedStyle = {
    'display': 'flex',
    'align-items': 'center',
    'align-self': 'stretch',
    'padding': '0px 8px 0px 4px',
    'height': '40'
  };

  const selectedLayer = {
    'flex-grow': '1'
  };

  const selectedLayerStatus = {
    'color': '#B3B3B3'
  }

  const propertyLayer = {
    'display': props.selectedId == "" ? "none" : "block",
    'padding-top': '8px',
    'padding-bottom': '8px'
  }

  const helpLayer = {
    'display': props.selectedId == "" ? "block" : "none"
  }

  let referenceName = props.selectedId ? props.selectedId : "Select a referece layer";

  return (
    <div>
      <div style={selectedStyle}>
        <IconTarget32 />
        <div style={selectedLayer}>{referenceName}</div>
        <div style={selectedLayerStatus}>{props.selectedRefDescription}</div>
      </div>
      <Divider />
      <div style={propertyLayer}>
        <Properties data={props.selectedData}/>
      </div>
      <div style={helpLayer}>
        <div class={styles.helpLayer}>
          <img src={tutorial} />
        </div>
      </div>
    </div>
  );
}

export { Home }