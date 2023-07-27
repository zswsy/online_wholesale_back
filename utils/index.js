exports.getTime= function  (){
    const time= new Date()
    const year= time.getFullYear().toString();
    const month=(time.getMonth()+1).toString().padStart(2,'0');
    const date=time.getDate().toString().padStart(2,'0');
    const hour=time.getHours().toString().padStart(2,'0');
    const minute = time.getMinutes().toString().padStart(2,'0');
    const second = time.getSeconds().toString().padStart(2,'0');
    const str = year+'-'+month+'-'+date+' '+hour+':'+minute+':'+second;
    return str;
}
