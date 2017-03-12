$(document).ready(function(){


    /*
     Class Atm for assigning notes value to array & printing Table
     */
    var   result=0;
    var leftamount =0;

    function Atm()
    {
        this.WithdrawalAmount=0;
        this.note_array=[2000,500,100,50];
        var len=this.note_array.length;
        this.count_array=[];

        for (var i =0; i<len; i++) {// assigning  0 to count_array elements
            this.count_array[i] = 0;
        }

        /**
         * This function is use to take inputs from Banker side
         */
        this.fillATM = function() {
            var value = $("#max_limit").val(); //Assigning Max Limit for a day in the value

            if (value % 50 != 0 || value == 0 || value < 0) { //Enter only in Multiples of 50 notes,not negative nor 0
                alert(" Value should be either in multiple of 50 or non negative value ");

            } else {
                if (($("#2000").val() != null) && ($("#500").val() != null) && ($("#100").val() != null) && ($("#50").val() != null )
                    && ($("#max_limit").val() != null )) //adding freq of notes for 1st time only
                {
                    this.count_array[0] = $('#2000').val();
                    this.count_array[1] = $('#500').val();
                    this.count_array[2] = $('#100').val();
                    this.count_array[3] = $('#50').val();

                    for(var j=0;j<len;j++){//calculating leftamount in bank
                        leftamount+=this.count_array[j]*this.note_array[j];
                    }

                    result=leftamount;

                    var str = "<tr id='fillatm'>" + //update table only for the first time
                        "<td>" + result + "<\/td>" +
                        "<td>" + this.count_array[0] + "<\/td>" +
                        "<td>" + this.count_array[1] + "<\/td>" +
                        "<td>" + this.count_array[2] + "<\/td>" +
                        "<td>" + this.count_array[3] + "<\/td>" +
                        "<td>" + result + "<\/td>" +
                        "</tr>";
                    $('#table1').find('tbody').append(str);
                    $('#currentAmount').html(this.leftAmount);
                    $('#fillatm').css({'background-color': 'green'});
                    $("#btn1").attr("disabled", true);
                }


                else document.getElementById("error").innerHTML = "Invalid Data Entry"

            }
        }
        /*
         Function to update Log Table when withdraw amount
         */
        this.addLog=function ()
        {
            var str = "<tr>" +
                "<td>" + leftamount +"<\/td>" +
                "<td>" + this.count_array[0] +"<\/td>" +
                "<td>" + this.count_array[1] +"<\/td>" +
                "<td>" + this.count_array[2] +"<\/td>" +
                "<td>" +this.count_array[3] +"<\/td>" +
                "<td>" +result +"<\/td>" +
                "</tr>";
            $('#table1').find('tbody').append(str);
            $('#currentAmount').html(o.leftAmount);
            $('#table1 tbody tr').css({ 'background-color' : 'red'});
            $('#fillatm').css({ 'background-color' : 'green'});
        }

    }


    /*
     function to withdraw on customer requirement
     */





    $('#btn1').on("click",function () {

        var object_atm=new Atm();
        object_atm.fillATM()

    })
















});
