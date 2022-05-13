import { IconPlus32 } from '@create-figma-plugin/ui';
import { useState } from 'preact/hooks';
import { h, JSX } from 'preact';
import styles from '../style.css';
import { emit } from '@create-figma-plugin/utilities';

const Property = (props: {name:string, value:string, api?:string}) => {
  const property = {
    'display': 'flex',
    'height': '32',
    'align-items': 'center',
    'padding': '0px 8px 0px 0px',
    'gap': '0'
  }

  function handleOnChange(event: JSX.TargetedMouseEvent<HTMLButtonElement>) {
    const data = {name:props.name, api:props.api, value:props.value};
    const type = "ADD_TEXT";
    parent.postMessage({pluginMessage:{type, data}}, '*');
  }

  return (
    <div style={property}>
      <span>
        <button class={styles.buttonIcon} onClick={handleOnChange}>
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