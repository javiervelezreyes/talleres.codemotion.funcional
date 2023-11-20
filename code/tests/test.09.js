let empty = x => !x.length
let id    = x => x


Suite (function () {

  function Stream (...fns) {
    let [gn, ...gns] = fns
    return (
       empty (fns) && id ||
      !empty (fns) && function (x) {
        return Stream (...gns)(gn (x))
      }
    )
  }

  function map (fn) {
    return function (x) {
      return x && fn (x)
    }
  }

  function filter (fn) {
    return function (x) {
      return x && fn (x) && x || undefined
    }
  }

  function reduce (fn, b) {
    return function (x) {
      return x && (b = fn (b, x))
    }
  }

  function Random (n, x, y) {
    return function (fn) {
      let idx = 0
      while (idx < n) {
        fn (Math.random () * (y-x) + x | 0)
        idx++
      }
    }
  }

  let inc = x => x + 1
  let dbl = x => x + x
  let sqr = x => x * x
  let grt = x => y => y > x
  let lss = x => y => y < x
  let add = (x, y) => x + y

  let stream = Stream (
    map (inc),
    map (dbl),
    map (sqr),
    filter (grt (20)),
    filter (lss (100)),
    reduce (add, 0),
    map (console.log)
  )
  
  Random (10, 1, 5)(stream)

  return 'ok'

})