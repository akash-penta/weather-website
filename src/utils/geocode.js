const request=require('postman-request')

const geocode=(address,callback)=>{
    const url='https://api.mapbox.com/geocoding/v5/mapbox.places/'+ encodeURIComponent(address) +'.json?access_token=pk.eyJ1IjoiYWthc2hwZW50YSIsImEiOiJja2IzazRya3YwNmthMnRuc3FwcmlteDBnIn0.G7R6qB_sSXV7iu2RQDKaEg'
    request({url,json:true},(error,{body})=>{
        if(error){
            callback('unable to find geocode api',undefined)
        }
        else if(body.features.length === 0){
            callback('unable to find location',undefined)
        }
        else{
            callback(undefined,{
                lon:body.features[0].center[0],
                lat:body.features[0].center[1],
                place:body.features[0].place_name
            })
        }
    })
}

module.exports=geocode