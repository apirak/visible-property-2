import { h } from "preact";
import { Help, HelpList } from "../mockupData";
import { Property } from "./property";
import { Text } from "@create-figma-plugin/ui";

const Properties = (props: {data:Help|undefined}) => {

  // function createRow(lists:{label: string; value: string}[]){
  function createRow(lists:HelpList[]){

    const list = lists.map(({label, value, api}) => {
      return (
        <Property name={label} value={value} api={api} />
      );
    });
    return list;
  }

  function createTable() {

    const headerStyle = {
      'padding': '8px',
      'color': 'var(--color-black-30)'
    }

    if(typeof props.data !== "undefined"){
      const header =  props.data.helps.map(({title, list}) => {
        return (
          <div>
            <div style={headerStyle}>{title}</div>
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