class PriorityQueue {
    constructor() {
        this.queue = [];
    }

    enqueue(element, priority) {
        const item = { element, priority };

        let inserted = false;

        for (let i = 0; i < this.queue.length; i++) {
            if (this.queue[i].priority > item.priority) {
                this.queue.splice(i, 0, item);
                inserted = true;
                break;
            }
        }
        if (!inserted) {
            this.queue.push(item);
        }
    }

    dequeue() {
        if (this.isEmpty()) {
            return null;
        }
        const elm = this.queue.shift().element;
        return elm
    }

    front() {
        if (this.isEmpty()) {
            return null;
        }
        return this.queue[0].element;
    }

    isEmpty() {
        return this.queue.length === 0;
    }

    size() {
        return this.queue.length;
    }
}

export default PriorityQueue