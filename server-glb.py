import http.server
import os
from urllib.parse import urlparse, parse_qs

os.makedirs("public/models", exist_ok=True)

class Handler(http.server.SimpleHTTPRequestHandler):
    def do_POST(self):
        parsed = urlparse(self.path)
        if parsed.path == "/save":
            name = parse_qs(parsed.query).get("name", ["unnamed"])[0]
            length = int(self.headers["Content-Length"])
            data = self.rfile.read(length)
            with open(f"public/models/{name}.glb", "wb") as f:
                f.write(data)
            print(f"  [OK] Saved public/models/{name}.glb ({len(data)} bytes)")
            self.send_response(200)
            self.end_headers()
            self.wfile.write(b"OK")

print("Meridian GLB Server running on http://localhost:8000")
http.server.HTTPServer(("", 8000), Handler).serve_forever()
