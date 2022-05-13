import { VisibleNode } from './visibleNode';
import { PropertyNode } from './propertyNode';
import { ReferenceNode } from './referenceNode';
import { setRelaunchButton } from '@create-figma-plugin/utilities';

function selectScopeNode():BaseNode | SceneNode | PageNode {
  const selectedNode = figma.currentPage.selection[0];
  if(selectedNode == null) {
    return figma.currentPage;
  } else {
    return selectedNode;
  }
}

function updateByParent(propertyNode:PropertyNode) {
  const scopeNode = figma.currentPage;

  switch(propertyNode.referenceName.toLowerCase()) {
    case "#parent":
      propertyNode.referenceNode = new ReferenceNode(propertyNode.node.parent, scopeNode.id);
      break;
    case "#topparent":
      let topParent = <SceneNode>figma.getNodeById(propertyNode.path[propertyNode.path.length - 2]);
      if(topParent){
        propertyNode.referenceNode = new ReferenceNode(topParent, scopeNode.id);
      }
      break;
  }
}

function updateById(propertyNode:PropertyNode){
  const scopeNode = figma.currentPage;

  let id = propertyNode.referenceName.match(/(?<=\[)([a-zA-Z0-9\:]+)(?=\])/);
  if(id){
    const node = <SceneNode>figma.getNodeById(id[0]);
    propertyNode.referenceNode = new ReferenceNode(node, scopeNode.id);
  }
}

async function updateAllTextProperty() {
  const searchNodes = figma.currentPage.findAll(node => /#|_#/.test(node.name));

  // const scopeNode = selectScopeNode();
  const scopeNode = figma.currentPage; // alway search all page

  const propertyNodes: PropertyNode[] = [];
  const referenceNodes: ReferenceNode[] = [];

  // Create Properties and References node list
  // also list all parent for each node
  searchNodes.forEach(searchNode => {
    const visibleNode = new VisibleNode(searchNode, scopeNode.id);
    if (visibleNode.type == "Property") {
      propertyNodes.push(new PropertyNode(visibleNode.node, scopeNode.id));
    } else {
      referenceNodes.push(new ReferenceNode(visibleNode.node, scopeNode.id));
    }
  });

  // Match the nearest reference
  propertyNodes.forEach(propertyNode => {
    if(propertyNode.referenceName.match(/#([a-zA-Z0-9\:]+)/)){
      updateByParent(propertyNode);
    } else {
      if(propertyNode.referenceName.match(/\[[0-9\:]+\]/)){
        updateById(propertyNode);
      } else {
        referenceNodes.forEach(referenceNode => {
          if(propertyNode.referenceName == referenceNode.referenceName){
            propertyNode.tryReferencePath(referenceNode);
          }
        });
      }
    }
  });

  await Promise.all(propertyNodes.map(propertyNode => {
    return propertyNode.updateValue();
  }));
}

export default function () {
  setRelaunchButton(figma.currentPage,
    'visibleproperty',
    { description: 'Run Update all text follow #Reference'});

  updateAllTextProperty().then(() => {
    figma.closePlugin("Updated 🎉");
  })
}

export {updateAllTextProperty}