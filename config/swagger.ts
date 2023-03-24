import { SwaggerConfig } from '@ioc:Adonis/Addons/Swagger'
import Env from '@ioc:Adonis/Core/Env'

export default {
	uiEnabled: true, //disable or enable swaggerUi route
	uiUrl: 'docs', // url path to swaggerUI
	specEnabled: true, //disable or enable swagger.json route
	specUrl: '/swagger.json',
	validatorUrl: null,

	middleware: [], // middlewares array, for protect your swagger docs and spec endpoints
	options: {
		swaggerDefinition: {
			// openapi: '3.0.0',
			info: {
				title: 'WOOKIE BOOKS API DOCS',
			},
			securitySchemes: {
				bearerAuth: {
				type: 'http',
				scheme: 'bearer',
				bearerFormat: 'JWT'
				}
			},

			securityDefinitions: {
				bearerAuth: {
					type: 'apiKey',
					in: 'header',
					name: 'Authorization'
				},
			},
		},

		apis: [
			'app/**/*.ts',
			'docs/swagger/**/*.yml',
			'start/routes.ts'
		],
		basePath: '/'
	},
	mode: process.env.NODE_ENV === 'production' ? 'PRODUCTION' : 'RUNTIME',
  	specFilePath: 'docs/swagger.json'
} as SwaggerConfig
