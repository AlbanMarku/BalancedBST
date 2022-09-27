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

    prettyPrint(node = this.root, prefix = "", isLeft = true) {
        if (node.right) {
            this.prettyPrint(
                node.right,
                `${prefix}${isLeft ? "│   " : "    "}`,
                false
            );
        }
        console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
        if (node.left) {
            this.prettyPrint(
                node.left,
                `${prefix}${isLeft ? "    " : "│   "}`,
                true
            );
        }
    }
}

const tt = new Tree([1, 2, 3, 4, 5, 6, 7, 8]);
tt.insert(9, tt.root);
tt.prettyPrint();
