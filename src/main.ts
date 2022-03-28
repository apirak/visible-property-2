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

  let propertyNodes: PropertyNode[] = [];
  let referenceNodes: ReferenceNode[] = [];

  searchNodes.forEach(searchNode => {
    let visibleNode = new VisibleNode(searchNode, scopeNode.id);
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

  await Promise.all(propertyNodes.map(async (propertyNode, index) => {
    let success = await propertyNode.updateValue();
    return true;
  }));

  figma.closePlugin("Updated 🎉");
}


export default function () {
  updateAllTextProperty()
  // figma.notify('Updated 👍')
  // figma.closePlugin('Updated 👍');
}
