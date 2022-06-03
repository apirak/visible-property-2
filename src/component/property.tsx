import { IconPlus32 } from '@create-figma-plugin/ui';
import { h, JSX } from 'preact';
import styles from '../style.css';

const Property = (props: {name:string, value:string, api?:string}) => {

  function handleOnChange(event: JSX.TargetedMouseEvent<HTMLButtonElement>) {
    const data = {name:props.name, api:props.api, value:props.value};
    const type = "ADD_TEXT";
    parent.postMessage({pluginMessage:{type, data}}, '*');
  }

  return (
    <div class={styles.property}>
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