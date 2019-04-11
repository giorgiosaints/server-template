// const logger = require("../config/winston.config")
const config = require("config")
// const ora = require('ora')
const spinner = require('ora')('Startup swagger...')
const swaggerJSDoc = require("swagger-jsdoc")
const swaggerUi = require("swagger-ui-express")
const swStats = require("swagger-stats")

/**
 * Inicializa as rotas das documentações geradas para o sistema
 * @param {Object} swaggerSpec Objeto gerado para criar a documentação do swagger
 * @param {Application} app aplicação do sistema
 */
const initRoutesOfDocumentation = (swaggerSpec, app) => {
    app.use(
        `${config.get("swagger.route")}`,
        swaggerUi.serve,
        swaggerUi.setup(swaggerSpec)
    )
    app.use(swStats.getMiddleware({ swaggerSpec }))
    spinner.succeed("API SWAGGER Documentation")
}

/**
 * Configura o swagger para gerar a documentação
 * da API
 * @param {Application} app express app
 */
module.exports = app => {
    // logger.info("Inicializando a documentação da API SWAGGER")
    spinner.color = 'blue'
    spinner.start("Inicializando a documentação da API SWAGGER")

    const swaggerDefinition = {
        info: {
            title: "Template Documentation API",
            version: "1.0.0",
            description: `Template documentation.\n API ${config.get("server.url")}${config.get("server.port")}/swagger-stats/ui`
        },
        host: `${config.get("server.url")}`,
        basePath: "/api",
        securityDefinitions: {
            Bearer: {
                type: "apiKey",
                description: "Bearer authorization of an API",
                name: "Authorization",
                in: "header"
            }
        }
    }

    // options for the swagger docs
    const options = {
        // import swaggerDefinitions
        swaggerDefinition,
        // path to the API docs
        apis: ["./**/*.routing.js"]
    }

    // initialize swagger-jsdoc
    const swaggerSpec = swaggerJSDoc(options)
    initRoutesOfDocumentation(swaggerSpec, app)
}
