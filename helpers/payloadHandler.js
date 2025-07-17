
module.exports = (payload={}) => {
    let data = Object();
    data['isNull'] = false;
    for(let items in payload){
        if(payload[items] == '' || payload[items] == null || payload[items] == undefined){
            data[items] = payload[items] ?? '';
            data['isNull'] = true;
            return data;
        }
    }
    return data;
}