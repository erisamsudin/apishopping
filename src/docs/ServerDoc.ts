import { any } from "joiful";

class ServerDoc {
  getInfo () {
    return {
      openapi: '3.0.1',
      info: {
        version: '1.0.0',
        title: 'Ayu Grosir Api',
        description: 'Rest api for ayu grosir',
        termsOfService: 'http://api_url/terms/',
        contact: {
          name: 'Eri Samsudin',
          email: 'erisamsudin@gmail.com',
          url: '-'
        },
        license: {
          name: 'MIT',
          url: 'https://opensource.org/licenses/MIT'
        }
      },
      servers: [
        {
          url: 'http://localhost:7001/api/v1',
          description: 'Local server'
        },
        {
          url: 'http://192.168.1.16:7001/api/v1',
          description: 'Network server'
        }
      ],
      security: [
        {
          ApiKeyAuth: any
        }
      ],
      tags: [
        {
          name: "Users",
          description: "End point users."
        }
      ]
    };
  }
}

export default ServerDoc;