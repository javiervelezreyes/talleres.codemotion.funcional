Suite (function () {

  let size = x => x.length

  function curry (fn) {
    return (function curry$ (fn, sf) {
      return function (...xs) {
        let sx = size (xs)  
        return (
          (sx >= sf) && fn (...xs) ||
          (sx <  sf) && function (...ys) {
            return curry (fn, sf-sx)(...[...xs, ...ys])
          }
        )
      }
    })(fn, size (fn))
  }

  let Ip = curry (function (a, b, c, d) {
    return [a, b, c, d]
  })

  let Local = Ip (192, 168)
  let NetX  = Local (12)
  let NetY  = Local (23)

  return [
    Ip (192, 168, 1, 1),
    NetX (1),
    NetX (2),
    NetY (1),
    NetY (2)
  ]

 })