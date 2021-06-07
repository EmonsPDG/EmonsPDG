const studentsTotal = document.querySelector('.followIndividual__studentsTotal');


db.collection("students").onSnapshot((querySnapshot) => {
    var tabledata = [];
    let students = [];

    querySnapshot.forEach((doc) => {
        students.push(doc.data());
        
        db.collection("answers").where("idStudent", "==", doc.data().id).get().then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
            });
        });
        tabledata.push(
            {
                id: "",
                state: doc.data().state,
                major: doc.data().major,
                idc: doc.data().id,
                sat: doc.data().result,
                surveys: doc.data().surveys,
                lastUpdate: doc.data().lastUpdate,
                requestName: "Click para solicitar nombre"
            }
        )
    });

    studentsTotal.innerHTML = students.length;

    var table = new Tabulator("#example-table", {
        height:false,
        maxHeight:550, // set height of table (in CSS or here), this enables the Virtual DOM and improves render speed dramatically (can be any valid css height value)
        data:tabledata, //assign data to table
        pagination: 'local',
        paginationSize: 15,
        layout:"fitColumns", //fit columns to width of table (optional)
        columns:[ //Define Table Columns
            {title:"Estado", field:"state"},
            {title:"Carrera", field:"major"},
            {title:"ID", field:"idc", hozAlign:"center",},
            {title:"Satisfacción", field:"sat",hozAlign:"center"},
            {title:"Encuestas realizadas", field:"surveys", hozAlign:"center"},
            {title:"Última actualización", field:"lastUpdate", hozAlign:"center"},
            {title:"Acción",field:"requestName",hozAlign:"center", width: 200, cellClick:function(e, cell){
                //e - the click event object
                //cell - cell component
                alert("Se solicitó al estudiante permiso para conocer su nombre exitosamente");
                },
            }
        ],
        // rowClick:function(e, row){ //trigger an alert message when the row is clicked
        //     alert("Row " + row.getData().id + " Clicked!!!!");
        // },
    });

});



