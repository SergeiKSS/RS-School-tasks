function Node(key, value) {
    this.key = key;
    this.value = value;

    this.left = null;
    this.right = null;
}

function BinarySearchTree() {
    this._root = null;
}

BinarySearchTree.prototype.insert = function(key, value) {
  if (!this._root) {
    this._root = new Node(key, value);
    return this;
  }

  let currentNode = this._root;
  let newNode = new Node(key, value);

  while(currentNode) {
    if (key < currentNode.key) {
      if (!currentNode.left) {
        currentNode.left = newNode;
        return this;
      }
      else {
        currentNode = currentNode.left;
      }
    }
    else {
      if (!currentNode.right) {
        currentNode.right = newNode;
        return this;
      }
      else {
        currentNode = currentNode.right;
      } 
    }
  }
}

BinarySearchTree.prototype.search = function(key) {
  if (this._root.key == key) {
    return this._root.value;
  }

  let currentNode = this._root;
  
  while(currentNode) {
    if (key < currentNode.key) {
      if (currentNode.left.key == key) {
        return currentNode.left.value;
      }
      else {
        currentNode = currentNode.left;
      }
    }
    else {
      if (currentNode.right.key == key) {
        return currentNode.right.value;
      }
      else {
        currentNode = currentNode.right;
      } 
    }
  }
}

BinarySearchTree.prototype.contains = function(value) {
  if (!this._root) {
      return false;
  }
}

BinarySearchTree.prototype.traverse = function(order) {

}

BinarySearchTree.prototype.root = function() {
  if (this._root) {
    return this._root.value;
  }
  return this._root;
}


module.exports = {
  BinarySearchTree,

  //WARNING!!!
  //PROVIDE BST STRUCTURE FOR TESTS {STRING}
  root: '_root',
  left: 'left',
  right: 'right',
  //NAME FOR REPORTS
  student: 'Sergei Karpovich'
};
