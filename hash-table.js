const sha256 = require('js-sha256');

class KeyValuePair {
  constructor(key, value) {
    this.key = key;
    this.value = value;
    this.next = null;
  }
}

class HashTable {

  constructor(numBuckets = 4) {
    this.count = 0;
    this.capacity = numBuckets;
    this.data = new Array(this.capacity).fill(null)
  }

  hash(key) {
    let hashValue = sha256(key)

    return parseInt(hashValue.substring(0, 8), 16)

  }

  hashMod(key) {


    return this.hash(key) % this.capacity
  }

  insertNoCollisions(key, value) {
    this.count++
    let idx = this.hashMod(key)
    if (this.data[idx] === null) {
      this.data[idx] = new KeyValuePair(key, value)
    } else {
      throw new Error('hash collision or same key/value pair already exists!')
    }



  }

  insertWithHashCollisions(key, value) {
    this.count++
    let idx = this.hashMod(key)
    let newPair = new KeyValuePair(key, value)

    if (!this.data[idx]) {
      this.data[idx] = newPair
      return
    }
    if (this.data[idx]) {
      newPair['next'] = this.data[idx]
      this.data[idx] = newPair
      return
    }

  }

  insert(key, value) {
    let idx = this.hashMod(key)
    let newPair = new KeyValuePair(key, value)

    if (!this.data[idx]) {
      this.count++
      this.data[idx] = newPair
      return
    }
    if (this.data[idx] && this.data[idx].key !== newPair.key) {
      let curr = this.data[idx]
      while (curr) {
        if (curr.key === newPair.key) {
          curr.value = newPair.value
          return
        }
        curr = curr.next
      }
      this.count++
      newPair['next'] = this.data[idx]
      this.data[idx] = newPair
      return
    }
  }

}


module.exports = HashTable;
