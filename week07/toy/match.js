function match(string) {
  let state = start;
  for(let key of string) {
      console.log(key)
    state = state(key)
  }
  return state === end;
}

function start(s) {
    if(s === 'a'){
        return foundA;
    } else {
        return start;
    }
}

function end(){
    return end
}

function foundA(s) {
    if(s === 'b') {
        return foundA2;
    } else {
        return start(s);
    }
}

function foundA2(s) {
    if(s === 'a') {
        return foundB2;
    } else {
        return start(s);
    }
}

function foundB2(s) {
    if(s === 'b') {
        return foundA3;
    } else {
        return start(s);
    }
}


function foundA3(s) {
    if(s === 'a') {
        return foundB3;
    } else {
        return start(s);
    }
}

function foundB3(s) {
    if(s === 'b') {
        return foundX;
    } else {
        return start(s);
    }
}

function foundX(s) {
    if(s === 'x') {
        return end;
    } else {
        return start(s);
    }
}


console.log(match('acbabababx'))