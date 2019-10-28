var Script = function () {


  

    $('#external-events div.external-event').each(function() {

     
        var eventObject = {
            title: $.trim($(this).text()) 
        };

        $(this).data('eventObject', eventObject);

        $(this).draggable({
            zIndex: 999,
            revert: true,      
            revertDuration: 0  
        });

    });


    var date = new Date();
    var d = date.getDate();
    var m = date.getMonth();
    var y = date.getFullYear();

    $('#calendar').fullCalendar({
        header: {
            left: 'Hoje prev,prox',
            center: 'title',
            right: 'Mes,Semana,Dia'
        },
        editable: true,
        droppable: true, 
        drop: function(date, allDay) { 

            var originalEventObject = $(this).data('eventObject');

            var copiedEventObject = $.extend({}, originalEventObject);

            copiedEventObject.start = date;
            copiedEventObject.allDay = allDay;

            $('#calendar').fullCalendar('renderEvent', copiedEventObject, true);

            if ($('#drop-remove').is(':checked')) {
                $(this).remove();
            }

        },
        events: [
            {
                title: 'Alerta em nível estável',
                start: new Date(y, m, 1)
            },
            {
                title: 'Alerta em nível critíco',
                start: new Date(y, m, d-5, 09,20),
                end: new Date(y, m, d-2)
            },
            {
                id: 999,
                title: 'Alerta em nível critíco',
                start: new Date(y, m, d-3, 16, 0),
                allDay: false
            },
            {
                id: 999,
                title: 'Alerta em nível médio',
                start: new Date(y, m, d+4, 16, 0),
                allDay: false
            },
            {
                title: 'Alerta em nível estável',
                start: new Date(y, m, d, 10, 30),
                allDay: false
            },
            {
                title: 'Alerta em nível estável',
                start: new Date(y, m, d, 12, 0),
                end: new Date(y, m, d, 14, 0),
                allDay: false
            },
            {
                title: 'Alerta em nível critíco',
                start: new Date(y, m, d+1, 19, 0),
                end: new Date(y, m, d+1, 22, 30),
                allDay: false
            },
            {
                title: 'Alerta em nível estável',
                start: new Date(y, m, 28),
                end: new Date(y, m, 29),
                url: 'http://google.com/'
            }
        ]
    });


}();