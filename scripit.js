const menuHolder = document.getElementById("menuHolder")
const orderHolder = document.getElementById("orderHolder")

let orderList = []

let menuData = [{
        "category": "coffe",
        "name": "Espresso",
        "price": 3000,
        "image": "https://pbs.twimg.com/profile_images/1000319614960787456/TLJU1nal_400x400.jpg"
    },
    {
        "category": "coffe",
        "name": "Latte",
        "price": 6000,
        "image": "https://media-cdn.tripadvisor.com/media/photo-s/12/a6/a2/e0/loved-the-latte-art.jpg"
    },
    {
        "category": "coffe",
        "name": "Cappucinno",
        "price": 6000,
        "image": "https://media-cdn.tripadvisor.com/media/photo-s/12/a6/a2/e0/loved-the-latte-art.jpg"
    },
    {
        "category": "coffe",
        "name": "Ice Coffe",
        "price": 8000,
        "image": "https://media-cdn.tripadvisor.com/media/photo-s/12/a6/a2/e0/loved-the-latte-art.jpg"
    }
]

class Order {
    constructor(name, price, image, qty) {
        this._name = name
        this._price = price
        this._image = image
        this._qty = qty
    }

    get getname() {
        return this._name
    }

    get getprice() {
        return this._price
    }

    get getimage() {
        return this._image
    }
    get getqty() {
        return this._qty
    }

    set setname(name) {
        this._name = name
    }

    set setprice(price) {
        this._price = price
    }

    set setimage(image) {
        this._image = image
    }
    set setqty(qty) {
        this._qty = qty
    }
}

menuData.forEach(obj => {
    Object.entries(obj)
    const data = `'${obj["name"]}', '${obj["price"]}', '${obj["image"]}'`
    const bindHolder = '<div onclick="MenuClicked(' + data + ')" class="card-group sorot col-md-3 p-3"> <div class="card text-center" style="border: none"> <div class="text-center"> <img style="width: 130px; height:130px; border-radius: 100%" src="' + obj["image"] + '" class="card-img-top" alt=""> </div> <div class="card-body p-0 pt-2"> <h4 class="mb-1 card-title">' + obj["name"] + '</h4> </div> <div class="card-body text-secondary p-0"> <p class=" card-title">Rp <span>' + obj["price"] + '</span></p> </div> </div> </div>'

    menuHolder.innerHTML += bindHolder
});

function MenuClicked(name, price, image) {
    console.log("menu start")
    for (let i = 0; i < orderList.length; i++) {
        if (orderList[i].getname == name) {
            orderList[i].setqty = 1 + orderList[i].getqty
            LoopOrder()
            return
        }
    }

    let order = new Order
    order.setname = name
    order.setimage = image
    order.setprice = price
    order.setqty = 1
    orderList.push(order)

    LoopOrder()
}

function LoopOrder() {
    orderHolder.innerHTML = ""

    for (let i = 0; i < orderList.length; i++) {
        $("#orderHolder").append('<div class="media p-2 mb-1"> <img src="' + orderList[i].getimage + '" class="mr-3" alt="..."> <div class="media-body"> <h5 class="mt-0 mb-0">' + orderList[i].getname + '</h5> <p style="margin: 0">Rp <span id="harga">' + orderList[i].getprice + '</span></p> <span class="badge badge-success">x' + orderList[i].getqty + '</span> </div> <div> <br> <h5 class="mb-0 mr-1">Rp <span id="totalQty">' + (orderList[i].getprice * orderList[i].getqty) + '</span></h5> </div> <div class="destroy"> <i style="color: brown" class="fas fa-times fa-lg"></i></div> </div>');
    }
    Count()
    OnDelete();
}

function OnDelete() {
    for (let position = 0; position < $(".destroy").length; position++) {
        $(`.destroy:eq(${position})`).on('click', function () {
            orderList.splice(position, 1)
            LoopOrder()
        })
    }
}

function Count() {
    if (orderList.length >= 1) {
        let rawCount = 0
        for (let i = 0; i < orderList.length; i++) {
            let price = Number(orderList[i].getprice)
            let qty = Number(orderList[i].getqty)
            rawCount += price * qty
        }
        let tax = rawCount * 10 / 100
        let totalCount = rawCount + tax

        $("#subTotal").text(rawCount)
        $("#tax").text(tax)
        $("#total").text(totalCount)
    } else if (orderList.length == 0) {
        $("#subTotal").text(0)
        $("#tax").text(0)
        $("#total").text(0)
    }
};