import { Container, Text, VerticalSpace, Divider } from '@create-figma-plugin/ui';
import { IconLayerText16, IconLayerRectangle16 } from '@create-figma-plugin/ui';
import { h } from 'preact';
import { mockupData } from '../module/mockupData';

const Document = () => {
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
    "gap": 12,
    height: "20px"
  }
  const styleNumber = {
    width: "12"
  }

  const valueRow = {
    "padding": "2px 0px 2px 0px"
  }

  function createTable(list:{ label: string; value: string; }[]) {
    const table = list.map(({label, value}) =>{
      return (
        <div style={valueRow}>
          <span style={styleLable}>{label}: </span>
          <span style={styleValue}>{value}</span>
        </div>
      );
    });
    return table;
  };

  function createHeader(){
    const header = mockupData().map(({title, list}) => {
      return (
        <div>
          <Text>{title}</Text>
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
        <Text>Manualy add property</Text>
        <VerticalSpace space='small' />
        <div style={styleTutorRow}>
          <div style={styleNumber}>1.</div>
          <div><IconLayerRectangle16 /></div>
          <div>#abc</div>
          <div style={styleValue}>← Define Reference</div>
        </div>
        <div style={styleTutorRow}>
          <div style={styleNumber}>2.</div>
          <div><IconLayerText16 /></div>
          <div>#abc.fillRGB</div>
          <div style={styleValue}>← Property</div>
        </div>
        <div style={styleTutorRow}>
          <div style={styleNumber}>3.</div>
          <div>Run Plugin</div>
        </div>
        <VerticalSpace space='small' />
        <text style={styleValue}>Learn more on <a href="https://www.youtube.com/watch?v=NoihOB1Z6qM">Youtube</a></text>
        <VerticalSpace space='medium' />
      </Container>
      <Divider />
      <Container space='medium'>
        <VerticalSpace space='small' />
        <Text>Here is property avaliable to display. You can add it after reference Name.</Text>
        <VerticalSpace space='medium' />
        {createHeader()}
      </Container>
      <Divider />
    </div>
  )
}

export { Document }