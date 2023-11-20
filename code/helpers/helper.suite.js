function Suite (...fns) {
  fns.forEach (function (fn, idx) {
    console.log (`[${idx+1}] - `, fn ())
  })
}

export default Suite

window.Suite = Suite