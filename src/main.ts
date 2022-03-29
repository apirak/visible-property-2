import { VisibleNode } from './visibleNode';
import { PropertyNode } from './propertyNode';
import { ReferenceNode } from './referenceNode';

function selectScopeNode():BaseNode | SceneNode | PageNode {
  const selectedNode = figma.currentPage.selection[0];
  if(selectedNode == null) {
    return figma.currentPage;
  } else {
    console.log("Selected ID: "+selectedNode.id);
    return selectedNode;
  }
}

async function updateAllTextProperty() {
  const searchNodes = figma.currentPage.findAll(node => node.name.charAt(0) === "#");
  const scopeNode = selectScopeNode();

  const propertyNodes: PropertyNode[] = [];
  const referenceNodes: ReferenceNode[] = [];

  searchNodes.forEach(searchNode => {
    const visibleNode = new VisibleNode(searchNode, scopeNode.id);
    if (visibleNode.type == "Property") {
      propertyNodes.push(new PropertyNode(visibleNode.node, scopeNode.id));
    } else {
      referenceNodes.push(new ReferenceNode(visibleNode.node, scopeNode.id));
    }
  });

  propertyNodes.forEach(propertyNode => {
    referenceNodes.forEach(referenceNode => {
      if(propertyNode.referenceName == referenceNode.referenceName){
        propertyNode.tryReferencePath(referenceNode);
      }
    });
  });

  await Promise.all(propertyNodes.map(propertyNode => {
    return propertyNode.updateValue();
  }));
}

export function updateAll() {
  updateAllTextProperty().then(() => {
    figma.closePlugin("Updated 🎉");
  })
}

export default function () {
  updateAllTextProperty().then(() => {
    figma.closePlugin("Updated x 🎉");
  })
}

//
// Command
//
switch (figma.command) {
  case 'updateAll':
    updateAll();
    break;
  default:
    break;
}