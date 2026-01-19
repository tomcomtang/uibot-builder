import 'piccolore';
import { o as decodeKey } from './chunks/astro/server_LHX_jZwX.mjs';
import 'clsx';
import { N as NOOP_MIDDLEWARE_FN } from './chunks/astro-designed-error-pages_sWOcR9oS.mjs';
import 'es-module-lexer';

function sanitizeParams(params) {
  return Object.fromEntries(
    Object.entries(params).map(([key, value]) => {
      if (typeof value === "string") {
        return [key, value.normalize().replace(/#/g, "%23").replace(/\?/g, "%3F")];
      }
      return [key, value];
    })
  );
}
function getParameter(part, params) {
  if (part.spread) {
    return params[part.content.slice(3)] || "";
  }
  if (part.dynamic) {
    if (!params[part.content]) {
      throw new TypeError(`Missing parameter: ${part.content}`);
    }
    return params[part.content];
  }
  return part.content.normalize().replace(/\?/g, "%3F").replace(/#/g, "%23").replace(/%5B/g, "[").replace(/%5D/g, "]");
}
function getSegment(segment, params) {
  const segmentPath = segment.map((part) => getParameter(part, params)).join("");
  return segmentPath ? "/" + segmentPath : "";
}
function getRouteGenerator(segments, addTrailingSlash) {
  return (params) => {
    const sanitizedParams = sanitizeParams(params);
    let trailing = "";
    if (addTrailingSlash === "always" && segments.length) {
      trailing = "/";
    }
    const path = segments.map((segment) => getSegment(segment, sanitizedParams)).join("") + trailing;
    return path || "/";
  };
}

function deserializeRouteData(rawRouteData) {
  return {
    route: rawRouteData.route,
    type: rawRouteData.type,
    pattern: new RegExp(rawRouteData.pattern),
    params: rawRouteData.params,
    component: rawRouteData.component,
    generate: getRouteGenerator(rawRouteData.segments, rawRouteData._meta.trailingSlash),
    pathname: rawRouteData.pathname || void 0,
    segments: rawRouteData.segments,
    prerender: rawRouteData.prerender,
    redirect: rawRouteData.redirect,
    redirectRoute: rawRouteData.redirectRoute ? deserializeRouteData(rawRouteData.redirectRoute) : void 0,
    fallbackRoutes: rawRouteData.fallbackRoutes.map((fallback) => {
      return deserializeRouteData(fallback);
    }),
    isIndex: rawRouteData.isIndex,
    origin: rawRouteData.origin
  };
}

function deserializeManifest(serializedManifest) {
  const routes = [];
  for (const serializedRoute of serializedManifest.routes) {
    routes.push({
      ...serializedRoute,
      routeData: deserializeRouteData(serializedRoute.routeData)
    });
    const route = serializedRoute;
    route.routeData = deserializeRouteData(serializedRoute.routeData);
  }
  const assets = new Set(serializedManifest.assets);
  const componentMetadata = new Map(serializedManifest.componentMetadata);
  const inlinedScripts = new Map(serializedManifest.inlinedScripts);
  const clientDirectives = new Map(serializedManifest.clientDirectives);
  const serverIslandNameMap = new Map(serializedManifest.serverIslandNameMap);
  const key = decodeKey(serializedManifest.key);
  return {
    // in case user middleware exists, this no-op middleware will be reassigned (see plugin-ssr.ts)
    middleware() {
      return { onRequest: NOOP_MIDDLEWARE_FN };
    },
    ...serializedManifest,
    assets,
    componentMetadata,
    inlinedScripts,
    clientDirectives,
    routes,
    serverIslandNameMap,
    key
  };
}

const manifest = deserializeManifest({"hrefRoot":"file:///Users/tomcomtang/VscodeProjects/video_fe/edgeone-pages-templates/a2ui-template/","cacheDir":"file:///Users/tomcomtang/VscodeProjects/video_fe/edgeone-pages-templates/a2ui-template/node_modules/.astro/","outDir":"file:///Users/tomcomtang/VscodeProjects/video_fe/edgeone-pages-templates/a2ui-template/dist/","srcDir":"file:///Users/tomcomtang/VscodeProjects/video_fe/edgeone-pages-templates/a2ui-template/src/","publicDir":"file:///Users/tomcomtang/VscodeProjects/video_fe/edgeone-pages-templates/a2ui-template/public/","buildClientDir":"file:///Users/tomcomtang/VscodeProjects/video_fe/edgeone-pages-templates/a2ui-template/dist/client/","buildServerDir":"file:///Users/tomcomtang/VscodeProjects/video_fe/edgeone-pages-templates/a2ui-template/dist/server/","adapterName":"@edgeone/astro","routes":[{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"page","component":"_server-islands.astro","params":["name"],"segments":[[{"content":"_server-islands","dynamic":false,"spread":false}],[{"content":"name","dynamic":true,"spread":false}]],"pattern":"^\\/_server-islands\\/([^/]+?)\\/?$","prerender":false,"isIndex":false,"fallbackRoutes":[],"route":"/_server-islands/[name]","origin":"internal","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_image","pattern":"^\\/_image\\/?$","segments":[[{"content":"_image","dynamic":false,"spread":false}]],"params":[],"component":"node_modules/astro/dist/assets/endpoint/generic.js","pathname":"/_image","prerender":false,"fallbackRoutes":[],"origin":"internal","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"route":"/api/chat","isIndex":false,"type":"endpoint","pattern":"^\\/api\\/chat\\/?$","segments":[[{"content":"api","dynamic":false,"spread":false}],[{"content":"chat","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/api/chat.ts","pathname":"/api/chat","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"inline","content":".original-header[data-astro-cid-o3afvtwd]{position:fixed;top:0;left:0;right:0;z-index:1000;background:transparent;border-bottom:none}.header-wrapper[data-astro-cid-o3afvtwd]{width:100%;max-width:1440px;margin:0 auto;padding:0 2rem}.header-content[data-astro-cid-o3afvtwd]{display:flex;align-items:center;justify-content:space-between;height:80px;gap:2rem}.logo-container[data-astro-cid-o3afvtwd]{flex-shrink:0}.logo-link[data-astro-cid-o3afvtwd]{display:flex;align-items:center;text-decoration:none}.logo-link[data-astro-cid-o3afvtwd] svg[data-astro-cid-o3afvtwd]{height:24px;width:auto}.header-actions[data-astro-cid-o3afvtwd]{display:flex;align-items:center;gap:1.5rem;flex-shrink:0}.github-button[data-astro-cid-o3afvtwd]{display:inline-flex;align-items:center;gap:.5rem;padding:.5rem 1rem;background:#ffffff0d;color:#ffffffe6;font-size:.875rem;font-weight:500;text-decoration:none;border-radius:20px;border:1px solid rgba(255,255,255,.1);transition:all .3s ease;backdrop-filter:blur(10px);-webkit-backdrop-filter:blur(10px)}.github-button[data-astro-cid-o3afvtwd]:hover{background:#ffffff1a;border-color:#fff3;transform:translateY(-1px);box-shadow:0 4px 12px #0000004d}.github-icon[data-astro-cid-o3afvtwd]{width:18px;height:18px;flex-shrink:0}.github-button[data-astro-cid-o3afvtwd] span[data-astro-cid-o3afvtwd]{font-weight:500}.mobile-menu-button[data-astro-cid-o3afvtwd]{display:none;flex-direction:column;gap:5px;background:none;border:none;padding:.5rem;cursor:pointer}.mobile-menu-button[data-astro-cid-o3afvtwd] span[data-astro-cid-o3afvtwd]{width:24px;height:2px;background:#ffffffd9;border-radius:2px;transition:all .3s ease}.mobile-menu-button[data-astro-cid-o3afvtwd]:hover span[data-astro-cid-o3afvtwd]{background:#fff}@media(max-width:768px){.header-wrapper[data-astro-cid-o3afvtwd]{padding:0 1.5rem}.header-content[data-astro-cid-o3afvtwd]{height:70px}.mobile-menu-button[data-astro-cid-o3afvtwd]{display:flex}.github-button[data-astro-cid-o3afvtwd] span[data-astro-cid-o3afvtwd]{display:none}.github-button[data-astro-cid-o3afvtwd]{padding:.5rem}}@media(max-width:480px){.header-wrapper[data-astro-cid-o3afvtwd]{padding:0 1rem}.logo-link[data-astro-cid-o3afvtwd] svg[data-astro-cid-o3afvtwd]{height:20px}.github-icon[data-astro-cid-o3afvtwd]{width:18px;height:18px}}\n"},{"type":"external","src":"/_astro/chat.BrJoJ-JA.css"}],"routeData":{"route":"/chat","isIndex":false,"type":"page","pattern":"^\\/chat\\/?$","segments":[[{"content":"chat","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/chat.astro","pathname":"/chat","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"inline","content":".original-header[data-astro-cid-o3afvtwd]{position:fixed;top:0;left:0;right:0;z-index:1000;background:transparent;border-bottom:none}.header-wrapper[data-astro-cid-o3afvtwd]{width:100%;max-width:1440px;margin:0 auto;padding:0 2rem}.header-content[data-astro-cid-o3afvtwd]{display:flex;align-items:center;justify-content:space-between;height:80px;gap:2rem}.logo-container[data-astro-cid-o3afvtwd]{flex-shrink:0}.logo-link[data-astro-cid-o3afvtwd]{display:flex;align-items:center;text-decoration:none}.logo-link[data-astro-cid-o3afvtwd] svg[data-astro-cid-o3afvtwd]{height:24px;width:auto}.header-actions[data-astro-cid-o3afvtwd]{display:flex;align-items:center;gap:1.5rem;flex-shrink:0}.github-button[data-astro-cid-o3afvtwd]{display:inline-flex;align-items:center;gap:.5rem;padding:.5rem 1rem;background:#ffffff0d;color:#ffffffe6;font-size:.875rem;font-weight:500;text-decoration:none;border-radius:20px;border:1px solid rgba(255,255,255,.1);transition:all .3s ease;backdrop-filter:blur(10px);-webkit-backdrop-filter:blur(10px)}.github-button[data-astro-cid-o3afvtwd]:hover{background:#ffffff1a;border-color:#fff3;transform:translateY(-1px);box-shadow:0 4px 12px #0000004d}.github-icon[data-astro-cid-o3afvtwd]{width:18px;height:18px;flex-shrink:0}.github-button[data-astro-cid-o3afvtwd] span[data-astro-cid-o3afvtwd]{font-weight:500}.mobile-menu-button[data-astro-cid-o3afvtwd]{display:none;flex-direction:column;gap:5px;background:none;border:none;padding:.5rem;cursor:pointer}.mobile-menu-button[data-astro-cid-o3afvtwd] span[data-astro-cid-o3afvtwd]{width:24px;height:2px;background:#ffffffd9;border-radius:2px;transition:all .3s ease}.mobile-menu-button[data-astro-cid-o3afvtwd]:hover span[data-astro-cid-o3afvtwd]{background:#fff}@media(max-width:768px){.header-wrapper[data-astro-cid-o3afvtwd]{padding:0 1.5rem}.header-content[data-astro-cid-o3afvtwd]{height:70px}.mobile-menu-button[data-astro-cid-o3afvtwd]{display:flex}.github-button[data-astro-cid-o3afvtwd] span[data-astro-cid-o3afvtwd]{display:none}.github-button[data-astro-cid-o3afvtwd]{padding:.5rem}}@media(max-width:480px){.header-wrapper[data-astro-cid-o3afvtwd]{padding:0 1rem}.logo-link[data-astro-cid-o3afvtwd] svg[data-astro-cid-o3afvtwd]{height:20px}.github-icon[data-astro-cid-o3afvtwd]{width:18px;height:18px}}\n"},{"type":"external","src":"/_astro/index.B_6SJmXL.css"}],"routeData":{"route":"/","isIndex":true,"type":"page","pattern":"^\\/$","segments":[],"params":[],"component":"src/pages/index.astro","pathname":"/","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}}],"base":"/","trailingSlash":"ignore","compressHTML":true,"componentMetadata":[["/Users/tomcomtang/VscodeProjects/video_fe/edgeone-pages-templates/a2ui-template/src/pages/chat.astro",{"propagation":"none","containsHead":true}],["/Users/tomcomtang/VscodeProjects/video_fe/edgeone-pages-templates/a2ui-template/src/pages/index.astro",{"propagation":"none","containsHead":true}]],"renderers":[],"clientDirectives":[["idle","(()=>{var l=(n,t)=>{let i=async()=>{await(await n())()},e=typeof t.value==\"object\"?t.value:void 0,s={timeout:e==null?void 0:e.timeout};\"requestIdleCallback\"in window?window.requestIdleCallback(i,s):setTimeout(i,s.timeout||200)};(self.Astro||(self.Astro={})).idle=l;window.dispatchEvent(new Event(\"astro:idle\"));})();"],["load","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).load=e;window.dispatchEvent(new Event(\"astro:load\"));})();"],["media","(()=>{var n=(a,t)=>{let i=async()=>{await(await a())()};if(t.value){let e=matchMedia(t.value);e.matches?i():e.addEventListener(\"change\",i,{once:!0})}};(self.Astro||(self.Astro={})).media=n;window.dispatchEvent(new Event(\"astro:media\"));})();"],["only","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).only=e;window.dispatchEvent(new Event(\"astro:only\"));})();"],["visible","(()=>{var a=(s,i,o)=>{let r=async()=>{await(await s())()},t=typeof i.value==\"object\"?i.value:void 0,c={rootMargin:t==null?void 0:t.rootMargin},n=new IntersectionObserver(e=>{for(let l of e)if(l.isIntersecting){n.disconnect(),r();break}},c);for(let e of o.children)n.observe(e)};(self.Astro||(self.Astro={})).visible=a;window.dispatchEvent(new Event(\"astro:visible\"));})();"]],"entryModules":{"\u0000noop-middleware":"_noop-middleware.mjs","\u0000virtual:astro:actions/noop-entrypoint":"noop-entrypoint.mjs","\u0000@astro-page:src/pages/api/chat@_@ts":"pages/api/chat.astro.mjs","\u0000@astro-page:src/pages/chat@_@astro":"pages/chat.astro.mjs","\u0000@astro-page:src/pages/index@_@astro":"pages/index.astro.mjs","\u0000@astrojs-ssr-virtual-entry":"entry.mjs","\u0000@astro-renderers":"renderers.mjs","\u0000@astro-page:node_modules/astro/dist/assets/endpoint/generic@_@js":"pages/_image.astro.mjs","\u0000@astrojs-ssr-adapter":"_@astrojs-ssr-adapter.mjs","\u0000@astrojs-manifest":"manifest_DlAnwb21.mjs","/Users/tomcomtang/VscodeProjects/video_fe/edgeone-pages-templates/a2ui-template/node_modules/astro/dist/assets/services/sharp.js":"chunks/sharp_DcVi5DhK.mjs","/Users/tomcomtang/VscodeProjects/video_fe/edgeone-pages-templates/a2ui-template/src/components/chat/ChatPage":"_astro/ChatPage.CxyWpqNa.js","@astrojs/react/client.js":"_astro/client.9unXo8s5.js","/Users/tomcomtang/VscodeProjects/video_fe/edgeone-pages-templates/a2ui-template/src/components/HeroSection.astro?astro&type=script&index=0&lang.ts":"_astro/HeroSection.astro_astro_type_script_index_0_lang.giz-iOgY.js","astro:scripts/before-hydration.js":""},"inlinedScripts":[["/Users/tomcomtang/VscodeProjects/video_fe/edgeone-pages-templates/a2ui-template/src/components/HeroSection.astro?astro&type=script&index=0&lang.ts","const t=document.getElementById(\"getStartedBtn\");t&&t.addEventListener(\"click\",e=>{e.preventDefault(),t.style.transform=\"scale(0.98)\",t.style.transition=\"transform 0.1s ease\",setTimeout(()=>{t.style.transform=\"\",window.location.href=\"/chat\"},100)});"]],"assets":["/_astro/chat.BrJoJ-JA.css","/_astro/index.B_6SJmXL.css","/favicon.png","/image-404-placeholder.svg","/manifest.json","/_astro/ChatPage.CxyWpqNa.js","/_astro/client.9unXo8s5.js","/_astro/index.WFquGv8Z.js"],"buildFormat":"directory","checkOrigin":true,"allowedDomains":[],"serverIslandNameMap":[],"key":"ihP2uRtwznf6ckdJ9Vt+dFX6ydLek/Sm9Pa5XYX0uNI="});
if (manifest.sessionConfig) manifest.sessionConfig.driverModule = null;

export { manifest };
