
const TASKS_DATA_HOST = 'localhost:9200'
const DEFAULT_PORT = '8080'

const path = require('path')
const express = require('express')
const app = express()

const tasksData = require('./borga-db_mem')
const tasksServices = require('./borga-services.js')(tasksData)
const tasksApiRouter = require('./borga-web-api.js')(express.Router(),tasksServices)
const tasksUiRouter = require('./borga-web-site.js')(express.Router(), tasksServices)
const authUiRouter = require('./auth-web-ui.js')(app ,express.Router(), tasksServices)

app.use(express.static(path.join(__dirname, 'public')))
app.use(express.json())
app.use(express.urlencoded({extended : false}))

//  Definir o diretório para conter os modelos ('views')
app.set('views', path.join(__dirname, 'views'));

// Definir o motor de visualização para usar, neste caso 'hbs'
app.set('view engine', 'hbs');

app.use('/api',tasksApiRouter)
app.use('/',tasksUiRouter)
app.use('/',authUiRouter)

app.listen(process.argv[2] || DEFAULT_PORT , () => console.log("Listening"))





