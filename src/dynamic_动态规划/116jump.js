/**
 * lintcode 116
 * canjump
 */

function canjump(arr) {
  let n = arr.length - 1
  let f = [true]
  for (let i = 1; i <= n; i++) {
    f[i] = false
    for (let j = 0; j < i; j++) {
      if (f[j] && j + arr[j] >= i) {
        f[i] = true
        break
      }
    }
  }
  return f[n]
}

console.log(canjump([2,3,1,1,4]))

const readline = require('readline')

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

rl.on('line', num => {
    let integer = Number(num)
    let total = 0
    let n = Math.ceil(integer / 2)
    for (let i = 2; i <= n; i++) {
        while(integer % i == 0) {
            process.stdout.write(i + ' ')
            integer /= i
            total ++
        }
    }
    if (total == 0) {
        process.stdout.write(integer)
    }
    rl.close()
})