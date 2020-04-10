
import { CustomAuthorizerEvent, CustomAuthorizerResult } from 'aws-lambda'
import 'source-map-support/register'
//import { createLogger } from '../../utils/logger'

import { verify } from 'jsonwebtoken'
import { JwtToken } from '../../auth/JwtToken'

//const auth0Secret= process.env.AUTH_0_SECRET

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

export const handler = async (event: CustomAuthorizerEvent): Promise<CustomAuthorizerResult> => {
  try {
    const jwtToken = verifyToken(event.authorizationToken)
    console.log('User was authorized', jwtToken)

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
    console.log('User authorized', e.message)

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

function verifyToken(authHeader: string): JwtToken {
  if (!authHeader)
    throw new Error('No authentication header')

  if (!authHeader.toLowerCase().startsWith('bearer '))
    throw new Error('Invalid authentication header')

  const split = authHeader.split(' ')
  const token = split[1]

  return verify(token, cert, { algorithms: ['RS256'] }) as JwtToken
}
