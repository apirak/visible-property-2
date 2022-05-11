import { IconPlus32 } from '@create-figma-plugin/ui';
import { useState } from 'preact/hooks';
import { h, JSX } from 'preact';
import styles from '../style.css';

const Property = (props: {name:string, value:string}) => {
  const property = {
    'display': 'flex',
    'height': '32',
    'align-items': 'center',
    'padding': '0px 8px 0px 0px',
    'gap': '0'
  }
  const valueName = {
    'flex': 'none',
    'width': '80px',
    'flex-grow': '0',
    'color': 'rgba(0, 0, 0, .3)'
  }

  const [value, setValue] = useState(false)
  function handleChange(event: JSX.TargetedMouseEvent<HTMLButtonElement>) {
    // const newValue = event.currentTarget.checked
    // console.log(newValue)
    setValue(false);
    console.log("click 2", value);
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
      <div style={valueName}>{props.name}</div>
      <div class={styles.valueSpan}>
        <span style={styles.valueStyle}>{props.value}</span>
      </div>
    </div>
  )
}

export { Property }