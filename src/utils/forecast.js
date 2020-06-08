const request=require('postman-request')

const forecast=(lon,lat,callback)=>{
    const url='http://api.weatherstack.com/current?access_key=f31bf6351ad9e6e28dc217f4e24518ae&query='+lon+','+lat
    request({url,json:true},(error,{body})=>{
        if(error){
            callback('unable to find weather api',undefined)
        }
        else if(body.error){
            callback('unable to find location',undefined)
        }
        else{
            callback(undefined,{
                temp:body.current.temperature,
                feelslike:body.current.feelslike
            })
        }
    })
}

module.exports=forecast