var fs = require('fs');
module.exports = {
  validate(num){
    for (i = 0;i<num.length;i++) {
      for (var j = i+1;j<num.length;j++) {
        if(num[i]==num[j]){
            return false;
        }
      }
      if(i===num.length-1){
        return true
      }
    }
  },
  setSecretNumber(num, cb){
    if(num.length!=4){
      cb({type:0, message:"Invalid size"})
      return
    }
    if(isNaN(num)){
      cb({type:0, message:"Fake number"})
      return
    }
    if(!this.validate(num)){
      cb({type:0, message:"Number with digits repeated"})
      return
    }
    fs.writeFile("secretKey", num,  function(err,red) {
        if(err) {
          throw err
        }
        cb({type:1, message:'Number changed'})
        return
    });
  },
  secretNumber(num, cb) {
    let secretNumber = fs.readFileSync("secretKey", 'utf8')
    let secretNumberLength = 4
    var result="";
    var x="";
    var score="";
    if(isNaN(num)){
      cb({type:0, message:"Fake number"})
      return "Fake number"
    }
    if(num.length!=4){
      cb({type:0, message:"Invalid size"})
      return "Invalid size"
    }
    if(!this.validate(num)){
      cb({type:0, message:"Number with digits repeated"})
      return"Number with digits repeated"
    }
    for (var i = 0;i<secretNumberLength;i++) {
      for (var j = 0;j<num.length;j++) {
        if(num[j]==secretNumber[i]){
          if(i==j){
              x += "X";
          }
          else{
              score += "-";
          }
        }
      }
      if(i === secretNumberLength - 1){
        result = x + score;
        cb({type:1, message:result})
        return result
      }
    }
  }
}
