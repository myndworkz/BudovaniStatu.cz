/**
* javascript for 'daily bread' application
*/

//GLOBAL VARIABLES
var min_income = 10000; //must be >0
var max_income = 100000; //must be >0
var min_income_ln = Math.log(min_income);
var max_income_ln = Math.log(max_income);

//income -> tax function
function income2tax(income) {
  return 12*income/3;
}

$(function() {
  //set slider
  $( "#db-slider" ).slider({value:50});
  //set income field
  $("#db-income-field-text").val(slider2value($( "#db-slider" ).slider("option","value"),min_income,max_income).toFixed(0));
  //recalculate
  recalculate();
  
});

$(function() {
  //on slider change
  $("#db-slider").slider({
    change: function(event,ui) {$("#db-income-field-text").val((slider2value($( "#db-slider" ).slider("option","value"),min_income,max_income)).toFixed(0));
    recalculate();
    }
  });
  //on income change
  $("#db-income-field-text").change(function() {
    $( "#db-slider" ).slider("option","value",value2slider($("#db-income-field-text").val(),min_income,max_income));
    recalculate();
  });
  //on radio change
  $("input:radio[name=db-frequency]").change(function() {
    recalculate();
  });
});


function slider2value(slider_value,minn,maxx) {
  lnx = slider_value/100*(Math.log(maxx) - Math.log(minn)) + Math.log(minn);
  return Math.exp(lnx);
}

function value2slider(value,minn,maxx) {
  return 100*(Math.log(value) - Math.log(minn))/(Math.log(maxx) - Math.log(minn));
}

function recalculate() {
  //get income and calculate tax
  var income = $('#db-income-field-text').val();
  var tax = income2tax(income);
  //set taxes
  taxYear = parseInt(tax.toFixed(0)).toLocaleString();
  taxMonth = parseInt((tax/12).toFixed(0)).toLocaleString();
  taxDay = parseInt((tax/365).toFixed(0)).toLocaleString();
  $("#db-tax-values-year-value").html(taxYear + ' Kč');
  $("#db-tax-values-month-value").html(taxMonth + ' Kč');
  $("#db-tax-values-day-value").html(taxDay + ' Kč');
  
  $.each($(".db-chapter"),function(index,value) {
    coef = $(this).children("input").val() / $("input:radio[name=db-frequency]:checked").val();
    num = coef*tax;
    if (num > 10) numHtml = parseInt(num.toFixed(0)).toLocaleString() + ' Kč';
    else numHtml = parseFloat(num.toFixed(2)).toLocaleString() + ' Kč';
    $(this).children(".db-chapter-value").html(numHtml);
  });
}
/**
* checks if input is a number
* http://www.java2s.com/Code/JavaScript/Form-Control/AllowingOnlyNumbersintoaTextBox.htm
*/
function checkIt(evt) {
    evt = (evt) ? evt : window.event
    var charCode = (evt.which) ? evt.which : evt.keyCode
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
        status = "This field accepts numbers only."
        return false
    }
    status = ""
    return true
}
