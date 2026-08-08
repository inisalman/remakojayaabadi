#!/usr/bin/env python3
"""Strapi webhook listener for Remako frontend rebuild — internal only, no auth needed."""
import subprocess
from http.server import HTTPServer, BaseHTTPRequestHandler

PORT = 9002
SCRIPT = "/root/remakojayaabadi-gh/webhook-rebuild.sh"

class Handler(BaseHTTPRequestHandler):
    def do_POST(self):
        subprocess.Popen(["bash", SCRIPT], stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
        self.send_response(200); self.end_headers()

    def do_GET(self):
        self.send_response(200); self.end_headers(); self.wfile.write(b"remako-webhook ok\n")

    def log_message(self, format, *args):
        print(f"[webhook] {args[0]}", flush=True)

print(f"Listening on :{PORT}", flush=True)
HTTPServer(("0.0.0.0", PORT), Handler).serve_forever()
