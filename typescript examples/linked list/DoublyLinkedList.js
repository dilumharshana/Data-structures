// ==================================== DOUBLY LINKED LIST IMPLEMENTATION =============================================
var DoublyLinkedList = /** @class */ (function () {
    function DoublyLinkedList() {
        this.head = null;
        this.tail = null;
        this.size = 0;
    }
    DoublyLinkedList.prototype.insert = function (value) {
        // if the linked list is empty
        if (this.head === null) {
            var new_node = new DoublyListNode(value, null, null);
            this.head = new_node;
            this.tail = new_node;
            this.increaseItemCount();
            return;
        }
        // if linked list is not empty then link new node at the end of it
        // then the new node is the tail of the linked list
        if (this.tail) {
            var new_node = new DoublyListNode(value, this.tail, null);
            this.tail.next_node = new_node;
            this.tail = new_node;
            this.increaseItemCount();
            return;
        }
    };
    DoublyLinkedList.prototype.insertAt = function (value, target_index) {
        if (!this.isValidIndex(target_index))
            return false;
        if (target_index === 0) {
            var new_node = new DoublyListNode(value, null, this.head);
            if (this.head) {
                this.head.prev_node = new_node;
            }
            this.head = new_node;
            this.increaseItemCount();
            return true;
        }
        var temp_head = this.head;
        for (var i = 0; i < target_index; i++) {
            if (i === target_index - 1) {
                break;
            }
            if (temp_head) {
                temp_head = temp_head === null || temp_head === void 0 ? void 0 : temp_head.next_node;
            }
        }
        if (temp_head) {
            var new_node = new DoublyListNode(value, temp_head, temp_head.next_node);
            temp_head.next_node = new_node;
            temp_head.next_node.prev_node = new_node;
            this.increaseItemCount();
            return true;
        }
        return false;
    };
    //   print all the elements in the linked list
    DoublyLinkedList.prototype.printList = function () {
        var temp_head = this.head;
        var items = [];
        while (temp_head !== null) {
            items.push("[".concat(temp_head.value, "]"));
            temp_head = temp_head.next_node;
        }
        console.log(this.size);
        console.log("\n", "List => ", items, "\n");
    };
    DoublyLinkedList.prototype.printListReverse = function () {
        var temp_tail = this.tail;
        var items = [];
        while (temp_tail !== null) {
            items.push("[".concat(temp_tail.value, "]"));
            temp_tail = temp_tail.prev_node;
        }
        console.log("\n", "List in reverse => ", items, "\n");
    };
    // user given index validate and head position validate helper function
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
doublyLinkedList.insertAt(2000, 3);
doublyLinkedList.insertAt(3000, 6);
doublyLinkedList.printList();
