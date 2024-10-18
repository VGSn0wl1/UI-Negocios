fx_version 'cerulean'
game 'gta5'

author 'Pvpmalaga y Snowl1._'
description 'UI personalizada para ver negocios'
version '1.0'

client_scripts {
    'client/cl_main.lua'
}

server_scripts {
    '@oxmysql/lib/MySQL.lua',
    'server/sv_main.lua'
}

files {
    'html/negocios_menu.html',
    'html/style.css',
    'html/app.js'
}

ui_page 'html/negocios_menu.html'
