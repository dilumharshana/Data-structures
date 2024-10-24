// ==================================== QUEUE IMPLEMENTATION =============================================
var Queue = /** @class */ (function () {
    function Queue() {
        this.start = null;
        this.rear = null;
        this.size = 0;
    }
    Queue.prototype.enqueue = function (value) {
        // if queue is empty
        var new_node = new QueueNode(value);
        if (this.size === 0) {
            this.start = new_node;
            this.rear = new_node;
            this.increaseItemCount();
            return true;
        }
        if (!this.rear)
            return false;
        this.rear.next_node = new_node;
        this.rear = new_node;
        this.increaseItemCount();
        return true;
    };
    Queue.prototype.dequeue = function () {
        if (!this.start)
            return false;
        var current_start_value = this.start.value;
        this.start = this.start.next_node;
        this.decreaseItemCount();
        return current_start_value;
    };
    Queue.prototype.printQueue = function () {
        var temp_start = this.start;
        var queue = [];
        while (temp_start) {
            queue.push("".concat(temp_start.value, " -> "));
            temp_start = temp_start.next_node;
        }
        console.log(queue);
    };
    Queue.prototype.increaseItemCount = function () {
        this.size++;
    };
    Queue.prototype.decreaseItemCount = function () {
        this.size--;
    };
    return Queue;
}());
var QueueNode = /** @class */ (function () {
    function QueueNode(value) {
        this.value = value;
    }
    return QueueNode;
}());
// ==================================== END OF QUEUE LIST IMPLEMENTATION =============================================
//____________________________________________________________________________________________________________________________
//____________________________________________________________________________________________________________________________
//____________________________________________________________________________________________________________________________
// ============================================= QUEUE  OPERATIONS ======================================================
var queue = new Queue();
console.log("== Empty queue ==");
queue.printQueue();
// adding items
queue.enqueue(10);
queue.enqueue(20);
queue.enqueue(4);
queue.enqueue(6);
queue.enqueue(50);
console.log("== Added items to the queue ==");
queue.printQueue();
// removing items
console.log(queue.dequeue());
console.log(queue.dequeue());
console.log(queue.dequeue());
queue.printQueue();
