
document.getElementById('close-btn').addEventListener('click', function() {
  fetch('https://pm-negocios/closeUI', { method: 'POST' })
      .then(response => {
          if (!response.ok) {
              throw new Error('Network response was not ok');
          }
          return response.json();
      })
      .catch(error => {
          console.error('Error al cerrar el menú:', error);
      });
});

document.addEventListener('keydown', function(event) {
  if (event.key === "Escape") { 
      fetch('https://pm-negocios/closeUI', { method: 'POST' })
          .then(response => {
              if (!response.ok) {
                  throw new Error('Network response was not ok');
              }
              return response.json();
          })
          .catch(error => {
              console.error('Error al cerrar el menú:', error);
          });
  }
});

window.addEventListener('message', function(event) {
  if (event.data.type === "showUI") {
      document.body.style.display = "flex";  
      const businessList = document.getElementById('business-list');
      businessList.innerHTML = '';  

      event.data.negocios.forEach(function(negocio) {
          const li = document.createElement('li');

          const statusIndicator = document.createElement('div');
          statusIndicator.classList.add('status-indicator');

          if (negocio.open === true || negocio.open === 'true') {
              statusIndicator.classList.add('open'); 
          } else {
              statusIndicator.classList.add('closed'); 
          }

          li.appendChild(document.createTextNode(negocio.label + " "));
          li.appendChild(statusIndicator); 

          li.style.color = "#ecf0f1"; 

          li.addEventListener('click', function() {
              fetch('https://pm-negocios/setWaypoint', {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify({ x: negocio.coords.x, y: negocio.coords.y })
              });
          });

          businessList.appendChild(li); 
      });
  } else if (event.data.type === "hideUI") {
      document.body.style.display = "none"; 
  }
});