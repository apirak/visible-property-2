import { render, Stack, Columns, Container, Text, VerticalSpace } from '@create-figma-plugin/ui';
import { h } from 'preact';

function Plugin (props: { helps:[]}) {
  const styleLable = {
    padding: '0px 0px 0px 4px',
    backgroundColor: '#F4F4F4',
    "user-select": 'all',
    width:'100px'
  }
  const styleValue = {
    padding: '0px 0px 0px 4px',
    backgroundColor: '#F4F4F4',
    color: '#a2a2a2'
  }
  const styleTable = {
    "font-size": '11px',
    "border-spacing": '0px 1px'
  }

  function createTable(list:[]) {
    const table = list.map(({label, value}) =>{
      return (
        <tr style="border-bottom:2px solid #ffffff;">
          <td style={styleLable}>{label}</td>
          <td style={styleValue}>{value}</td>
        </tr>
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
          <table width="100%" style={styleTable}>
          {createTable(list)}
          </table>
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
      <VerticalSpace space='extraSmall' />
    </Container>
  )
}

export default render(Plugin)