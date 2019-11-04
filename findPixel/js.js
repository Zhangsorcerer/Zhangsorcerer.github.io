$(function(){
    $(document).mousemove(function(e){
        $('#coordinates').html('x: ' + e.pageX + ' y : ' + e.pageY);
    });
})