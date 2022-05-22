export interface VisibleNode {
  type: string;
  debug(): any;
}

export class VisibleNode implements VisibleNode {
  node: RectangleNode | ComponentNode | TextNode | any;
  scopeNodeID: string = "";
  type: string = "";
  referenceName: string = "";
  propertyName: string = "";
  path: string[] = []; //All parent nodes by id
  topParent: RectangleNode | ComponentNode | TextNode | any;

  constructor(node: SceneNode, scopeNodeID: string) {
    this.scopeNodeID = scopeNodeID;
    this.matchNode(node);
    this.matchName();
    this.matchType();
    this.findAllParentInScope();
  }

  matchNode(node: SceneNode) {
    switch (node && node.type) {
      case "TEXT":
        this.node = <TextNode>node;
      case "COMPONENT":
        this.node = <ComponentNode>node;
        break;
      case "RECTANGLE":
        this.node = <RectangleNode>node;
        break;
      default:
        this.node = <RectangleNode>node;
        break;
    }
  }

  matchType() {
    if (this.propertyName == "") {
      this.type = "Reference";
    } else {
      this.type = "Property";
    }
  }

  matchName() {
    let names = this.node.name.match(
      /_?#([#a-zA-Z0-9\:\[\]]+).?([a-zA-Z0-9]*)/
    );
    if (names) {
      this.referenceName = names[1] ? names[1] : "";
      this.propertyName = names[2] ? names[2] : "";
    }
  }

  findAllParentInScope() {
    let currentNode: BaseNode | PageNode | SceneNode = this.node;
    while (currentNode.id != this.scopeNodeID) {
      if (currentNode.parent) {
        currentNode = currentNode.parent;
        if (currentNode) {
          this.path.push(currentNode.id);
        }
      } else {
        break;
      }
    }
  }
}
