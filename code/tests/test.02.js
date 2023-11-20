Suite (function () {

  let head = n => n / 10 | 0
  let tail = n => n % 10

  function reverse (n) {
    return (function reverse$ (n, m) {
      return (
        (n == 0) && m ||
        (n >  0) && reverse$ (head (n), m * 10 + tail (n))
      )
    })(n, 0)
  }

  return [
    reverse (1),
    reverse (12345),
    reverse (54321),
  ]

},

function () {

  let head = n => n / 10 | 0
  let tail = n => n % 10

  function add (n) {
    return (function add$ (n, m) {
      return (
        (n == 0) && m ||
        (n >  0) && add$ (head (n), m + tail (n))
      )
    })(n, 0)
  }

  return [
    add (12345),
    add (54321),
    add (23752)
  ]

},

function () {

  let head = n => n / 10 | 0
  let tail = n => n % 10
  let even = n =>  !(n % 2)
  let odd  = n => !!(n % 2)

  function cut (n) {
    return (function cut$ (n, e, o) {
      return (
        (n == 0) && [...e, ...o] ||
        even (n) && cut$ (head (n), [...e, tail (n)], o) ||
        odd  (n) && cut$ (head (n), e, [...o, tail (n)])
      )
    })(n, [], [])
  }

  return [
    cut (12345),
    cut (54321),
    cut (23752)
  ]

}, 

function () {

  let join = (r, n) => r * 10 + n

  function repeat (c, k) {
    return (function repeat$ (c, k, r) {
      return (
        (k == 0) && r || 
        (k >  0) && repeat$ (c, k-1, join (r, c)) 
      )
    })(c, k, 0)
  }

  return [
    repeat (5, 3),
    repeat (4, 6),
    repeat (2, 1)
  ]

})
