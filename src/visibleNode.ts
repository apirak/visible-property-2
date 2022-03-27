export interface VisibleNode {
  type: string;
  // getType(): string;
  debug(): any;
}

export class VisibleNode implements VisibleNode{
  node: SceneNode;
  scopeNodeID: string = "";
  type: string = "";
  referenceName: string = "";
  propertyName: string = "";
  path: string[] = [];

  constructor(node: SceneNode, scopeNodeID: string) {
    this.node = node;
    this.scopeNodeID = scopeNodeID;
    this.matchName();
    this.matchType();
    this.findAllParentInScope();
  }

  matchType() {
    if(this.propertyName == "") {
      this.type = "Reference";
    } else {
      this.type = "Property";
    }
  }

  matchName() {
    let names = this.node.name.match(/#([a-zA-Z\:]+).?([a-zA-Z]*)/);
    if (names) {
      this.referenceName = names[1] ? names[1] : "";
      this.propertyName = names[2] ? names[2] : "";
    }
  }

  findAllParentInScope() {
    let currentNode: BaseNode | PageNode | SceneNode = this.node;
    while (currentNode.id != this.scopeNodeID) {
      if (currentNode.parent){
        currentNode = currentNode.parent;
        if(currentNode) {
          this.path.push(currentNode.id);
        }
      } else {
        break;
      }
    }
  }

  debug(){
    console.log('type: ' + this.type);
    console.log('reference: ' + this.referenceName);
    console.log('property: ' + this.propertyName);
    console.log('path: ' + this.path);
    console.log('------');
  }

}