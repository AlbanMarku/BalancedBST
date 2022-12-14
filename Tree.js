import Node from "./index.js";

class Tree {
    constructor(array) {
        this.array = array;
        this.root = this.buildTree(this.array, 0, this.array.length - 1);
    }

    buildTree(array, start, end) {
        if (start > end) {
            return;
        }
        const mid = parseInt((start + end) / 2);
        const root = new Node(array[mid]);

        root.left = this.buildTree(array, start, mid - 1);
        root.right = this.buildTree(array, mid + 1, end);

        return root;
    }

    insert(data, current) {
        if (current == null) return new Node(data);
        if (current.data == data) return;

        if (data < current.data) {
            current.left = this.insert(data, current.left);
        } else if (data > current.data) {
            current.right = this.insert(data, current.right);
        }
        return current;
    }

    delete(data, current) {
        if (current == null) return;

        if (data < current.data) {
            current.left = this.delete(data, current.left);
        } else if (data > current.data) {
            current.right = this.delete(data, current.right);
        } else {
            if (current.data == data) {
                if (current.left == null && current.right == null) {
                    return null;
                } else if (current.left == null) {
                    return current.right;
                } else if (current.right == null) {
                    return current.left;
                } else {
                    let tempNode = this.findMin(current.left);
                    current.data = tempNode.data;

                    current.left = this.delete(tempNode.data, current.left);
                    return current;
                }
            }
            0;
        }
        return current;
    }

    findMin(current) {
        if (current.left) {
            return this.findMin(current.left);
        } else {
            return current;
        }
    }

    find(data, current) {
        if (current == null) return;

        if (data < current.data && current.left) {
            return this.find(data, current.left);
        } else if (data > current.data && current.right) {
            return this.find(data, current.right);
        } else if (current.data == data) {
            return console.log(current.data);
        } else {
            return console.log("Number not in tree.");
        }
    }

    levelOrder(current, callback) {
        if (current == null) return;

        let queue = [];
        let list = [];
        queue.push(current);

        while (queue.length != 0) {
            let nodeItem = queue[0];
            if (nodeItem) {
                list.push(nodeItem.data);
                if (nodeItem.left != null) queue.push(nodeItem.left);
                if (nodeItem.right != null) queue.push(nodeItem.right);
            }
            callback(nodeItem.data);
            queue.shift();
        }

        return console.log(list);
    }

    prettyPrint(node = this.root, prefix = "", isLeft = true) {
        if (node.right) {
            this.prettyPrint(
                node.right,
                `${prefix}${isLeft ? "???   " : "    "}`,
                false
            );
        }
        console.log(`${prefix}${isLeft ? "????????? " : "????????? "}${node.data}`);
        if (node.left) {
            this.prettyPrint(
                node.left,
                `${prefix}${isLeft ? "    " : "???   "}`,
                true
            );
        }
    }

    iamTheCallBackExample(data) {
        console.log("Here is your data in a specified order " + data);
    }
}

const tt = new Tree([1, 2, 3, 4, 5, 6, 7, 8]);
tt.prettyPrint();
tt.levelOrder(tt.root, tt.iamTheCallBackExample);
