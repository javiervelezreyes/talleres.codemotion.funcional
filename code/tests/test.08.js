let empty = x => !x.length
let id    = x => x

let Sequence

Suite (function () {

  Sequence = function Sequence (...fns) {
    let [gn, ...gns] = fns
    return (
       empty (fns) && id ||
      !empty (fns) && function (x) {
        return Sequence (...gns)(gn (x))
      }
    )
  }

  let inc = x => x + 1
  let dbl = x => x + x
  let sqr = x => x * x

  return Sequence (
    inc,
    dbl,
    sqr
  )(5)

},

function () {

  function Writer (x) {
    return [x, []]
  }

  function bind (fn) { 
    return function ([x, l]) {
      let [y, s] = fn (x)
      return [y, [...l, s]]
    }
  }

  let inc = x => [x + 1, 'inc']
  let dbl = x => [x + x, 'dbl']
  let sqr = x => [x * x, 'sqr']

  return Sequence (
    bind (inc),
    bind (dbl),
    bind (sqr)
  )(Writer (5))

}, 

function () {

  function List (...xs) {
    return xs
  }

  function bind (fn) { 
    return function bind$ (xs) {
      let [y, ...ys] = xs
      return (
        empty (xs) && [] ||
       !empty (xs) && [fn (y), ...bind$ (ys)]
      )
    }
  }

  let inc = x => x + 1
  let dbl = x => x + x
  let sqr = x => x * x

  return Sequence (
    bind (inc),
    bind (dbl),
    bind (sqr)
  )(List (1, 2, 3))

},

function () {

  function Maybe (x) {
    return x
  }

  function bind (fn) { 
    return function (x) {
      return (
       !x && x ||
        x && fn (x)
      )
    }
  }

  let inc = x => x + 1
  let dbl = x => x + x
  let sqr = x => x * x

  return Sequence (
    bind (inc),
    bind (dbl),
    bind (sqr)
  )(Maybe (5))

},

function () {

  let add    = x => xs => [...xs, x]
  let remove = ([_, ...xs]) => xs

  function State () {
    return []
  }

  function bind (fn) {
    return function (xs) {
      return fn (xs)
    }
  } 

  return Sequence (
    bind (add (1)),
    bind (add (2)),
    bind (add (3)),
    bind (add (4)),
    bind (remove),
    bind (remove)
  )(State ())

})
