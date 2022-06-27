const selectMenu = document.querySelectorAll('select')
const selectHour = document.getElementById('selectHour')
const currentTime = document.querySelector('h1')
const btn = document.querySelector('button')
const content = document.querySelector('.content')
const image  = document.querySelector('.image-container')
let alarmIsSet = false
let alarmTime
let ringtone = new Audio('./files/Riptide.mp3')
console.log(image)

// Hour generator
for (let i = 1; i <= 12; i++) {
    i = i < 10 ? "0" + i : i
    let option = `<option value="${i}">${i}</option>`
    selectMenu[0].firstElementChild.insertAdjacentHTML("afterend", option)
}

// Minute generator
for (let i = 0; i <= 59; i++) {
    i = i < 10 ? "0" + i : i
    let option = `<option value="${i}">${i}</option>`
    selectMenu[1].firstElementChild.insertAdjacentHTML("afterend", option)
}

// Time update
setInterval(() => {
    let date = new Date()
    let h = date.getHours()
    let m = date.getMinutes()
    let s = date.getSeconds()
    let amPm = "AM"

    if (h >= 12){
        h -= 12
        amPm = "PM"
    }

    h = h < 10 ? "0" + h : h
    m = m < 10 ? "0" + m : m
    s = s < 10 ? "0" + s : s
    currentTime.innerText = `${h}:${m}:${s} ${amPm}`
    if (alarmTime == `${h}:${m} ${amPm}` && alarmIsSet){
        ringtone.volume = 0.5
        ringtone.play()
        image.classList.add('image-shake')
    }


}, 1000)

btn.addEventListener('click', () => {
    // Checking for valid input
    if (selectMenu[0].value === 'Hour' || selectMenu[1].value === 'Minute' || selectMenu[2].value === 'AM/PM')
        return alert('Please enter a valid Time!')
    
    // Reseting the alarm 
    if (alarmIsSet) {
        selectMenu.forEach(item => {
            item.disabled = false
            item.classList.remove('disable')
        })
        btn.innerText = "Set alarm"
        alarmIsSet = false
        ringtone.pause()
        ringtone.currentTime = 0
        image.classList.remove('image-shake')
    } else {

    // Setting the alarm
    let time = `${selectMenu[0].value}:${selectMenu[1].value} ${selectMenu[2].value}`
    alarmTime = time
    selectMenu.forEach(item => {
        item.disabled = true
        item.classList.add('disable')  
    })
    btn.innerText = "Clear Alarm"
    alarmIsSet = true
    }
})
