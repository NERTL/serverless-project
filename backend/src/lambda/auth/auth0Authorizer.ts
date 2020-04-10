import { CustomAuthorizerEvent, CustomAuthorizerResult } from 'aws-lambda'
import 'source-map-support/register'

//import { verify, decode } from 'jsonwebtoken'
import { createLogger } from '../../utils/logger'
//import Axios from 'axios'
//import { Jwt } from '../../auth/Jwt'
import { JwtPayload } from '../../auth/JwtPayload'

const logger = createLogger('auth')

// TODO: Provide a URL that can be used to download a certificate that can be used
// to verify JWT token signature.
// To get this URL you need to go to an Auth0 page -> Show Advanced Settings -> Endpoints -> JSON Web Key Set
//const jwksUrl = 'https://dev-rmc39y7s.auth0.com/.well-known/jwks.json'

const cert = `-----BEGIN CERTIFICATE-----
MIIDBzCCAe+gAwIBAgIJOKZ4E16oTpeBMA0GCSqGSIb3DQEBCwUAMCExHzAdBgNV
BAMTFmRldi1ybWMzOXk3cy5hdXRoMC5jb20wHhcNMjAwNDA3MTM0OTE3WhcNMzMx
MjE1MTM0OTE3WjAhMR8wHQYDVQQDExZkZXYtcm1jMzl5N3MuYXV0aDAuY29tMIIB
IjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAxWjBoi0ApmILmaIF6Pyg3H+J
WTclG9zIJk5tfBvUAqClTDu9b6+F94k7x02cYaSc4KOGWP3tFsaMqvqv4UL9dGnw
aUX/yO78/oAPNqIsM3LjybpQvTPffeVton08ntoN9FLSPNOtGVzSX4sk1xhz3xc8
i/ViccH9WQqXuoeBHZCtOqL4tIXfWgHFBX5v3avkCAXhGDy9MSt8hQt+RlkQ8S5j
5pc1pK4f5qIQdXjCkIr1d7caBag6NiZJUycOjvcIeM1ceHV169rAWEFGfmfIiO/2
Eu621H7UIhAq2ZSQWdBGKUh2LuU/JJe827DlA+pbi8gmrMnskISBz/AeluxvnQID
AQABo0IwQDAPBgNVHRMBAf8EBTADAQH/MB0GA1UdDgQWBBRWpjKoDkDAlEEm4jQa
S3O5JW8ryzAOBgNVHQ8BAf8EBAMCAoQwDQYJKoZIhvcNAQELBQADggEBADsC63Xd
9P0PiCfleM8TXeBKR0WSnwLfrBwStMHCZ0s9PjM5746vq0UG8cNoQEyjdhKX9igq
Bt+dr27bV3t19eWCr65gDnHfN+MaxqEkl0W9gd8MTtHeyn3fHf0kZPolDglfVVlX
kM2MdI3YxiX4VMayBWPBu0Vz5oMGnhwT5j/fR9MH9YLvcZu4wODjHF/zkWBgWeCb
bY0I20CeP4LjZuAgUFDTVIIZFMRKX2/TKGtOhTNhoR0F+0hSO2woPbhpjAsrPM8V
sfJ0gjQr1Ky2Ij6H+BimsNL3ljPZW93i5hRTY24Vk2vERtf8hlk3bCxCmIOfpLoZ
B74gkMqvR16t3Ys=
-----END CERTIFICATE-----`

export const handler = async (
  event: CustomAuthorizerEvent
): Promise<CustomAuthorizerResult> => {
  logger.info('Authorizing a user', event.authorizationToken)
  try {
    const jwtToken = await verifyToken(event.authorizationToken)
    logger.info('User was authorized', jwtToken)
    logger.info(cert)

    return {
      principalId: jwtToken.sub,
      policyDocument: {
        Version: '2012-10-17',
        Statement: [
          {
            Action: 'execute-api:Invoke',
            Effect: 'Allow',
            Resource: '*'
          }
        ]
      }
    }
  } catch (e) {
    logger.error('User not authorized', { error: e.message })

    return {
      principalId: 'user',
      policyDocument: {
        Version: '2012-10-17',
        Statement: [
          {
            Action: 'execute-api:Invoke',
            Effect: 'Deny',
            Resource: '*'
          }
        ]
      }
    }
  }
}

async function verifyToken(authHeader: string): Promise<JwtPayload> {
  const token = getToken(authHeader)
  if (token)
  //const jwt: Jwt = decode(token, { complete: true }) as Jwt

  // TODO: Implement token verification
  // You should implement it similarly to how it was implemented for the exercise for the lesson 5
  // You can read more about how to do this here: https://auth0.com/blog/navigating-rs256-and-jwks/
  return undefined
}

function getToken(authHeader: string): string {
  if (!authHeader) throw new Error('No authentication header')

  if (!authHeader.toLowerCase().startsWith('bearer '))
    throw new Error('Invalid authentication header')

  const split = authHeader.split(' ')
  const token = split[1]

  return token
}
