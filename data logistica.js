const filtros={
  principiante_hombre:{categoria:"Principiante",rama:"Hombre"},
  principiante_mujer:{categoria:"Principiante",rama:"Mujer"},
  intermedio_hombre:{categoria:"Intermedio",rama:"Hombre"},
  intermedio_mujer:{categoria:"Intermedio",rama:"Mujer"},
  avanzado_hombre:{categoria:"Avanzado",rama:"Hombre"},
  avanzado_mujer:{categoria:"Avanzado",rama:"Mujer"}
};

function mostrarCompetencia(){

  const seleccion=competenciaSelect.value;
  const filtro=filtros[seleccion];
  if(!filtro)return;

  const atletas=datos.pruebaIndividual.ATLETAS
  .filter(a=>a.categoria===filtro.categoria && a.rama===filtro.rama)
  .map(a=>({...a,total:a.resultados.reduce((s,x)=>s+x.puntos,0)}))
  .sort((a,b)=>b.total-a.total);

  let html=`<table>
  <tr><th>#</th><th>Atleta</th><th>Total</th></tr>`;

  atletas.forEach((a,i)=>{
    let lugar=i===0?"🥇":i===1?"🥈":i===2?"🥉":i+1;

    html+=`<tr onclick='verAtleta(${JSON.stringify(a)},${i})'>
    <td>${lugar}</td><td>${a.nombre}</td><td>${a.total}</td></tr>`;
  });

  html+="</table>";
  tablas.innerHTML=html;
}

function verAtleta(a,lugar){

  if(lugar<3){
    confetti({particleCount:150,spread:90});
  }

  let html=`<div class="modal-bg" onclick="cerrarModal()">
  <div class="modal" onclick="event.stopPropagation()">
  <button onclick="cerrarModal()">×</button>

  <h2>${a.nombre}</h2>
  <p>Heat: ${a.heat}</p>
  <p>Carril: ${a.carril}</p>`;

  a.resultados.forEach(r=>{
    html+=`<p>${r.wod}: ${r.puntos} pts</p>`;
  });

  html+=`</div></div>`;

  modalContainer.innerHTML=html;
}

function cerrarModal(){
  modalContainer.innerHTML="";
}