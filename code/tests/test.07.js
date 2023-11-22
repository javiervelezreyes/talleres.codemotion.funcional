let empty = x => !x.length

Suite (function () {

  function List (...xs) {

    function get () { return xs }

    function map (fn) {
      let ys = (function map$ (xs, fn) {
        let [y, ...ys] = xs
        return (
           empty (xs) && [] ||
          !empty (xs) && [fn (y), ...map$ (ys, fn)] 
        )
      })(xs, fn)
      return List (...ys)
    } 

    return { get, map }
  }

  let inc = x => x + 1
  let dbl = x => x + x
  let sqr = x => x * x

  return List (1, 2, 3, 4, 5)
    .map (inc)
    .map (dbl)
    .map (sqr)
    .get ()

},

function () {
  
  let flat  = x => Object.entries (x)
  let bloat = x => Object.fromEntries (x)
  let apply = (x, [y, z]) => [y, x(z)]

  function Bag (x) {

    function get () { return x }

    function map (fn) {
      let ys = (function map$ (xs, fn) {
        let [y, ...ys] = xs
        return (
           empty (xs) && [] ||
          !empty (xs) && [apply (fn, y), ...map$ (ys, fn)]
        )
      })(flat (x), fn)
      return Bag (bloat (ys))
    }

    return { get, map }
  }

  let inc = x => x + 1
  let dbl = x => x + x
  let sqr = x => x * x

  return Bag ({ x : 1, y : 2, z : 3 })
    .map (inc)
    .map (dbl)
    .map (sqr)
    .get ()

},

function () {

  function Single (x) {

    function get () { return x }

    function map (fn) {
      return Single (fn (x))
    }

    return { get, map }
  }

  let inc = x => x + 1
  let dbl = x => x + x
  let sqr = x => x * x

  return Single (3)
    .map (inc)
    .map (dbl)
    .map (sqr)
    .get ()

},

function () {

  function Sequence (fn) {

    function get (...xs) { return fn (...xs) }

    function map (gn) {
      return Sequence (function (...xs) {
        return gn (fn (...xs))
      })
    }

    return { get, map }
  }

  let id  = x => x
  let inc = x => x + 1
  let dbl = x => x + x
  let sqr = x => x * x

  return Sequence (id)
    .map (inc)
    .map (dbl)
    .map (sqr)
    .get (5)

})
