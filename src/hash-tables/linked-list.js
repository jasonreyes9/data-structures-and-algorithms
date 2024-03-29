class Node {
  constructor({ value, key }) {
    this.value = value
    this.key = key
    this.next = null
  }
}

export class SinglyLinkedList {
  constructor() {
    this.head = null
    this.tail = null
    this.length = 0
  }

  append({ value, key }) {
    if (this.head === null) {
      this.head = new Node({ value, key })
      this.tail = this.head
    } else {
      const newNode = new Node({ value, key })
      this.tail.next = newNode
      this.tail = newNode
    }

    this.length++
  }

  prepend({ value, key }) {
    if (this.head === null) {
      this.head = new Node({ value, key })
      this.tail = this.head
    } else {
      const node = new Node({ value, key })
      node.next = this.head
      this.head = node
    }

    this.length++
  }

  clear() {
    this.head = null
    this.tail = null
    this.length = 0
  }

  toArray() {
    if (this.head === null) return []

    const array = []

    let currentNode = this.head

    while (currentNode !== null) {
      array.push(currentNode.value)
      currentNode = currentNode.next
    }

    return array
  }

  find(value) {
    if (this.head === null) return null

    let currentNode = this.head

    while (currentNode !== null) {
      if (currentNode.value === value) {
        return currentNode
      }

      currentNode = currentNode.next
    }

    return null
  }

  insert(index, values) {
    if (this.head === null) return null
    if (index === 0) {
      this.prepend(value)
      this.length++
      return
    }

    const isIndexOutOfBounds = index < 0 || index > this.length

    if (isIndexOutOfBounds) return null

    let nodeBeforeIndexToBeInsertedAt = this.head

    for (let i = 0; i < index - 1; i++) {
      nodeBeforeIndexToBeInsertedAt = nodeBeforeIndexToBeInsertedAt.next
    }

    const newNode = new Node({ value: values.value, key: values.key })
    newNode.next = nodeBeforeIndexToBeInsertedAt.next
    nodeBeforeIndexToBeInsertedAt.next = newNode
    this.length++
  }

  removeAt(index) {
    if (this.head === null) return null

    const isIndexOutOfBounds = index < 0 || index > this.length
    if (isIndexOutOfBounds) return null

    if (index === 0) {
      return this.removeFirst()
    }

    let currentNode = this.head
    for (let i = 0; i < index - 1; i++) {
      currentNode = currentNode.next
    }

    const removed = currentNode.next
    currentNode.next = currentNode.next.next

    if (index === this.length - 1) {
      this.tail = currentNode
    }

    this.length--
    return removed
  }

  removeKey(key) {
    if (this.head === null) return null

    let currentNode = this.head
    let nodeBeforeKey = null

    while (currentNode !== null) {
      if (currentNode.key === key) {
        if (nodeBeforeKey === null) {
          return this.removeFirst()
        }

        nodeBeforeKey.next = currentNode.next
        this.length--
        return currentNode
      }

      nodeBeforeKey = currentNode
      currentNode = currentNode.next
    }

    return null
  }

  removeFirst() {
    if (this.head === null) return null

    const removed = this.head
    this.head = this.head.next
    this.length--

    return removed
  }

  removeLast() {
    if (this.head === null) {
      return null
    }

    let tail = this.head
    let nodeBeforeTail = null

    // This loop stops at the last node as current.next will be null for the tail
    while (tail.next !== null) {
      nodeBeforeTail = tail
      tail = tail.next
    }

    nodeBeforeTail.next = null
    this.tail = nodeBeforeTail
    this.length--

    return tail
  }
}
