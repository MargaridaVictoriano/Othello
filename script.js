$('table td').click(function() {
    for (var x = 0; x <= $(this).index(); x++) {
        for (var y = 0; y <= $(this).parent().index(); y++) {
            $(this).addClass('selected');
        }
    }
}, function() {
    $('table td').removeClass('selected');
});
