function getQuery(key){
    let val = ''
    let params = new URLSearchParams(location.search);
    let isRewrite = !params.get(key)
    if(!isRewrite){
        val = params.get(key)
    }else{
        val = location.pathname.slice(1).split('/').pop()
    }
    return val
}
export default getQuery