var $result;
var $symbol;
document.getElementById("table").style.visibility = "hidden";
var submit = document.getElementById('mySubmit');
$('#action-button').click(function () {
    var nzd = document.getElementById("nzdAmount").value;
    var name = document.getElementById("currency").value;
    $symbol = name;
    if (nzd == "0" || nzd < "0") {
        alertify.alert("Please enter a valid amount");
    }
    else if (name == "XXX") {
        alertify.alert("Please select a currency");
    }
    else {
        //alert(name);
        $.ajax({
            url: "http://api.fixer.io/latest?base=nzd",
            error: function () {
                $('#info').html('<p>An error has occurred</p>');
            },
            dataType: 'jsonp',
            success: function (data) {
                var $value = data.rates[name];
                $result = $value;
                //alert("This comes to: " + $result);
                calculation($result);
                $('#info')
                    .append($title)
                    .append($description);
            },
            type: 'GET'
        });
    }
});
function calculation(rates) {
    var nzAmount = document.getElementById("nzdAmount").value;
    var finalResult = nzAmount * rates;
    document.getElementById("inputSpace").innerHTML = "$NZ " + nzAmount;
    document.getElementById("rateSpace").innerHTML = $result;
    document.getElementById("resultSpace").innerHTML = finalResult.toFixed(2);
    document.getElementById("symbol").innerHTML = "Conversion Result (" + $symbol + ")";
    document.getElementById("table").style.visibility = "visible";
}
;
$(document).ready(function (e) {
    $(".names").chosen({
        width: "18%"
    });
});
