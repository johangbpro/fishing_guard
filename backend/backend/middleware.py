class MimeTypeMiddleware:
    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        response = self.get_response(request)
        path = request.path.lower()
        
        if path.endswith('.css'):
            response['Content-Type'] = 'text/css'
        elif path.endswith('.js'):
            response['Content-Type'] = 'application/javascript'
        elif path.endswith('.mjs'):
            response['Content-Type'] = 'application/javascript'
        elif path.endswith('.html'):
            response['Content-Type'] = 'text/html'
            
        return response