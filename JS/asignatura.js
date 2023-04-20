var UrlApiGetAll = "http://localhost:5001/asignatura/getall";
var UrlApiInsert = "http://localhost:5001/asignatura/insertar";
var UrlApiGetOne = "http://localhost:5001/asignatura/getone/:codigo_asignatura";
var UrlApiUpdate = "http://localhost:5001/asignatura/actualizar/:codigo_asignatura";
var UrlApiDelete = "http://localhost:5001/asignatura/eliminar/:codigo_asignatura";
$(document).ready(function(){

    CargarAsignaturas();
});

function CargarAsignaturas(){
    $.ajax({
        url: UrlApiGetAll,
        type: 'GET',
        datatype: 'JSON',
        success: function(response){
            var MisItems = response;
            var Valores='';

            for(i=0; i< MisItems.length; i++)
            {
                Valores += 
                '<tr>'+
                '<td>'+MisItems[i].codigo_asignatura+'</td>'+
                '<td>'+MisItems[i].nombre_asignatura+'</td>'+
                '<td>'+MisItems[i].carrera+'</td>'+
                '<td>'+MisItems[i].fecha_creacion+'</td>'+
                '<td>'+MisItems[i].unidades_valorativas+'</td>'+
                '<td>'+MisItems[i].promedio_aprobacion+'</td>'+
                '<td>'+MisItems[i].numero_edificio+'</td>'+  
                '<td> ' +
                '<button id = "btn btn-primary" onclick="CargarAsignatura('+MisItems[i].codigo_asignatura+')">Editar</button> '+
                '</td> ' +
                '<td>'+
                '<button class="btn btn-danger" onclick="EliminarAsignatura('+MisItems[i].codigo_asignatura+')">Eliminar</button>'+
                '<td>'+
                '</tr>';
             $('#DatosAsignaturas').html(Valores);
            }
        }
    });
}
function AgregarAsignatura(){
    var datosasignatura = {
        codigo_asignatura: $('#codigoasignatura').val(),
        nombre_asignatura: $('#nombreasignatura').val(),
        carrera: $('#carrera').val(),
        fecha_creacion: $('#creacion').val(),
        unidades_valorativas: $('#unidades').val(),
        promedio_aprobacion: $('#aprobacion').val(),
        numero_edificio: $('#edificio').val(),
    };
    var datosasignaturajson= JSON.stringify(datosasignatura);

    $.ajax({
        url: UrlApiInsert,
        type: 'POST',
        data: datosasignaturajson, 
        datatype: 'JSON',
        contentType: 'application/json',
        success: function(response){
            alert('Asignatura Ingresada de Forma Correcta');
            $('#Miformulario').submit();
         },
         error: function(textStatus, errorThrown){
            alert('Error Al Insertar Asignatura'+ textStatus + errorThrown);
         }
        
            });
            alert('Aviso');
        }

        function CargarAsignatura(p_codigo_asignatura){
            var datosasignatura = {
                codigo_asignatura:p_codigo_asignatura  
            };
            var datosasignaturajson= JSON.stringify(datosasignatura);
        
            $.ajax ({ 
                url:UrlApiGetOne,
                type:'POST',
                data:datosasignaturajson,
                datatype:'JSON',
                contentType: 'application/json',
                success: function(response){
                    var MisItems = response;
                    for(i=0; i< MisItems.length; i++)
                    {
                    $('#codigoasignatura').val(MisItems[0].codigo_asignatura);
                    $('#nombreasignatura').val(MisItems[0].nombre_asignatura);
                    $('#carrera').val(MisItems[0].carrera);
                    $('#creacion').val(MisItems[0].fecha_creacion);
                    $('#unidades').val(MisItems[0].unidades_valorativas);
                    $('#aprobacion').val(MisItems[0].promedio_aprobacion);
                    $('#edificio').val(MisItems[0].numero_edificio);
        
                    var btnactualizar = '<input type="submit" class="btn btn-primary" '+
                    'id="btn_actualizar" onclick="ActualizarAsignatura('+MisItems[0].codigo_asignatura+')"  value="Actualizar Asignatura" ></input>';        
                   $('#btnagregar').html(btnactualizar) ;
          
                }
                }
            });
        }
        function ActualizarAsignatura(p_codigo_asignatura){
            var datosasignatura = {
                codigo_asignatura:p_codigo_asignatura,
        nombre_asignatura: $('#nombreasignatura').val(),
        carrera: $('#carrera').val(),
        fecha_creacion: $('#creacion').val(),
        unidades_valorativas: $('#unidades').val(),
        promedio_aprobacion: $('#aprobacion').val(),
        numero_edificio: $('#edificio').val(),
            };
            var datosasignaturajson = JSON.stringify(datosasignatura);
            //alert(datosasignaturajson);
        
            $.ajax({
                url: UrlApiUpdate,
                type: 'PUT',
                data:datosasignaturajson,
                datatype: 'JSON',
                contentType: 'application/json',
                success: function(response){
                    //console.log(response);
                    alert('Asignatura Actualizada De Forma Correcta');
                    ///$('#Miformulario').submit();
                },
                error: function(textError, errorThrown){
                    alert('Error Al Actualizar Asignatura'+ textError + errorThrown);
        
                }
            });
        
        }
        
function EliminarAsignatura(p_codigo_asignatura){
    var datosasignatura = {
        codigo_asignatura: p_codigo_asignatura
    };
    var datosasignaturajson = JSON.stringify(datosasignatura);
    //alert(JSON.stringify(datosasignaturajson));

    $.ajax({
        url: UrlApiDelete,
        type: 'DELETE',
        data:datosasignaturajson,
        datatype: 'JSON',
        contentType: 'application/json',
        success: function(response){
            //console.log(response);
            alert('Asignatura Eliminada con exito');
            $('#Miformulario').submit();
        },
        error: function(textStatus, errorThrown){
            alert('Error Al Eliminar Asignatura'+ textStatus + errorThrown);
        }

    });  
}