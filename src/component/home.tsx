import { Divider, IconCircleInfo16, IconCode16, IconLayerComponent16, IconLayerEllipse16, IconLayerFrame16, IconLayerGroup16, IconLayerImage16, IconLayerInstance16, IconLayerLine16, IconLayerRectangle16, IconLayerSlice16, IconLayerText16, IconLayerVector16, IconStar16 } from '@create-figma-plugin/ui';
import { IconTarget32 } from '@create-figma-plugin/ui';
import { h } from 'preact';
import { Help } from '../module/mockupData';
import { Properties } from './properties';
import styles from '../style.css';
import tutorial from '../images/tutorial.png';

const Home = (props: {
  selectedId:string,
  selectedType:string,
  selectedData:Help[]|undefined,
  selectedRefDescription:string }) => {

  const propertyLayer = {
    'display': props.selectedId == "" ? "none" : "block",
    'padding-top': '8px',
    'padding-bottom': '8px'
  }

  const helpLayer = {
    'display': props.selectedId == "" ? "block" : "none"
  }

  const typeIcon:{[key: string]: h.JSX.Element} = {
    "DEFAULT": <IconTarget32 />,
    "SLICE": <IconLayerSlice16 />,
    "FRAME": <IconLayerFrame16 />,
    "GROUP": <IconLayerGroup16 />,
    "COMPONENT_SET": <IconLayerComponent16 />,
    "COMPONENT": <IconLayerComponent16 />,
    "INSTANCE": <IconLayerInstance16 />,
    "BOOLEAN_OPERATION": <IconCircleInfo16 />,
    "VECTOR": <IconLayerVector16 />,
    "LINE": <IconLayerLine16 />,
    "ELLIPSE": <IconLayerEllipse16 />,
    "POLYGON": <IconLayerVector16 />,
    "RECTANGLE": <IconLayerRectangle16 />,
    "STAR": <IconStar16 />,
    "TEXT": <IconLayerText16 />,
    "STICKY": <IconCircleInfo16 />,
    "SHAPE_WITH_TEXT": <IconCircleInfo16 />,
    "CODE_BLOCK": <IconCode16 />,
    "STAMP": <IconCircleInfo16 />,
    "WIDGET": <IconCircleInfo16 />,
    "EMBED": <IconCode16 />,
    "LINK_UNFURL": <IconCircleInfo16 />,
    "MEDIA": <IconLayerImage16 />
  }

  let referenceName = props.selectedId ? props.selectedId : "Select a referece layer";

  return (
    <div>
      <div class={styles.selectedStyle}>
        <div class={styles.selectedIcon}>
          {typeIcon[props.selectedType]}
        </div>
        <div class={styles.selectedLayer}>{referenceName}</div>
        <div class={styles.selectedLayerStatus}>{props.selectedRefDescription}</div>
      </div>
      <Divider />
      <div>
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