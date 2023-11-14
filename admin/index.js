// Login Check --------------------------------
login_check();

function login_check(){
      if (sessionStorage.getItem('token') === null) {
        window.location.href=("login.html");
      } else {
        console.log("Login Success");
      };
  };

// Logout -------------------------------
$('#logout').on('click', function(){
    sessionStorage.clear();
    window.location.href = "login.html";
});

const token = sessionStorage.getItem('token')
var myArray = []
$.ajax({
method:'post',
url:'http://localhost:5000/api/orders/getall-orders',
headers:{
'Content-Type': 'application/json',
'Authorization': 'Bearer '+token},success:function(response, code){
    myArray = response
    buildTable(myArray)
    // console.log(typeof myArray)
    // console.log(myArray)
}
})

function buildTable(data){
var table = document.getElementById('all_orders');
for (var i = 0; i < data.length; i++){
    var row = `<tr>
                    <td>${data[i]._id}</td>
                    <td>"${data[i].order_by}"</td>
                    <td>${data[i].status}</td>
                    <td>${data[i].createdAt}</td>        
                    <td>${data[i].updatedAt}</td>
                            
                    <td>${data[i].pickup_date}</td>
                    <td>${data[i].pickup_time}</td>
                    <td>${data[i].assign_to}</td>
                    <th><a href="orders.html?id=${data[i]._id}" role="button" class="btn btn-info btn-rounded btn-fw">More</a></th>
              </tr>`
    table.innerHTML += row
}
};
// Get username
function getuserdetails(id){
  $.ajax({
    method:'get',
    url:'http://localhost:5000/api/users/'+id,
    headers:{
    'Content-Type': 'application/json',
    'Authorization': 'Bearer '+token,
  },success:function(response, code){
    info = response
    }
  })
  return info.data.name;
}


//sort table --------------------------
function sortTable(n) {
  var table, rows, switching, i, x, y, shouldSwitch, dir, switchcount = 0;
  table = document.getElementById("all_orders");
  switching = true;
  //Set the sorting direction to ascending:
  dir = "asc"; 
  /*Make a loop that will continue until
  no switching has been done:*/
  while (switching) {
    //start by saying: no switching is done:
    switching = false;
    rows = table.rows;
    /*Loop through all table rows (except the
    first, which contains table headers):*/
    for (i = 1; i < (rows.length - 1); i++) {
      //start by saying there should be no switching:
      shouldSwitch = false;
      /*Get the two elements you want to compare,
      one from current row and one from the next:*/
      x = rows[i].getElementsByTagName("TD")[n];
      y = rows[i + 1].getElementsByTagName("TD")[n];
      /*check if the two rows should switch place,
      based on the direction, asc or desc:*/
      if (dir == "asc") {
        if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
          //if so, mark as a switch and break the loop:
          shouldSwitch= true;
          break;
        }
      } else if (dir == "desc") {
        if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
          //if so, mark as a switch and break the loop:
          shouldSwitch = true;
          break;
        }
      }
    }
    if (shouldSwitch) {
      /*If a switch has been marked, make the switch
      and mark that a switch has been done:*/
      rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
      switching = true;
      //Each time a switch is done, increase this count by 1:
      switchcount ++;      
    } else {
      /*If no switching has been done AND the direction is "asc",
      set the direction to "desc" and run the while loop again.*/
      if (switchcount == 0 && dir == "asc") {
        dir = "desc";
        switching = true;
      }
    }
  }
}
