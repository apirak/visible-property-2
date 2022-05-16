import { h } from "preact";
import { Help, HelpList } from "../mockupData";
import { Property } from "./property";
import styles from "../style.css";

const Properties = (props: {data:Help[]|undefined}) => {

  function createRow(lists:HelpList[]){
    const list = lists.map(({label, value, api}) => {
      return (
        <Property name={label} value={value} api={api} />
      );
    });
    return list;
  }

  function createTable() {
    if(typeof props.data !== "undefined"){
      const header =  props.data.map(({title, list}) => {
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

  return (
    <div>
      {createTable()}
    </div>
  )
}

export { Properties }