Suite (function () {

  function add (n) {
    let idx = 0
    let out = 0
    while (idx < n) {
      out = out + n
      idx++
    }
    return out
  }

  function add (n) {
    return (
      (n == 0) && 0 ||
      (n >  0) && n + add (n-1)
    )
  }

  return [
    add (1),
    add (3),
    add (5)
  ]

},

function () {

  function mul (n) {
    return (
      (n == 0) && 1 ||
      (n >  0) && n * mul (n-1)
    )
  }

  return [ 
    mul (1),
    mul (3),
    mul (5)
  ]

},

function () {

  function pow (n, k) {
    return (
      (k == 0) && 1 ||
      (k >  0) && n * pow (n, k-1)
    )
  }

  return [ 
    pow (1, 2),
    pow (3, 3),
    pow (5, 5)
  ]

},

function () {

  let head = n => n / 10 | 0
  let tail = n => n % 10

  function add (n) {
    return (
      (n <  10) && n ||
      (n >= 10) && add (head (n)) + tail (n)
    )
  }

  return [ 
    add (12345),
    add (54321),
    add (23752)
  ]

})