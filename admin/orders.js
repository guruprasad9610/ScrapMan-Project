// Login Check --------------------------------
login_check();

function login_check(){
    $(document).ready( function () {
      if (sessionStorage.getItem('token') === null) {
        window.location.href=("login.html");
      } else {
        pageload();
      }
  });
  };

// Logout -------------------------------
$('#logout').on('click', function(){
    sessionStorage.clear();
    window.location.href = "login.html";
});

var final_details = Array();
var place_data = {};


const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get('id');
// console.log(id);
final_details.push({"user_id": id});

//fetch Order details
const token = sessionStorage.getItem('token');
var orders = []
function pageload(){
$.ajax({
  method:'get',
  url:'http://localhost:5000/api/orders/'+id,
  headers:{
  'Content-Type': 'application/json',
  'Authorization': 'Bearer '+sessionStorage.getItem('token'),
},success:function(response, code){
  orders = response
  // console.log(response);
  place_data["order_id"] = orders._id;
  place_data["pickup_date"] = orders.pickup_date;
  place_data["pickup_time"] = orders.pickup_time



  // fetch user id---------------------------------------
    $.ajax({
      method:'get',
      url:'http://localhost:5000/api/users/'+orders.order_by,
      headers:{
      'Content-Type': 'application/json',
      'Authorization': 'Bearer '+token,
    },success:function(response, code){
      info = response
        document.getElementById('username').innerText = `${info.data.name}`;
        document.getElementById('email').innerText = `Email :${info.data.email}`;
        document.getElementById('mobile').innerText = `Mobile :${info.data.mobile}`;        
      }
    })
    // console.log(order);
    put_data(orders);
  }
  })
};

function getAllAgents(){
  $.ajax({
    method:'get',
    url:'http://localhost:5000/api/users/getAllAgents',
    headers:{
    'Content-Type': 'application/json',
    'Authorization': 'Bearer '+token,
  },success:function(response, code){
    var all_agents = Array();
    for(let i = 0; i<response.length; i++){
      all_agents.push({"id": response[i]._id, "name": response[i].name})
    };
    buildTables(all_agents);    
    }
    
  })
}
  
getAllAgents();

function put_data(data){
  document.getElementById('order_id').innerText = `Order Id :${orders._id}`;
  var order_date = orders.createdAt.split("T")
  const dates= order_date[0].substring(8,10);
  const month= order_date[0].substring(5,7);
  const year= order_date[0].substring(0,4);
  var _date = dates+"-"+month+"-"+year;
  document.getElementById('order_date').innerText = _date;
  var order_date = orders.createdAt.split("T")
  document.getElementById('order_time').innerText = order_date[1].substring(0,8);
  document.getElementById('status').innerText = `Status :${orders.status}`;
  // console.log("Color text ---------"+orders.status);

  const color_text = document.getElementById('status');
  
  switch(orders.status){
    case -1:
      color_text.style.backgroundColor = 'white';
      break;
    case 0:
      color_text.style.backgroundColor = 'red';
      break;
    case 1:
      color_text.style.backgroundColor = 'yellow';
      break;
    case 2:
      color_text.style.backgroundColor = 'blue';
      break;
    case 3:
      color_text.style.backgroundColor = 'red';
      break;
    case 4:
      color_text.style.backgroundColor = 'black';
      break;
    case 5:
      color_text.style.backgroundColor = 'green';
      break;
  }

  // Weight and price ------------------------------
  document.getElementById('weight').innerText = `Estimated Weight :${totalweight(orders.items)[1]}`;
  document.getElementById('price').innerText = `Estimated Price :${totalweight(orders.items)[0]}`;
  final_details.push({"full_address": full_address});
  document.getElementById('address').innerText = full_address();
  // Item Table---------------------------------------------------------------
  buildTable(orders.items)

  var table = $('#item').DataTable({
  "lengthMenu": [ [15, 50, 100, -1], [15, 50, 100, "All"] ],
  scrollY: 400,
  scrollCollapse: true,
  order: [[ 0, 'asc' ], [3, 'desc' ]],
      })

function buildTable(data){
var table = document.getElementById('item');
for (var i = 0; i < data.length; i++){
    var row = `<tr>
                    <td>${data[i].item_id}</td>
                    <td>${data[i].item_name}</td>
                    <td>${data[i].item_price}</td>
                    <td>${data[i].item_weight}</td>        
                    <td>${data[i].item_old}</td>
              </tr>`
    table.innerHTML += row
      }
    };
};

function totalweight(data){
  var weight = 0;
  var price = 0;
  var totalPrice = 0;
  var totalweight = 0;

  //console.log(data.length)
  for (var i = 0; i < data.length; i++){
      totalPrice += data[i].item_weight*data[i].item_price
      //console.log(totalPrice)
        }
  for (var i = 0; i < data.length; i++){
      totalweight += Number(data[i].item_weight)
      //console.log(totalweight)
      }
  final_details.push({"totalPrice": totalPrice});
  final_details.push({"totalweight": totalweight});
  return [totalPrice, totalweight]
}


function buildTables(data){
  $("#select").empty();
  for (var i = 0; i < data.length; i++){
      $("#select").append(new Option(data[i].name, data[i].id));      
        }
  var x = document.getElementById("select");
  place_data["agent_id"] = x.value;
};

   // User Info
function full_address(){
  var add = `${orders.location.address}, Landmark : ${orders.location.landmark}, 
              PIN : ${orders.location.pincode}, Dist - ${orders.location.district},${orders.location.state}(${orders.location.country}),
              Lattitude & Longitude : ${orders.location.lat},${orders.location.long},
              `
  return add
};

// Display Available Slots -----------------------------------------------------------
function slots(){
  $.ajax({
    method:'get',    
    url:'http://localhost:5000/api/slot/getAll',
    headers:{
    'Authorization': 'Bearer '+token,
    crossDomain: true,
    dataType: 'jsonp'
    },success:function(response, code){   
      // console.log("Availabe Slots-----------");
      // console.log(response);
      var slots = document.getElementById("slots");
      for (var i = 0; i < response.length; i++){
        var row = `<tr>
                    <td>${response[i].date}</td>
                    <td>${response[i].time}</td>
                  </tr>`
          slots.innerHTML += row
          }
    }
    
  })
}
slots();

//console.log(place_data)

function place_order(){
  $.ajax({
    method:'post',
    data : place_data,
    url:'http://localhost:5000/api/assign/assign-order',
    headers:{
    'Authorization': 'Bearer '+token,
     crossDomain: true,
    dataType: 'jsonp'
    },success:function(response, code){   
      console.log(response);
      if (response.msg == 'order assigned') {
        $('#alert').show().delay(5000).fadeOut();
        $('#success').show().delay(5000).fadeOut();
      } else {
        $('#alert').show().delay(20000).fadeOut();
        $('#error').show().delay(20000).fadeOut();
      }
    }
    
  })
 };
 $('#alert').hide();
 $('#success').hide();
 $('#error').hide()

 
