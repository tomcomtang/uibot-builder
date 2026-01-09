self.__BUILD_MANIFEST = {
  "/": [
    "static/chunks/3f6fe473703d0ff1.js"
  ],
  "/404": [
    "static/chunks/c08c512608f14cff.js"
  ],
  "/_error": [
    "static/chunks/d644c8e163d67b5e.js"
  ],
  "/add": [
    "static/chunks/f4c026cba0942705.js"
  ],
  "/contact": [
    "static/chunks/0875324fc159cf0a.js"
  ],
  "/contact/demo-booked": [
    "static/chunks/3fd5ca34148f2a00.js"
  ],
  "/contact/thank-you": [
    "static/chunks/b383ce2cb84397d8.js"
  ],
  "/industries/travel": [
    "static/chunks/0c9f3a360ca37e3a.js"
  ],
  "/papers/[[...paper]]": [
    "static/chunks/b9f76ddc7a466151.js"
  ],
  "/press": [
    "static/chunks/7bc13e5aa6a4ba89.js"
  ],
  "/products/3ds": [
    "static/chunks/e7173f862b8e4ecd.js"
  ],
  "/products/bin-lookup": [
    "static/chunks/3d3dafbc0d1d0b69.js"
  ],
  "/products/card-collection": [
    "static/chunks/ea434736289d1692.js"
  ],
  "/products/enclaves": [
    "static/chunks/1d21fe312868990c.js"
  ],
  "/products/functions": [
    "static/chunks/774ab5fa3d022442.js"
  ],
  "/products/network-tokens": [
    "static/chunks/11286b90e3a8ae7d.js"
  ],
  "/products/pci": [
    "static/chunks/cc5185aa8be5ce8a.js"
  ],
  "/products/relay": [
    "static/chunks/9c4ce64a028162f8.js"
  ],
  "/solutions/banking": [
    "static/chunks/d2ff31acaafe6281.js"
  ],
  "/solutions/card-issuing": [
    "static/chunks/a71e05186ce5733b.js"
  ],
  "/solutions/cards": [
    "static/chunks/7a25b4c7e86c26f4.js"
  ],
  "/solutions/confidential-computing": [
    "static/chunks/bb54c75913e13542.js"
  ],
  "/solutions/credentials": [
    "static/chunks/89d38b76c7cdbc94.js"
  ],
  "/solutions/evervault-encryption": [
    "static/chunks/31ca7eb7d293e65c.js"
  ],
  "/solutions/file-encryption": [
    "static/chunks/af6fb993fee99ad1.js"
  ],
  "/solutions/hipaa": [
    "static/chunks/4068acbf9ec7b26b.js"
  ],
  "/solutions/multi-psp": [
    "static/chunks/c96b3b309430da62.js"
  ],
  "/solutions/pii": [
    "static/chunks/55e63a92e50253d5.js"
  ],
  "/solutions/wallet-management": [
    "static/chunks/b308b4c986f3be9a.js"
  ],
  "__rewrites": {
    "afterFiles": [
      {
        "has": [
          {
            "type": "query",
            "key": "o",
            "value": "(?<orgid>\\d*)"
          },
          {
            "type": "query",
            "key": "p",
            "value": "(?<projectid>\\d*)"
          },
          {
            "type": "query",
            "key": "r",
            "value": "(?<region>[a-z]{2})"
          }
        ],
        "source": "/monitoring(/?)"
      },
      {
        "has": [
          {
            "type": "query",
            "key": "o",
            "value": "(?<orgid>\\d*)"
          },
          {
            "type": "query",
            "key": "p",
            "value": "(?<projectid>\\d*)"
          }
        ],
        "source": "/monitoring(/?)"
      },
      {
        "source": "/_tunnel/cio/:path*"
      }
    ],
    "beforeFiles": [],
    "fallback": []
  },
  "sortedPages": [
    "/",
    "/404",
    "/_app",
    "/_error",
    "/add",
    "/api/beta-signup",
    "/api/demo",
    "/api/getJobCount",
    "/api/og",
    "/api/reveal",
    "/api/rss/[[...rss]]",
    "/api/salesForm",
    "/api/subscribe",
    "/api/validate-email",
    "/api/webinar",
    "/contact",
    "/contact/demo-booked",
    "/contact/thank-you",
    "/industries/travel",
    "/papers/[[...paper]]",
    "/press",
    "/products/3ds",
    "/products/bin-lookup",
    "/products/card-collection",
    "/products/enclaves",
    "/products/functions",
    "/products/network-tokens",
    "/products/pci",
    "/products/relay",
    "/solutions/banking",
    "/solutions/card-issuing",
    "/solutions/cards",
    "/solutions/confidential-computing",
    "/solutions/credentials",
    "/solutions/evervault-encryption",
    "/solutions/file-encryption",
    "/solutions/hipaa",
    "/solutions/multi-psp",
    "/solutions/pii",
    "/solutions/wallet-management"
  ]
};self.__BUILD_MANIFEST_CB && self.__BUILD_MANIFEST_CB()