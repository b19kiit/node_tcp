const readline = require("readline");

exports.getline = async (question)=>{
  const r = readline.createInterface({
      input: process.stdin,
      output: process.stdout
  });
  return new Promise((resolve, reject) => {
    try {
      if(typeof question != 'string'){
        throw Error("1st Parameter 'question' should be type String")
      }
      r.question(question, async (ans) => {
        r.close()
        resolve(ans)
      })
    } catch (e) {
      reject(`${e}`)
    }
  });
}
