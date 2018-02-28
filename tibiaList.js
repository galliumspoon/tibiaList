//CRUD
//Create, read, delete, update
//this is a comment
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
var itemsPromise = itemsRef.once('value').then(function(snapshot) {
 return snapshot.val()
})

var itemsResolved = Promise.resolve(itemsPromise)

itemsResolved.then( function(data) {
  let dataKeys = Object.keys(data)
  console.log(dataKeys)
  for (var i = 0; i < dataKeys.length; i++) {
    let datakey = dataKeys[i]
    let item = data[datakey]
    $("#container").append(`<div class="item" id=${item.serial}><p>${item.serial}</p><p>${item.name}</p><p>${item.quantity}</p><button id='${item.serial}button'>Delete</button></div>`)
    $(`#${item.serial}button`).click(function() {
      fbRef.ref(`/items/${item.serial}`).remove()
      $(`#${item.serial}`).html('')
    })
  }
})
