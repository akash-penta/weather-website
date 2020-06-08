console.log('Start...')



const weatherForm=document.querySelector('form')
const search=document.querySelector('input')
const msgOne=document.querySelector('#msg-1')
const msgTwo=document.querySelector('#msg-2')
const msgThree=document.querySelector('#msg-3')

weatherForm.addEventListener('submit',(e)=>{
    e.preventDefault()
    const location=search.value
    console.log(location)
    msgOne.textContent='Loading..'
    msgTwo.textContent=''
    msgThree.textContent=''
    fetch('/weather?search='+location).then((response)=>{
    response.json().then((data)=>{
        if(data.error){
            msgOne.textContent=data.error+'. Try another search'
            msgTwo.textContent=''
            msgThree.textContent=''
        }
        else{
            msgOne.textContent=data.location
            msgTwo.textContent='Temp '+data.forecast.temp
            msgThree.textContent='Feels like '+data.forecast.feelslike
        }
    })
})
})