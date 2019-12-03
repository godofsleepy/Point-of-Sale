$(document).ready(function () {
    LoopMenu()
});

let subTotal = 0
let tax = 0
let cat = ""
let totalCount = 0
let orderList = []
let menuData = [{
        "category": "Coffe",
        "name": "Espresso",
        "price": 3000,
        "image": "https://pbs.twimg.com/profile_images/1000319614960787456/TLJU1nal_400x400.jpg"
    },
    {
        "category": "Coffe",
        "name": "Hot Latte",
        "price": 4000,
        "image": "https://media-cdn.tripadvisor.com/media/photo-s/12/a6/a2/e0/loved-the-latte-art.jpg"
    },
    {
        "category": "Coffe",
        "name": "Hot Cappucinno",
        "price": 4000,
        "image": "https://globalassets.starbucks.com/assets/5c515339667943ce84dc56effdf5fc1b.jpg?impolicy=1by1_wide_1242"
    },
    {
        "category": "Coffe",
        "name": "Ice Cappuchinno",
        "price": 5000,
        "image": "https://globalassets.starbucks.com/assets/f9ad475efabb455887649f7dd453a90d.jpg?impolicy=1by1_wide_1242"
    },
    {
        "category": "Coffe",
        "name": "Ice Mocha",
        "price": 6000,
        "image": "https://globalassets.starbucks.com/assets/ca435e1035e04487b6e2fa872a1f8ba7.jpg?impolicy=1by1_wide_1242"
    },
    {
        "category": "Bread",
        "name": "Banana Bread",
        "price": 3000,
        "image": "https://www.simplyrecipes.com/wp-content/uploads/2014/08/banana-bread-vertical-c-1200.jpg"
    },
    {
        "category": "Bread",
        "name": "Coffe Bread",
        "price": 3000,
        "image": "https://www.btdelivery.com/images/product/bread/2018_caffe-uno.jpg"
    },
    {
        "category": "Bread",
        "name": "Shredded Bread",
        "price": 3000,
        "image": "https://www.btdelivery.com/images/product/bread/2018_fire-flosss.jpg"
    },
    {
        "category": "Bread",
        "name": "Cheese Chocolate Bread",
        "price": 3000,
        "image": "https://www.hollandbakery.co.id/uploads/katalog/image/afc4676f1f2424b109f700234580c233.jpg"
    },
    {
        "category": "Donut",
        "name": "Snow White",
        "price": 2000,
        "image": "http://api.vold.dev.fleava.com/pictures/5b39cd517169294aba251f43/donuts/101cd2a9-4bed-4eba-8cbf-bbf4599246c8.jpg"
    },
    {
        "category": "Donut",
        "name": "Crazy Chocolate",
        "price": 2000,
        "image": "http://api.vold.dev.fleava.com/pictures/5b39cd517169294aba251f43/donuts/8777fff0-1018-4495-b025-33bd4c2fefcd.jpg"
    },
    {
        "category": "Donut",
        "name": "Strawberry Heart",
        "price": 2000,
        "image": "http://api.vold.dev.fleava.com/pictures/5b39cd517169294aba251f43/donuts/8b24bd0b-686d-4812-a01b-d9c741158813.jpg"
    },
    {
        "category": "Donut",
        "name": "Honey",
        "price": 2000,
        "image": "http://api.vold.dev.fleava.com/pictures/5b39cd517169294aba251f43/donuts/097eddf8-e527-43fe-81c1-8db9c7718f0e.jpg"
    },
]

function LoopMenu(category) {
    $("#donutHolder").html("")
    $("#coffeHolder").html("")
    $("#breadHolder").html("")
    menuData.forEach(obj => {
        Object.entries(obj)
        const data = `'${obj["name"]}', '${obj["price"]}', '${obj["image"]}'`
        if (category != null) {
            console.log(category)
            if (obj["category"] == "Coffe" && category == "Coffe") {
                const coffeBind = BindHolder(data, obj["name"], obj["price"], obj["image"])
                $("#coffeHolder").append(coffeBind)
            } else if (obj["category"] == "Bread" && category == "Bread") {
                const breadBind = BindHolder(data, obj["name"], obj["price"], obj["image"])
                $("#breadHolder").append(breadBind)
            } else if (obj["category"] == "Donut" && category == "Donut") {
                const breadBind = BindHolder(data, obj["name"], obj["price"], obj["image"])
                $("#donutHolder").append(breadBind)
            }
        } else {
            if (obj["category"] == "Coffe") {
                const coffeBind = BindHolder(data, obj["name"], obj["price"], obj["image"])
                $("#coffeHolder").append(coffeBind)
            } else if (obj["category"] == "Bread") {
                const breadBind = BindHolder(data, obj["name"], obj["price"], obj["image"])
                $("#breadHolder").append(breadBind)
            } else if (obj["category"] == "Donut") {
                const breadBind = BindHolder(data, obj["name"], obj["price"], obj["image"])
                $("#donutHolder").append(breadBind)
            }
        }
    });
}

