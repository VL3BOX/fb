function getQuery(key){
    let val = ''
    let params = new URLSearchParams(location.search);
    let isRewrite = !params.get(key)
    if(!isRewrite){
        val = params.get(key)
    }else{
        let arr = location.pathname.slice(1).split('/')
        val = arr[1]
    }
    return val
}
export default getQuery