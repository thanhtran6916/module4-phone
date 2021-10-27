let urlPhone = "http://localhost:8080/phones/";

let urlCategory = "http://localhost:8080/categories/"

showAllPhone();

function showAllPhone() {
    $.getJSON(urlPhone, function (data) {
        let content = "";
        for (let i = 0; i < data.length; i++) {
            content += showPhone(data[i]);
        }
        $("#showAllPhone").html(content);
    })
}

function showPhone(phone) {
    return `<tr><td>${phone.id}</td>
            <td>${phone.name}</td>
            <td>${phone.price}</td>
            <td>${phone.category.name}</td>
            <td><button class="btn btn-warning" onclick="showEdit(${phone.id})">Edit</button></td>
            <td><button class="btn btn-info" onclick="infoPhone(${phone.id})">Info</button></td>
            <td><button class="btn btn-danger" onclick="deletePhone(${phone.id})">Delete</button></td></tr>`
}

function showToast(data) {
    var toastLiveExample = document.getElementById('liveToast')
    var toast = new bootstrap.Toast(toastLiveExample)
    toast.show()
    $("#messageToast").text(`Name: ${data.name}, Model: ${data.model}`)
}

function infoPhone(id) {
    $.getJSON(urlPhone + id, function (result) {
        var myModal = new bootstrap.Modal(document.getElementById('modalInfo'));
        myModal.show();
        $("#nameInfo").text(result.name);
        $("#priceInfo").text(result.price);
        $("#modelInfo").text(result.model);
    })
}

// $(document).ready(function () {
//     $("#phoneForm").click(function () {
//         let check = $("#checkCreateOrEdit").val();
//         if (check != null) {
//             createAndEditPhone("PUT", urlPhone + check);
//         }
//     })
// })

function showCategory(category) {
    return `<option value="${category.id}">${category.name}</option>`
}

function showCategories() {
    $.getJSON(urlCategory, function (data) {
        let content = "";
        for (let i = 0; i < data.length; i++) {
            content += showCategory(data[i]);
        }
        $("#category").html(content);
    })
}

function showCreate() {
    let myModal = new bootstrap.Modal(document.getElementById('modalCreate'));
    $("#name").val("");
    $("#price").val("");
    showCategories();
    $("#checkCreateOrEdit").val("create");
    myModal.show();
}

function showEdit(id) {
    let myModal = new bootstrap.Modal(document.getElementById('modalCreate'));
    $("#checkCreateOrEdit").val(id);
    $.getJSON(urlPhone + id, function (result) {
        $("#name").val(result.name);
        $("#price").val(result.price);
        let content = "";
        $.getJSON(urlCategory, function (data) {
            for (let i = 0; i < data.length; i++) {
                if (id == data[i].id) {
                    content += `<option value="${data[i].id}" selected>${data[i].name}</option>`
                } else {
                    content += showCategory(data[i]);
                }
            }
            $("#category").html(content);
        })
    });
    myModal.show();
}

$(document).ready(function () {
    $("#phoneForm").click(function () {
        let check = $("#checkCreateOrEdit").val();
        if (check == "create") {
            createAndEditPhone("POST", urlPhone);
        } else {
            createAndEditPhone("PUT", urlPhone + check);
        }
    });
})

function createAndEditPhone(type, url) {
    let name = $("#name").val();
    let price = $("#price").val();
    let category = $("#category").val();
    let phone = {
        name: name,
        price: price,
        category: {
            id: category
        },
    }
    $.ajax({
        url: url,
        type: type,
        headers: {
            "Accept": "application/json",
            "Content-type": "application/json"
        },
        data: JSON.stringify(phone),
        success: function (result) {
            showAllPhone();
            showToast(result);
        }
    })
}


function deletePhone(id) {
    $.ajax({
        url: urlPhone + id,
        type: "DELETE",
        success: function (result) {
            showAllPhone();
            showToast(result);
        }
    })
}