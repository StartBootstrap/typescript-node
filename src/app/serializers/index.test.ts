import { FastifyReply, FastifyRequest } from 'fastify';

import { requestSerializer, responseSerializer } from './index';

describe('Serializers', () => {
    it('should serialize the response', () => {
        const serialized = responseSerializer(<FastifyReply>(<unknown>{
            statusCode: 200,
            a: 1,
            b: 2,
            request: {
                url: 'URL',
            },
        }));

        expect(serialized).toEqual({
            statusCode: 200,
            url: 'URL',
        });
    });
    it('should serialize the request', () => {
        const serialized = requestSerializer(<FastifyRequest>(<unknown>{
            method: 'GET',
            url: 'URL',
            headers: {
                'accept-version': '0.0.0',
            },
            socket: {
                remotePort: '1234',
            },
            hostname: 'HOSTNAME',
            ip: 'REMOTE_ADDRESS',
            a: 1,
            b: 2,
        }));

        expect(serialized).toEqual({
            method: 'GET',
            url: 'URL',
            headers: {
                'accept-version': '0.0.0',
            },
            remotePort: '1234',
            version: '0.0.0',
            hostname: 'HOSTNAME',
            remoteAddress: 'REMOTE_ADDRESS',
        });
    });
});
