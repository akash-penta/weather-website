const path=require('path')
const hbs=require('hbs')
const express=require('express')
const geocode=require('./utils/geocode.js')
const forecast=require('./utils/forecast.js')

const app=express()
const port=process.env.PORT || 3000

app.set('view engine','hbs')
app.set('views',path.join(__dirname,'../templates/views'))
app.use(express.static(path.join(__dirname,'../public')))
hbs.registerPartials(path.join(__dirname,'../templates/partials'))
//app.com
app.get('',(req,res)=>{
    res.render('index',{
        title:'Weather App',
        name:'Akash'
    })
})

//app.com/help.hsb
app.get('/help',(req,res)=>{
    res.render('help',{
        title:'Help',
        msg:'This is some helpful text.',
        name:'Akash'
    })
})

//app.com/about.hsb
app.get('/about',(req,res)=>{
    res.render('about',{
        title:'About me',
        name:'Akash'
    })
})

app.get('/weather',(req,res)=>{
    if(!req.query.search){
        return res.send({
            error:'you must provide a location'
        })
    }
    geocode(req.query.search,(error,{lat,lon,place}={})=>{
        if(error){
            return res.send({
                error:error
            })
        }
        else{
            forecast(lat,lon,(error,foredata)=>{
                if(error){
                    return res.send({
                        error:error
                    })
                }
                return res.send({
                    forecast:foredata,
                    location:place,
                    search:req.query.search
                })
            })
        }
    })
})

//app.com/help/xxxx
app.get('/help/*',(req,res)=>{
    res.render('error',{
        title:'404 Error',
        errormsg:'help article not found',
        name:'Akash'
    })
})

//app.com/xxxx
app.get('*',(req,res)=>{
    res.render('error',{
        title:'404 Error',
        errormsg:'page not found',
        name:'Akash'
    })
})

app.listen(port,()=>{
    console.log('Server started...')
})