import { HttpResponse, http } from 'msw'
export const handlers = [
    // By calling “http.get()” we’re instructing MSW
    // to capture all outgoing “GET /posts” requests
    // and execute the given response resolver when they
    // happen.
    http.get('/users', () => {
        // Response resolver allows you to react to captured requests,
        // respond with mock responses or passthrough requests entirely.
        // For now, let’s just print a message to the console.
        return HttpResponse.json({})
    }),
]