function BindHolder(data, name, price, image) {
    const bindHolder = `<div onclick="MenuClicked(${data})" class="card-group sorot col-md-3 p-3"> <div class="card text-center" style="border: none"> <div class="text-center"> <img style="width: 130px; height:130px; border-radius: 100%" src="${image}" class="card-img-top" alt=""> </div> <div class="card-body p-0 pt-2"> <h4 class="mb-1 card-title">${name}</h4> </div> <div class="card-body text-secondary p-0"> <p class=" card-title">Rp <span>${price}</span></p> </div> </div> </div>`
    return bindHolder;
}

function MenuClicked(name, price, image) {
    for (let i = 0; i < orderList.length; i++) {
        if (orderList[i]["name"] == name) {
            orderList[i]["qty"] += 1
            LoopOrder()
            return
        }
    }

    let order = {
        "name": name,
        "price": price,
        "image": image,
        "qty": 1,
    }
    orderList.push(order)
    LoopOrder()
}

function LoopOrder() {
    $("#orderHolder").html("")
    for (let i = 0; i < orderList.length; i++) {
        const bindHolder = `
        <div class="media p-2 mb-1"> 
        <img src="${orderList[i]["image"]}" class="mr-3" alt="..."> 
        <div class="media-body"> 
        <h5 class="mt-0 mb-0">${orderList[i]["name"]}</h5> 
        <p style="margin: 0">Rp <span>${orderList[i]["price"]}</span></p> <span class="badge badge-success">x${orderList[i]["qty"]}</span> 
        </div> 
        <div> <br> 
        <h5 class="mb-0 mr-1">Rp <span id="totalQty">${(orderList[i]["price"] * orderList[i]["qty"])}</span></h5> 
        </div> 
        <div class="destroy"> 
        <i style="color: brown" class="fas fa-times fa-lg"></i>
        </div> </div>`
        $("#orderHolder").append(bindHolder);
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
        subTotal = 0
        for (let i = 0; i < orderList.length; i++) {
            let counting = (orderList[i]["price"] * orderList[i]["qty"])
            subTotal += counting
        }
        tax = subTotal * 10 / 100
        totalCount = subTotal + tax

        $("#subTotal").text(subTotal)
        $("#tax").text(tax)
        $("#total").text(totalCount)
    } else if (orderList.length == 0) {
        $("#subTotal").text(0)
        $("#tax").text(0)
        $("#total").text(0)
    }
};

$("#payment").click(function () {
    console.log("paymen : Clicked")
    $("#invoiceHolder").html("")
    for (let i = 0; i < orderList.length; i++) {
        const bindHolder = `
        <div class="media p-2 mb-1">
        <div class="media-body d-flex">
            <h5 class="col-8 align-baseline mt-0 mb-0">${orderList[i]["name"]}</h5>
            <h6 class=""><span class="badge align-baseline badge-success">x${orderList[i]["qty"]}</span></h6>
            <h6 class="col-sm align-baseline mb-0 ml-2">Rp ${(orderList[i]["price"] * orderList[i]["qty"])}</}</h6>
        </div>
        </div>`
        $("#invoiceHolder").append(bindHolder)
    }
    $("#MSubTotal").text(subTotal)
    $("#MTax").text(tax)
    $("#MTotal").text(totalCount)
})

$(".dropdown-menu a").on('click', function () {
    $('#category-selected').text($(this).text())
    cat = $(this).text()
})

$("#btnPay").on('click', function () {
    location.reload();
})

$("#search").on('click', function () {
    if (cat == "All") {
        cat = null
    }
    LoopMenu(cat)
    console.log("searching" + $("#searchInput").val().toLowerCase())
    let value = $("#searchInput").val().toLowerCase()
    $("#menuHolder *").filter(function () {
        $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
    });
})