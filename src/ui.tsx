import { render, Container, Text, VerticalSpace } from '@create-figma-plugin/ui';
import { h } from 'preact';

function Plugin (props: { helps:[]}) {
  const styleLable = {
    "user-select": 'text',
    "font-size": '11px',
    "font-family": '"Roboto Mono", monospace'
  }
  const styleValue = {
    color: '#a2a2a2'
  }

  function createTable(list:[]) {
    const table = list.map(({label, value}) =>{
      return (
        <div>
          <span style={styleLable}>{label}: </span>
          <span style={styleValue}>{value}</span>
        </div>
      );
    });
    return table;
  };

  function createHeader(helps:[]){
    const header = helps.map(({title, list}) => {
      return (
        <div>
          <Text bold>{title}</Text>
          <VerticalSpace space='extraSmall' />
          {createTable(list)}
          <VerticalSpace space='medium' />
        </div>
      );
    });
    return header;
  }

  return (
    <Container space='medium'>
      <VerticalSpace space='extraSmall' />
      {createHeader(props.helps)}
      <text>Learn to use plugin: <a href="#">Youtube</a></text>
    </Container>
  )
}

export default render(Plugin)