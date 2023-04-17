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
            console.log(response);

       
    alert("Docente Ingresado de Forma Correcta");
    $('#Miformulario').submit();
 },
 error : function(textError, errorThrown){
    alert('Error: ' + textError + errorThrown);
 }

    });
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
            $('#numerodocente').val(MisItems[i].numero_docente);
            $('#nombre').val(MisItems[i].nombre);
            $('#apellidos').val(MisItems[i].apellidos);
            $('#contratacion').val(MisItems[i].fecha_contratacion);
            $('#direccion').val(MisItems[i].direccion);
            $('#salario').val(MisItems[i].salario);
            $('#profesion').val(MisItems[i].profesion);

        var btnactualizar = '<input type="submit" class="btn btn-primary" '+
             'id="btn_agregar" onclick="AgregarDocente('+MisItems[i].numero_docente+')"  value="Actualizar" >';        
            $('#btnagregar').html(btnactualizar) ;


            
        }
        }
    });
}


function ActualizarDocente(p_numero_docente){
}

function EliminararDocente(p_numero_docente){
}