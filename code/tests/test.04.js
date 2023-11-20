let empty = xs => !xs.length

let map
let reduce
let filter
let find
let every
let some

Suite (function () {

  map = function map (xs, fn) {
    let [y, ...ys] = xs
    return (
       empty (xs) && [] ||
      !empty (xs) && [fn (y), ...map (ys, fn)] 
    )
  }
  
  let inc = x => x+1
  let dbl = x => x+x
  let sqr = x => x*x

  return [
    map ([1, 2, 3, 4, 5], inc),
    map ([1, 2, 3, 4, 5], dbl),
    map ([1, 2, 3, 4, 5], sqr),
  ]

},

function () {

  reduce = function reduce (xs, fn, b) {
    return (function reduce$ (xs, fn, r) {
      let [y, ...ys] = xs
      return (
         empty (xs) && r ||
        !empty (xs) && reduce$ (ys, fn, fn (r, y))
      )
    })(xs, fn, b)
  }

  let add = (x, y) => x+y
  let mul = (x, y) => x*y

  return [
    reduce ([1, 2, 3, 4, 5], add, 0),
    reduce ([1, 2, 3, 4, 5], mul, 1)
  ]

},

function () {

  filter = function filter (xs, pn) {
    return reduce (xs, function (ys, x) {
      return (
         pn (x) && [...ys, x] ||
        !pn (x) && ys 
      )
    }, [])
  }
  
  let even = x =>  !(x % 2)
  let odd  = x => !!(x % 2)

  return [
    filter ([1, 2, 3, 4, 5], even),
    filter ([1, 2, 3, 4, 5], odd)
  ]

},

function () {

  find = function find (xs, e) {
    return filter (xs, function (x) {
      return x == e 
    })[0]
  }

  return [
    find ([1, 2, 3, 4, 5], 6),
    find ([1, 2, 3, 4, 5], 4),
    find ([1], 1)
  ]

},

function () {

  every = function every (xs, pn) {
    return filter (xs, pn).length == xs.length
  }

  let even = x =>  !(x % 2)
  let odd  = x => !!(x % 2)

  return [
    every ([0, 2, 4, 6, 8], even),
    every ([1, 3, 5, 7, 9], odd),
    every ([1, 2, 3, 4, 5], even)
  ]

},

function () {

  some = function some (xs, pn) {
    return filter (xs, pn).length > 0
  }

  let even = x =>  !(x % 2)
  let odd  = x => !!(x % 2)

  return [
    some ([0, 2, 4, 6, 8], even),
    some ([1, 3, 5, 7, 9], odd),
    some ([0, 2, 4, 6, 8], odd)
  ]

})
