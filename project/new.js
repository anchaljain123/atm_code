$(document).ready(function(){


    /*
     Class Atm for assigning notes value to array & printing Table
     */
    var   result=0,bank_bal=0;
    var leftamount =0;

    function Atm() {

        note_array = [2000, 500, 100, 50];
        len = note_array.length;
        count_array = [];

        for (var i = 0; i < len; i++) {// assigning  0 to count_array elements
            count_array[i] = 0;
        }

        /**
         * This function is use to take inputs from Banker side
         */
        this.fillATM = function () {
            var value = $("#max_limit").val(); //Assigning Max Limit for a day in the value

            if (value % 50 != 0 || value == 0 || value < 0) { //Enter only in Multiples of 50 notes,not negative nor 0
                alert(" Value should be either in multiple of 50 or non negative value ");

            } else {
                if (($("#2000").val() != null) && ($("#500").val() != null) && ($("#100").val() != null) && ($("#50").val() != null )
                    && ($("#max_limit").val() != null )) //adding freq of notes for 1st time only
                {
                    count_array[0] = $('#2000').val();
                    count_array[1] = $('#500').val();
                    count_array[2] = $('#100').val();
                    count_array[3] = $('#50').val();

                    for (var j = 0; j < len; j++) {//calculating leftamount in bank
                        leftamount +=count_array[j] *note_array[j];
                    }

                    result = leftamount;

                    var str = "<tr id='fillatm'>" + //update table only for the first time
                        "<td>" + result + "<\/td>" +
                        "<td>" + count_array[0] + "<\/td>" +
                        "<td>" + count_array[1] + "<\/td>" +
                        "<td>" + count_array[2] + "<\/td>" +
                        "<td>" + count_array[3] + "<\/td>" +
                        "<td>" + result + "<\/td>" +
                        "</tr>";
                    $('#table1').find('tbody').append(str);
                    $('#currentAmount').html(leftamount);
                    $('#fillatm').css({'background-color': 'green'});
                    $("#btn1").attr("disabled", true);
                }


                else document.getElementById("error").innerHTML = "Invalid Data Entry"

            }
        }

    }
    /*
     class to withdraw on customer requirement
     */

    function Log(){

        this.withdrawAmount = $("#amount").val();
        this.custAmount = parseInt(this.withdrawAmount);
        this.notereq = [];

        for (var i = 0; i < len; i++) {// assigning  0 to count_array elements
            this.notereq[i] = 0;
        }
        var k=0;

        var temp=this.custAmount;
        console.log(this.notereq);

        for (var j = 0; j < len; j++) {// calculating notes req by customer
            this.notereq[j] =Math.floor(this.custAmount / note_array[j]);
            /*if(this.notereq[j]<=count_array[j])*/
            this.custAmount%=note_array[j];

        }
        this.custAmount=temp;
        bank_bal=leftamount;

        /*
         function to withdraw amount from ATM
         */

        this.check=function() {

            var t,diffamt;
            while(k!=len) {//if bank has more money than required


                if (this.notereq[k] <=count_array[k]) {


                    if(this.notereq[k]-count_array[k]==0){
                        diffamt=(note_array[k]*count_array[k]);//when equal


                    }
                    else
                    {
                        diffamt=(note_array[k]*this.notereq[k]);//when notereq is less


                    }

                    this.custAmount-=diffamt;
                    bank_bal-=diffamt;

                    count_array[k] -= this.notereq[k];//from log table


                }

                else{

                    this.notereq[k]-=count_array[k];
                    count_array[k]=0;
                    t=Math.floor((this.notereq[k]*note_array[k])/note_array[k+1]);//making notes
                    this.notereq[k]=0;
                    this.notereq[k+1]+=t;
                }

                k++;
                console.log(bank_bal + " " + k + " " + leftamount);
                leftamount=bank_bal

            }


        }
        /*
         Function to update Log Table when withdraw amount
         */

        this.addLog = function () {
            var str = "<tr>" +
                "<td>" + this.withdrawAmount + "<\/td>" +
                "<td>" + count_array[0] + "<\/td>" +
                "<td>" + count_array[1] + "<\/td>" +
                "<td>" + count_array[2] + "<\/td>" +
                "<td>" + count_array[3] + "<\/td>" +
                "<td>" + leftamount + "<\/td>" +
                "</tr>";
            $('#table1').find('tbody').append(str);

            $('#currentAmount').html(leftamount);

            $('#table1 tbody tr').css({'background-color': 'red'});
            $('#fillatm').css({'background-color': 'green'});
        }


    }



    $('#btn1').on("click",function () {

        var object_atm=new Atm();
        object_atm.fillATM()

    });

    $('#btn2').on("click",function () {

        var cust_obj=new Log();//for each customer
        cust_obj.check();
        cust_obj.addLog();
    });






});
