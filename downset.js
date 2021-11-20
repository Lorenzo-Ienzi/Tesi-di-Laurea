let downsetstring = '';
let downsetparagrah = '{}';
let downsetcoll = '';


function connectionDownset() {
        var result = [];
        let base = []; 
        downsetparagrah = '{},';
        downsetstring = '"{ }";';
        downsetcoll = '';
        for(let i = 0; i< id; i++){
            base.push(i);
        }
        for (var i = 1; i < (1 << base.length); i++) {
            var subset = [];
            for (var j = 0; j < base.length; j++)
                if (i & (1 << j)) {
                    subset.push(base[j]);
                }
            result.push(subset.join(''));
        }
        for(let i = 0; i<nodearray.length; i++){        
            for(let j = 0; j< collegamenti.length;j++){
                if(collegamenti[j].on == i){
                  nodearray[i] += collegamenti[j].on;
                  nodearray[collegamenti[j].dn] += nodearray[i];
                  nodearray[collegamenti[j].dn] += collegamenti[j].dn;
                }
                let tempset = nodearray[i].split('');
                tempset = [...new Set(tempset)];
                nodearray[i] = tempset.join('');
                let tempset2 = nodearray[collegamenti[j].dn].split('');
                tempset2 = [...new Set(tempset2)];
                nodearray[collegamenti[j].dn] = tempset2.join('');
            }
        }
        base = [];
        let temp = "";
        let nodearrayordered = [];
        for(let i = 0; i< nodearray.length; i++){
            nodearrayordered.push(nodearray[i].split('').sort().join(''));
        }
        for(let i = 0; i< result.length; i++){
            for(x in result[i]){
                for(y in nodearray[result[i].charAt(x)]){
                if(result[i].includes(nodearrayordered[result[i].charAt(x)].charAt(y))){}
                else{
                    if(!(base.includes(result[i])))
                        base.push(result[i]);
                    break;
                }
            }
        }
}
        let downsetarray=[];

        base.forEach(function(val){
            var foundIndex = result.indexOf(val);
            if(foundIndex != -1){
              result.splice(foundIndex, 1);
            }
          });
        for(let i = 0 ; i < result.length; i++){
            result[i]= result[i].toString().replace(/\B/g, ",");
            result[i] = '{'+ result[i] + '}';
            downsetparagrah += result[i]+',';
            downsetstring += '"'+result[i]+'"'+';';
        }
        downsetparagrah = downsetparagrah.slice(0, -1);
        result.push('{ }') 
        
        for (let i = 0; i < result.length; i++) {
            for (let j = 0; j < result.length; j++) {
                if (result[i] != result[j]) {
    
                    if (result[i] == '{ }' & result[j].length == 3)
                        downsetcoll += '"'+result[i] +'"'+ '->' +'"'+ result[j] + '"'+';';
                    if (result[i] != '{ }' & result[j].length == result[i].length + 2) {
                        let arrmatchnumbers1 = result[j].match(regexpr).toString().split(',').join("");
                        let arrmatchnumbers2 = result[i].match(regexpr).toString().split(',').join("");
                        matchnumber = "";
                        for (let x = 0; x <= arrmatchnumbers2; x++) {
                            currentnumber = arrmatchnumbers2[x];
                            if (arrmatchnumbers1.includes(currentnumber))
                                matchnumber += currentnumber;
                        }
                        if (matchnumber == arrmatchnumbers2)
                            downsetcoll += '"'+ result[i] + '"'+'->' + '"'+result[j] + '"'+';';
                    }
                }
            }
        }
}
