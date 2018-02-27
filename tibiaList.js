//CRUD
//Create, read, delete, update

var fbRef = firebase.database()

$("#submit").click( function() {
  itemSerial = $("#itemSerial").val()
  itemName = $("#itemName").val()
  itemQuantity = $("#itemQuantity").val()

  var newItem = {
    serial : itemSerial,
    name : itemName,
    quantity : itemQuantity
  }

  var itemKey = fbRef.ref().child('items').push().key

  fbRef.ref('items/' + itemSerial).set(newItem)
})

var itemsRef = firebase.database().ref('/items/')
let data;
itemsRef.on('value', function(snapshot) {
data = snapshot.val()})

console.log(data)
