ESX = exports["es_extended"]:getSharedObject()

local display = false  

RegisterCommand('negocios', function()
    if not display then
        local sortedJobs = {}

        ESX.TriggerServerCallback('trabajos:DB', function(JOBDB)
            for _, info in pairs(JOBDB) do
                table.insert(sortedJobs, {
                    label = info.label,
                    coords = info.coords,
                    open = info.open
                })
            end

            Wait(200)
            table.sort(sortedJobs, function(a, b) return a.label < b.label end)

            SetNuiFocus(true, true)
            SendNUIMessage({
                type = "showUI",
                negocios = sortedJobs
            })
            display = true 
        end)
    end
end)

RegisterNUICallback('closeUI', function(data, cb)
    SetNuiFocus(false, false) 
    SendNUIMessage({
        type = "hideUI"
    })
    display = false 
    cb('ok')
end)

RegisterNUICallback('setWaypoint', function(data, cb)
    SetNewWaypoint(data.x, data.y)
    ESX.ShowNotification('El negocio ha sido marcado en el mapa.')
    cb('ok')
end)