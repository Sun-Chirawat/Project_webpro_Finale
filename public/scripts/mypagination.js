// alert("test");

// data
const product = [
    {"name": "shirt", "price": 199 ,"image": "shirt.jpg"},
    {"name": "shoe", "price": 99 ,"image": "shoe.jpg"},
    {"name": "hat", "price": 69 ,"image": "hat.jpg"},
    {"name": "coat", "price": 299 ,"image": "coat.jpg"},
    {"name": "socks", "price": 199 ,"image": "sock.jpg"},
    {"name": "glove", "price": 99 ,"image": "glove.jpg"},
    {"name": "glassses", "price": 69 ,"image": "glasses.jpg"},
    {"name": "horse", "price": 299 ,"image": "horse.jpg"},
    
];

function template(data){
    let myhtml = '';
    for(let i=0; i<data.length; i++){
        // myhtml = myhtml + '<p>'+data[i].name+' '+data[i].price+'</p>';
        // myhtml += `<p>${data[i].name} ${data[i].price} bath</p>`;
        myhtml += `<div class="card text-center">`;
        myhtml += `<img class="card-img-top" src="images/${data[i].image}" style="width:50%;">`;
        myhtml += `<div class="card-body>`;
        myhtml += `<h4 class="card-title">${data[i].name}</h4>`;
        myhtml += `<p class="card-text">${data[i].price} bath</p>`;
        myhtml += `</div></div>`;
    }
    return myhtml;
}

$(document).ready(function () {
    $("#pg").pagination({
        dataSource: product,
        pageSize: 6,
        callback: function(data, pagination) {
           const myhtml = template(data);
           $("#data").html(myhtml);
        }
    });
});