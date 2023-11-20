let empty = xs => !xs.length

Suite (function () {

  function reverse (xs) {
    let [y, ...ys] = xs
    return (
       empty (xs) && [] ||
      !empty (xs) && [...reverse (ys), y]
    )
  }

  return [
    reverse ([1, 2, 3, 4, 5]),
    reverse ([5, 4, 3, 2, 1]),
    reverse ([1]),
  ]
  
},

function () {

  function search (xs, x) {
    return (function search$ (xs, x, p) {
      let [y, ...ys] = xs
      return (
         empty (xs) && -1 ||
        !empty (xs) && (y == x) && p ||
        !empty (xs) && (y != x) && search$ (ys, x, p+1)
      )
    })(xs, x, 1) 
  }

  return [
    search ([1, 2, 3, 4, 5], 6),
    search ([1, 2, 3, 4, 5], 4),
    search ([1], 1),
  ]

},

function () {
 
  function search (xs, x) {
    return (function search$ (xs, x, p) {
      let [y, ...ys] = xs
      return (
         empty (xs) && -1 ||
        !empty (xs) && (y == x) && p ||
        !empty (xs) && (y != x) && search$ (ys, x, p+1)
      )
    })(xs, x, 1) 
  }

  function found (v, e) {
    return search (v, e) != -1
  }

  function repeated (xs) {
    let [y, ...ys] = xs
    return (
       empty (xs) && false ||
      !empty (xs) && found (ys, y) ||
      !empty (xs) && repeated (ys)
    )
  }

  return [
    repeated ([1, 2, 3, 4, 5]),
    repeated ([1, 2, 3, 3, 5]),
    repeated ([1], 1),
  ]
  
},

function () {
  
  function insert (xs, x) {
    let [y, ...ys] = xs
    return (
       empty (xs) && [x] ||
      !empty (xs) && (y <  x) && [y, ...insert (ys, x)] ||
      !empty (xs) && (y >= x) && [x, y, ...ys]
    )
  }

  function sort (xs) {
    let [y, ...ys] = xs
    return (
       empty (xs) && [] ||
      !empty (xs) && insert (sort (ys), y)
    )
  }

  return [
    sort ([1, 2, 3, 4, 5]),
    sort ([5, 4, 3, 2, 1]),
    sort ([1])
  ]

})
