// https://www.fastify.io/docs/latest/Validation-and-Serialization/

import { FastifyReply, FastifyRequest } from 'fastify';

export function responseSerializer(res: FastifyReply) {
    return {
        statusCode: res.statusCode,
        url: res.request.url,
    };
}

export function requestSerializer(req: FastifyRequest) {
    return {
        method: req.method,
        url: req.url,
        version: req.headers['accept-version'],
        hostname: ((req as unknown) as { hostname: string }).hostname,
        remoteAddress: ((req as unknown) as { ip: string }).ip,
        remotePort: req.socket.remotePort,
        // Including the headers in the log could be in violation
        // of privacy laws, e.g. GDPR. You should use the "redact" option to
        // remove sensitive fields. It could also leak authentication data in
        // the logs.
        headers: req.headers,
    };
}
