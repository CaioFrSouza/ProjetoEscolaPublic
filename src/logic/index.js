module.exports = {
    arrayId : (arr1,arr2) => new Promise ((resolve,reject) => {
        let result = arr1
        let idArr1 = []
        let idArr2 = []
        for(let i = 0; i < arr1.length; i++){
            idArr1[i] = String(arr1[i]._id)
        }
        for(let i = 0; i < arr2.length; i++){
            idArr2.push(arr2[i].AtvId)
        }
        for (let i = 0; i < arr2.length; i++){
                let index = idArr1.indexOf(idArr2[i])
                if(index > -1){
                    result[index] = null
                }
            }
            

        resolve(result)
    })
    
}