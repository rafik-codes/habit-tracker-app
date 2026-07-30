import http.server
import os

class Handler(http.server.SimpleHTTPRequestHandler):
    def do_POST(self):
        content_length = int(self.headers['Content-Length'])
        filename = self.headers.get('X-File-Name', 'uploaded.png')
        path = os.path.join('assets', filename)
        with open(path, 'wb') as f:
            f.write(self.rfile.read(content_length))
        self.send_response(200)
        self.end_headers()
        self.wfile.write(b'Uploaded successfully!')

http.server.HTTPServer(('0.0.0.0', 3000), Handler).serve_forever()
