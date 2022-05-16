import { h } from "preact";
import { Help, HelpList } from "../mockupData";
import { Property } from "./property";
import styles from "../style.css";

function createRow(lists:HelpList[]){
  const list = lists.map(({label, value, api}) => {
    return (
      <Property name={label} value={value} api={api} />
    );
  });
  return list;
}

function createTable(data:Help[]|undefined) {
  if(typeof data !== "undefined"){
    const header =  data.map(({title, list}) => {
      return (
        <div>
          <div class={styles.headerStyle}>{title}</div>
          {createRow(list)}
        </div>
      )
    });
    return header;
  } else {
    return "No data";
  }
}

const Properties = (props:{data:Help[]|undefined}) => {
  return (
    <div>
      {createTable(props.data)}
    </div>
  )
}

export { Properties }