function closeUI() {
    fetch(`https://${GetParentResourceName()}/closeUI`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({})
    })
    .then(response => response.json())
    .then(data => {
        if (data === 'ok') {
            document.body.style.display = "none";
        }
    })
    .catch(error => {
        console.error('Error al cerrar el menú:', error);
    });
}

document.getElementById('close-btn').addEventListener('click', function() {
    closeUI();
});

document.addEventListener('keydown', function(event) {
    if (event.key === "Escape") {
        closeUI();
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
                fetch(`https://${GetParentResourceName()}/setWaypoint`, {
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
