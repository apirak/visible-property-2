import { IconPlus32 } from '@create-figma-plugin/ui';
import { useState } from 'preact/hooks';
import { h, JSX } from 'preact';
import styles from '../style.css';
import { emit } from '@create-figma-plugin/utilities';

const Property = (props: {name:string, value:string}) => {
  const property = {
    'display': 'flex',
    'height': '32',
    'align-items': 'center',
    'padding': '0px 8px 0px 0px',
    'gap': '0'
  }

  function handleChange(event: JSX.TargetedMouseEvent<HTMLButtonElement>) {
    console.log("event", event);

    const data = props.name;
    console.log("b");
    // emit('ADDTEXT', data);
    parent.postMessage({pluginMessage:props.name}, '*');
    console.log("c");
  }

  function handleOnClick(){

  }

  return (
    <div style={property}>
      <span>
        <button class={styles.buttonIcon} onClick={handleChange}>
          <IconPlus32 />
        </button>
      </span>
      <div class={styles.valueName}>{props.name}</div>
      <div class={styles.valueSpan}>
        <span class={styles.valueStyle}>{props.value}</span>
      </div>
    </div>
  )
}

export { Property }