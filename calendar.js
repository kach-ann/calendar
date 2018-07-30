const months = ['Jan', 'Feb', 'March', 'Apr', "May", 'Jun', 'Jul', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];
const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
const dayAndMonth = [ 31, 30, 28, 30, 31, 30, 31, 31, 30, 31, 30, 31];
let selectedDate = new Date();
let allEvents = [];

function displayCurrentDate() {
    let dateElement = document.getElementById("dateButton");
    let date = new Date();
    let currentMonth = months[date.getMonth()]
    dateElement.innerHTML = currentMonth + " " +date.getFullYear();
}

function populateGrid (date){
    let grid = [];

    date.setDate(1);
    const firstDayOfWeek = date.getDay() === 0 ? 6 : date.getDay()-1;
    for ( let i = 0; i < firstDayOfWeek; i++){
        grid.push(null);
    }

    for ( let i = 1; i <= dayAndMonth[date.getMonth()]; i++){
        let events = allEvents.filter((event) => i === event.date.getDate() && date.getMonth() === event.date.getMonth());
        grid.push({
            day: i,
            events: events
        });
    }

    for ( let i = grid.length; i < 42; i++){
        grid.push(null)
    }

    return grid;
}


function displayPrevMonth() {
    selectedDate.setMonth(selectedDate.getMonth()-1);
    displayGrid(selectedDate)
}

function displayNextMonth() {
    selectedDate.setMonth(selectedDate.getMonth()+1);
    displayGrid(selectedDate)
}

function saveDataToLocalStorge() {
    localStorage.setItem('allEvents', JSON.stringify(allEvents));
}

function getDataFromLocalStorge(){
    allEvents = JSON.parse(localStorage.getItem('allEvents')).map((event)=> {
        event.date = new Date(event.date)
        return event;
    });
}


function displayGrid(date) {
    let grid = populateGrid(date);

    let gridBody = document.getElementById('grid');
    gridBody.innerHTML= "";
    for (let i = 0; i < 6; i++){
        let row = document.createElement('tr');
        for ( let j = 0; j < days.length; j++ ) {
            let cell = document.createElement('td');
            let dayElement = document.createElement('p');
            let gridItem = grid[(i *7) +j];
            cell.appendChild(dayElement);

            if (gridItem){
                dayElement.innerHTML = gridItem.day;
                let events = gridItem.events;
                for (let i = 0; i < events.length; i++) {
                    let eventElement = document.createElement('div');
                    eventElement.className = 'event';
                    eventElement.innerHTML = events[i].text;
                    cell.appendChild(eventElement);
                }


            }

            row.appendChild(cell);

        }
        gridBody.appendChild(row);
    }
}


// Get the modal
var modal = document.getElementById('myModal');

// Get the button that opens the modal
var btn = document.getElementById("myBtn");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks on the button, open the modal
btn.onclick = function() {
    modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
    modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}


function saveEvent() {

    let eventInformation = document.getElementById('eventInformation').value;
    let eventDate = document.getElementById('eventDate').value;

    let event = {
        date: new Date(eventDate),
        text: eventInformation
    };
    allEvents.push(event);
    modal.style.display = "none";

    saveDataToLocalStorge();

    displayGrid(selectedDate);

}



displayCurrentDate();
getDataFromLocalStorge();
displayGrid(selectedDate);




