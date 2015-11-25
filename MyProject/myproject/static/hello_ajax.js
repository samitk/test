function check(){
    jQuery.ajax({
        url     : '/register',
        type    : 'POST',
        dataType: 'json',
        success : function(data){
            alert("Success. Got the message:\n "+ data.message)
        }
    });
}
