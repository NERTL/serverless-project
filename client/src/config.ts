// TODO: Once your application is deployed, copy an API id here so that the frontend could interact with it
const apiId = 'sbc80u8pcc'
export const apiEndpoint = `https://${apiId}.execute-api.us-east-2.amazonaws.com/dev`

export const authConfig = {
  // TODO: Create an Auth0 application and copy values from it into this map
  domain: 'dev-rmc39y7s.auth0.com',            // Auth0 domain
  clientId: 'eTQiIhm7zScjdOAJoCErBfTE1fqjh9uX',          // Auth0 client id
  callbackUrl: 'http://localhost:3000/callback'
}
