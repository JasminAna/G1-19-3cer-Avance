var UrlApiGetAll = "http://localhost:5001/matricula/getall";
var UrlApiInsert = "http://localhost:5001/matricula/insertar";
var UrlApiGetOne = "http://localhost:5001/matricula/getone/:codigo_matricula";
var UrlApiUpdate = "http://localhost:5001/matricula/actualizar/:codigo_matricula";
var UrlApiDelete = "http://localhost:5001/matricula/eliminar/:codigo_matricula";
$(document).ready(function(){

    CargarMatriculas();
});

function CargarMatriculas(){
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
                '<td>'+MisItems[i].codigo_matricula+'</td>'+
                '<td>'+MisItems[i].nombre_asignatura+'</td>'+
                '<td>'+MisItems[i].numero_alumno+'</td>'+
                '<td>'+MisItems[i].fecha_matricula+'</td>'+
                '<td>'+MisItems[i].numero_docente+'</td>'+
                '<td>'+MisItems[i].carrera+'</td>'+
                '<td>'+MisItems[i].numero_edificio+'</td>'+  
                '<td> ' +
                '<button id = "btn btn-primary" onclick="CargarMatricula('+MisItems[i].codigo_matricula+')">Editar</button> '+
                '</td> ' +
                '<td>'+
                '<button class="btn btn-danger" onclick="EliminarMatricula('+MisItems[i].codigo_matricula+')">Eliminar</button>'+
                '<td>'+
                '</tr>';
             $('#DatosMatriculas').html(Valores);
            }
        }
    });
}


function AgregarMatricula(){
    var datosmatricula = {
        codigo_matricula: $('#codigo').val(),
        nombre_asignatura: $('#nombre').val(),
        numero_alumno: $('#alumno').val(),
        fecha_matricula: $('#fecha').val(),
        numero_docente: $('#docente').val(),
        carrera: $('#carrera').val(),
        numero_edificio: $('#edificio').val(),
    };
    var datosmatriculajson= JSON.stringify(datosmatricula);

    $.ajax({
        url: UrlApiInsert,
        type: 'POST',
        data: datosmatriculajson, 
        datatype: 'JSON',
        contentType: 'application/json',
        success: function(response){
            alert('Matricula Ingresada de Forma Correcta');
            $('#Miformulario').submit();
         },
         error: function(textStatus, errorThrown){
            alert('Error Al Insertar Matricula'+ textStatus + errorThrown);
         }
        
            });
            alert('Aviso');
        }

        function CargarMatricula(p_codigo_matricula){
            var datosmatricula = {
                codigo_matricula:p_codigo_matricula  
            };
            var datosmatriculajson= JSON.stringify(datosmatricula);
        
            $.ajax ({ 
                url:UrlApiGetOne,
                type:'POST',
                data:datosmatriculajson,
                datatype:'JSON',
                contentType: 'application/json',
                success: function(response){
                    var MisItems = response;
                    for(i=0; i< MisItems.length; i++)
                    {
                    $('#codigo').val(MisItems[0].codigo_matricula);
                    $('#nombre').val(MisItems[0].nombre_asignatura);
                    $('#alumno').val(MisItems[0].numero_alumno);
                    $('#fecha').val(MisItems[0].fecha_matricula);
                    $('#docente').val(MisItems[0].numero_docente);
                    $('#carera').val(MisItems[0].carrera);
                    $('#edificio').val(MisItems[0].numero_edificio);
        
                    var btnactualizar = '<input type="submit" class="btn btn-primary" '+
                    'id="btn_actualizar" onclick="ActualizarMatricula('+MisItems[0].codigo_matricula+')"  value="Actualizar Matricula" ></input>';        
                   $('#btnagregar').html(btnactualizar) ;
          
                }
                }
            });
        }


        function ActualizarMatricula(p_codigo_matricula){
            var datosmatricula = {
                codigo_matricula:p_codigo_matricula,
                nombre_asignatura: $('#nombre').val(),
                numero_alumno: $('#alumno').val(),
                fecha_matricula: $('#fecha').val(),
                numero_docente: $('#docente').val(),
                carrera: $('#carrera').val(),
                numero_edificio: $('#edificio').val(),
            };
            var datosmatriculajson = JSON.stringify(datosmatricula);
            //alert(datosmatriculajson);
        
            $.ajax({
                url: UrlApiUpdate,
                type: 'PUT',
                data:datosmatriculajson,
                datatype: 'JSON',
                contentType: 'application/json',
                success: function(response){
                    //console.log(response);
                    alert('Matricula Actualizada De Forma Correcta');
                    ///$('#Miformulario').submit();
                },
                error: function(textError, errorThrown){
                    alert('Error Al Actualizar Matricula'+ textError + errorThrown);
        
                }
            });
        
        }

                
function EliminarMatricula(p_codigo_matricula){
    var datosmatricula = {
       codigo_matricula: p_codigo_matricula
    };
    var datosmatriculajson = JSON.stringify(datosmatricula);
    //alert(JSON.stringify(datosmatriculajson));

    $.ajax({
        url: UrlApiDelete,
        type: 'DELETE',
        data:datosmatriculajson,
        datatype: 'JSON',
        contentType: 'application/json',
        success: function(response){
            //console.log(response);
            alert('Matricula Eliminada con exito');
            $('#Miformulario').submit();
        },
        error: function(textStatus, errorThrown){
            alert('Error Al Eliminar Matricula'+ textStatus + errorThrown);
        }

    });  
}