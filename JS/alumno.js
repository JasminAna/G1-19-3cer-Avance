var UrlApiGetAll = "http://localhost:5001/alumno/getall";
var UrlApiInsert = "http://localhost:5001/alumno/insertar";
var UrlApiGetOne = "http://localhost:5001/alumno/getone/:numero_alumno";
var UrlApiUpdate = "http://localhost:5001/alumno/actualizar/:numero_alumno";
var UrlApiDelete = "http://localhost:5001/alumno/eliminar/:numero_alumno";
$(document).ready(function(){
    CargarAlumnos();
});

function CargarAlumnos(){
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
                '<td>'+MisItems[i].numero_alumno+'</td>'+
                '<td>'+MisItems[i].nombre+'</td>'+
                '<td>'+MisItems[i].apellido+'</td>'+
                '<td>'+MisItems[i].fecha_nacimiento+'</td>'+
                '<td>'+MisItems[i].direccion+'</td>'+
                '<td>'+MisItems[i].altura+'</td>'+
                '<td>'+MisItems[i].carrera+'</td>'+  
                '<td> ' +
                '<button id = "btn btn-primary" onclick="CargarAlumno('+MisItems[i].numero_alumno+')">Editar</button> '+
                '</td> ' +
                '<td>'+
                '<button class="btn btn-danger" onclick="EliminarAlumno('+MisItems[i].numero_alumno+')">Eliminar</button>'+
                '<td>'+

                

                '</tr>';
             $('#DatosAlumnos').html(Valores);
            }
        }
    });
}


function AgregarAlumno(){
            var datosalumno = {
                numero_alumno: $('#numeroalumno').val(),
                nombre: $('#nombre').val(),
                apellido: $('#apellido').val(),
                fecha_nacimiento: $('#fechanacimiento').val(),
                direccion: $('#direccion').val(),
                altura: $('#altura').val(),
                carrera: $('#carrera').val(),
            };
            var datosalumnojson= JSON.stringify(datosalumno);

            $.ajax({
                url: UrlApiInsert,
                type: 'POST',
                data: datosalumnojson, 
                datatype: 'JSON',
                contentType: 'application/json',
                success: function(response){
                    alert('Estudiante ingresado con exito');
                    $('#Miformulario').submit();
        },
        error : function(textError, errorThrown){
            alert('Error al insertar el Estudiante: ' + textError + errorThrown);
        }

            });
}

function CargarAlumno(p_numero_alumno){
    var datosalumno = {
        numero_alumno:p_numero_alumno  
    };
    var datosalumnojson= JSON.stringify(datosalumno);

    $.ajax ({ 
        url:UrlApiGetOne,
        type:'POST',
        data:datosalumnojson,
        datatype:'JSON',
        contentType: 'application/json',
        success: function(response){
            var MisItems = response;
            for(i=0; i< MisItems.length; i++)
            {
            $('#numeroalumno').val(MisItems[0].numero_alumno);
            $('#nombre').val(MisItems[0].nombre);
            $('#apellido').val(MisItems[0].apellido);
            $('#fechanacimiento').val(MisItems[0].fecha_nacimiento);
            $('#direccion').val(MisItems[0].direccion);
            $('#altura').val(MisItems[0].altura);
            $('#carrera').val(MisItems[0].carrera);

            var btnactualizar = '<input type="submit" class="btn btn-primary" '+
            'id="btn_actualizar" onclick="ActualizarAlumno('+MisItems[0].numero_alumno+')"  value="Actualizar Alumno" ></input>';        
           $('#btnagregar').html(btnactualizar) ;
  
        }
        }
    });
}
function ActualizarAlumno(p_numero_alumno){
    var datosalumno = {
        numero_alumno:p_numero_alumno,
        nombre: $('#nombre').val(),
        apellido: $('#apellido').val(),
        fecha_nacimiento: $('#fechanacimiento').val(),
        direccion: $('#direccion').val(),
        altura: $('#altura').val(),
        carrera: $('#carrera').val()
    };
    var datosalumnojson = JSON.stringify(datosalumno);
    //alert(datosalumnojson);

    $.ajax({
        url: UrlApiUpdate,
        type: 'PUT',
        data:datosalumnojson,
        datatype: 'JSON',
        contentType: 'application/json',
        success: function(response){
            //console.log(response);
            alert('Estudiante Actualizado con exito');
            ///$('#Miformulario').submit();
        },
        error: function(textError, errorThrown){
            alert('Error al actualizar el Estudiante'+ textError + errorThrown);

        }
    });

}

function EliminarAlumno(p_numero_alumno){
    var datosalumno = {
        numero_alumno: p_numero_alumno
    };
    var datosalumnojson = JSON.stringify(datosalumno);
    //alert(JSON.stringify(datosalumnojson));

    $.ajax({
        url: UrlApiDelete,
        type: 'DELETE',
        data:datosalumnojson,
        datatype: 'JSON',
        contentType: 'application/json',
        success: function(response){
            //console.log(response);
            alert('Estudiante Eliminado con exito');
            $('#Miformulario').submit();
        },
        error: function(textStatus, errorThrown){
            alert('Error Al Eliminar el Estudiante'+ textStatus + errorThrown);
        }

    });  
}
