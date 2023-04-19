var UrlApiGetAll = "http://localhost:5001/docente/getall";
var UrlApiInsert = "http://localhost:5001/docente/insertar";
var UrlApiGetOne = "http://localhost:5001/docente/getone/:numero_docente";
var UrlApiUpdate = "http://localhost:5001/docente/actualizar/:numero_docente";
var UrlApiDelete = "http://localhost:5001/docente/eliminar/:numero_docente";
$(document).ready(function(){

    CargarDocentes();
});

function CargarDocentes(){
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
                '<td>'+MisItems[i].numero_docente+'</td>'+
                '<td>'+MisItems[i].nombre+'</td>'+
                '<td>'+MisItems[i].apellidos+'</td>'+
                '<td>'+MisItems[i].fecha_contratacion+'</td>'+
                '<td>'+MisItems[i].direccion+'</td>'+
                '<td>'+MisItems[i].salario+'</td>'+
                '<td>'+MisItems[i].profesion+'</td>'+  
                '<td> ' +
                '<button id = "btn btn-primary" onclick="CargarDocente('+MisItems[i].numero_docente+')">Editar</button> '+
                '</td> ' +
                '<td>'+
                '<button class="btn btn-danger" onclick="EliminarDocente('+MisItems[i].numero_docente+')">Eliminar</button>'+
                '<td>'+
                '</tr>';
             $('#DatosDocentes').html(Valores);
            }
        }
    });
}
function AgregarDocente(){
    var datosdocente = {
        numero_docente: $('#numerodocente').val(),
        nombre: $('#nombre').val(),
        apellidos: $('#apellidos').val(),
        fecha_contratacion: $('#contratacion').val(),
        direccion: $('#direccion').val(),
        salario: $('#salario').val(),
        profesion: $('#profesion').val(),
    };
    var datosdocentejson= JSON.stringify(datosdocente);

    $.ajax({
        url: UrlApiInsert,
        type: 'POST',
        data: datosdocentejson, 
        datatype: 'JSON',
        contentType: 'application/json',
        success: function(response){
            alert('Docente Ingresado de Forma Correcta');
            $('#Miformulario').submit();
         },
         error: function(textStatus, errorThrown){
            alert('Error Al Insertar Docente'+ textStatus + errorThrown);
         }
        
            });
            alert('Aviso');
        }

        function CargarDocente(p_numero_docente){
            var datosdocente = {
              numero_docente:p_numero_docente  
            };
            var datosdocentejson= JSON.stringify(datosdocente);
        
            $.ajax ({ 
                url:UrlApiGetOne,
                type:'POST',
                data:datosdocentejson,
                datatype:'JSON',
                contentType: 'application/json',
                success: function(response){
                    var MisItems = response;
                    for(i=0; i< MisItems.length; i++)
                    {
                    $('#numerodocente').val(MisItems[0].numero_docente);
                    $('#nombre').val(MisItems[0].nombre);
                    $('#apellidos').val(MisItems[0].apellidos);
                    $('#contratacion').val(MisItems[0].fecha_contratacion);
                    $('#direccion').val(MisItems[0].direccion);
                    $('#salario').val(MisItems[0].salario);
                    $('#profesion').val(MisItems[0].profesion);
        
                    var btnactualizar = '<input type="submit" class="btn btn-primary" '+
                    'id="btn_actualizar" onclick="ActualizarDocente('+MisItems[0].numero_docente+')"  value="Actualizar Docente" ></input>';        
                   $('#btnagregar').html(btnactualizar) ;
          
                }
                }
            });
        }
        function ActualizarDocente(p_numero_docente){
            var datosdocente = {
                numero_docente:p_numero_docente,
                nombre: $('#nombre').val(),
                apellidos: $('#apellidos').val(),
                fecha_contratacion: $('#contratacion').val(),
                direccion: $('#direccion').val(),
                salario: $('#salario').val(),
                profesion: $('#profesion').val(),
            };
            var datosdocentejson = JSON.stringify(datosdocente);
            //alert(datosdocentejson);
        
            $.ajax({
                url: UrlApiUpdate,
                type: 'PUT',
                data:datosdocentejson,
                datatype: 'JSON',
                contentType: 'application/json',
                success: function(response){
                    //console.log(response);
                    alert('Docente Actualizado De Forma Correcta');
                    ///$('#Miformulario').submit();
                },
                error: function(textError, errorThrown){
                    alert('Error Al Actualizar Docente'+ textError + errorThrown);
        
                }
            });
        
        }
        
function EliminarDocente(p_numero_docente){
    var datosdocente = {
        numero_docente: p_numero_docente
    };
    var datosdocentejson = JSON.stringify(datosdocente);
    //alert(JSON.stringify(datosdocentejson));

    $.ajax({
        url: UrlApiDelete,
        type: 'DELETE',
        data:datosdocentejson,
        datatype: 'JSON',
        contentType: 'application/json',
        success: function(response){
            //console.log(response);
            alert('Docente Eliminado con exito');
            $('#Miformulario').submit();
        },
        error: function(textStatus, errorThrown){
            alert('Error Al Eliminar El Docente'+ textStatus + errorThrown);
        }

    });  
}
