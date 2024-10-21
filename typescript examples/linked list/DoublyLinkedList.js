// ==================================== DOUBLY LINKED LIST IMPLEMENTATION =============================================
var DoublyLinkedList = /** @class */ (function () {
    function DoublyLinkedList() {
        this.head = null;
        this.tail = null;
        this.size = 0;
    }
    //   insert an element in to linked list
    DoublyLinkedList.prototype.insert = function (value) {
        // if the linked list is empty
        if (this.head === null) {
            // creating new list item
            var new_node = new DoublyListNode(value, null, null);
            this.head = new_node;
            this.tail = new_node;
            this.increaseItemCount();
            return;
        }
        // if linked list is not empty then link new node at the end of it
        // then the new node is the tail of the linked list
        if (this.tail) {
            // creating new list item
            var new_node = new DoublyListNode(value, this.tail, null);
            this.tail.next_node = new_node;
            this.tail = new_node;
            this.increaseItemCount();
            return;
        }
    };
    //   insert a list not in to an index in linked list
    DoublyLinkedList.prototype.insertAt = function (value, target_index) {
        // stop the function execution if the head is null, if target_item_index is an negative value or target_item_index is greater than list size
        if (!this.isValidIndex(target_index))
            return false;
        // handle first node insertion if given target index is 0
        if (target_index === 0) {
            // creating new list item
            var new_node = new DoublyListNode(value, null, this.head);
            if (this.head) {
                this.head.prev_node = new_node;
            }
            this.head = new_node;
            this.increaseItemCount();
            return true;
        }
        var temp_head = this.head;
        // loop until the temp head equals to previous index of target index
        for (var i = 0; i < target_index; i++) {
            if (i === target_index - 1) {
                break;
            }
            if (temp_head) {
                temp_head = temp_head === null || temp_head === void 0 ? void 0 : temp_head.next_node;
            }
        }
        if (temp_head === null || temp_head === void 0 ? void 0 : temp_head.next_node) {
            // creating new list item
            var new_node = new DoublyListNode(value, temp_head, temp_head.next_node);
            temp_head.next_node.prev_node = new_node;
            temp_head.next_node = new_node;
            this.increaseItemCount();
            return true;
        }
        return false;
    };
    // replace any link list item at a index
    DoublyLinkedList.prototype.replaceItemAt = function (value, target_index) {
        var _a, _b;
        // stop the function execution if the head is null, if target_item_index is an negative value or target_item_index is greater than list size
        if (!this.isValidIndex(target_index))
            return false;
        // if target index is 0 then replacing head
        if (target_index === 0) {
            if (!this.head)
                return false;
            var new_node_1 = new DoublyListNode(value, null, (_a = this.head) === null || _a === void 0 ? void 0 : _a.next_node);
            // setting the 1 st index list item's previous node to new node
            if (this.head.next_node) {
                this.head.next_node.prev_node = new_node_1;
            }
            this.head = new_node_1;
            return true;
        }
        //if target index equals to tail then replace the tail
        if (target_index === this.size - 1) {
            // creating new list item
            if (!((_b = this.tail) === null || _b === void 0 ? void 0 : _b.prev_node))
                return false;
            var new_node_2 = new DoublyListNode(value, this.tail.prev_node, null);
            this.tail.prev_node.next_node = new_node_2;
            this.tail = new_node_2;
            return true;
        }
        var temp_head = this.head;
        // loop until temp_head equals to target_index
        for (var i = 0; i <= target_index; i++) {
            if (i === target_index) {
                break;
            }
            if (temp_head) {
                temp_head = temp_head.next_node;
            }
        }
        // replacing new item with the existing item
        if (!temp_head || !temp_head.prev_node || !temp_head.next_node)
            return false;
        // creating new list item
        var new_node = new DoublyListNode(value, temp_head.prev_node, temp_head.next_node);
        // setting existing item's -> previous item's -> next item to  -> new item
        temp_head.prev_node.next_node = new_node;
        // setting existing item's -> next item's -> previous item to -> new item
        temp_head.next_node.prev_node = new_node;
        return true;
    };
    //   print all the elements in the linked list
    DoublyLinkedList.prototype.printList = function () {
        var temp_head = this.head;
        var items = [];
        while (temp_head !== null) {
            items.push("[".concat(temp_head.value, "]"));
            temp_head = temp_head.next_node;
        }
        console.log("\n", "List => ", items, "\n");
    };
    //   print linked list in reverse order using previous node link
    DoublyLinkedList.prototype.printListReverse = function () {
        var temp_tail = this.tail;
        var items = [];
        while (temp_tail !== null) {
            items.push("[".concat(temp_tail.value, "]"));
            temp_tail = temp_tail.prev_node;
        }
        console.log("\n", "List in reverse => ", items, "\n");
    };
    //   user given index validate and head position validate helper function
    DoublyLinkedList.prototype.isValidIndex = function (target_item_index) {
        // stop the function execution if the head is null, if target_item_index is an negative value or target_item_index is greater than list size
        if (this.head === null ||
            target_item_index < 0 ||
            target_item_index > this.size - 1)
            return false;
        return true;
    };
    DoublyLinkedList.prototype.increaseItemCount = function () {
        this.size++;
    };
    DoublyLinkedList.prototype.decreaseItemCount = function () {
        this.size--;
    };
    return DoublyLinkedList;
}());
// list node class
var DoublyListNode = /** @class */ (function () {
    function DoublyListNode(value, perv_node, next_node) {
        this.value = value;
        this.next_node = next_node;
        this.prev_node = perv_node;
    }
    return DoublyListNode;
}());
// ==================================== END OF SINGLY LINKED LIST IMPLEMENTATION =============================================
//____________________________________________________________________________________________________________________________
//____________________________________________________________________________________________________________________________
//____________________________________________________________________________________________________________________________
// ============================================= LINKED LIST OPERATIONS ======================================================
var doublyLinkedList = new DoublyLinkedList();
console.log("== Empty list ==");
doublyLinkedList.printList();
// adding items
doublyLinkedList.insert(2);
doublyLinkedList.insert(24);
doublyLinkedList.insert(4);
doublyLinkedList.insert(6);
doublyLinkedList.insert(10);
console.log("== Added items to the list ==");
doublyLinkedList.printList();
// doublyLinkedList.printListReverse();
// insert data in to a specific index in linked list
console.log("== Insert data in to a specific index in linked list <Start> [value => 1000, index => 0]==");
doublyLinkedList.insertAt(1000, 0);
doublyLinkedList.printList();
// insert data in to a specific index in linked list
console.log("== Insert data in to a specific index in linked list <Middle> [value => 2000, index => 3]==");
doublyLinkedList.insertAt(2000, 3);
doublyLinkedList.printList();
// insert data in to a specific index in linked list
console.log("== Insert data in to a specific index in linked list <End> [value => 3000, index => 6]==");
doublyLinkedList.insertAt(3000, 6);
doublyLinkedList.printList();
// replace data at a specific index in linked list
console.log("== Replace data at a specific index in linked list <Start> [value => 1, index => 0] ==");
doublyLinkedList.replaceItemAt(1, 0);
doublyLinkedList.printList();
// replace data at a specific index in linked list
console.log("== Replace data at a specific index in linked list <Middle> [value => 80, index => 3] ==");
doublyLinkedList.replaceItemAt(80, 3);
doublyLinkedList.printList();
// replace data at a specific index in linked list
console.log("== Replace data at a specific index in linked list <End> [value => 55, index => 7] ==");
doublyLinkedList.replaceItemAt(55, 7);
doublyLinkedList.printListReverse();
