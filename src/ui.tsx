import { render, Container, Text, VerticalSpace, Divider } from '@create-figma-plugin/ui';
import { IconLayerText16, IconLayerRectangle16 } from '@create-figma-plugin/ui';
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
  const styleTutorRow = {
    display: "flex",
    "flex-direction": "row",
    "align-items": "flex-start",
    "gap": 8,
    height: "20px"
  }
  const styleNumber = {
    width: "12"
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
    <div>
    <Container space='medium'>
      <VerticalSpace space='small' />
      <div style={styleTutorRow}>
        <div style={styleNumber}>1.</div>
        <div><IconLayerRectangle16 /></div>
        <div>#Color</div>
        <div style={styleValue}>← Define Reference</div>
      </div>
      <div style={styleTutorRow}>
        <div style={styleNumber}>2.</div>
        <div><IconLayerText16 /></div>
        <div>#Color.fillRGB</div>
        <div style={styleValue}>← Property</div>
      </div>
      <div style={styleTutorRow}>
        <div style={styleNumber}>3.</div>
        <div>Run Plugin</div>
      </div>
      <VerticalSpace space='small' />
    </Container>
    <Divider />
    <Container space='medium'>
      <VerticalSpace space='small' />
      {createHeader(props.helps)}
    </Container>
    <Divider />
    <Container space='medium'>
      <VerticalSpace space='small' />
      <text style={styleValue}>Learn more on <a href="#">Youtube</a></text>
      <VerticalSpace space='medium' />
    </Container>
    </div>
  )
}

export default render(Plugin)