(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[974],{8359:(A,e,t)=>{Promise.resolve().then(t.bind(t,7502))},5565:(A,e,t)=>{"use strict";t.d(e,{default:()=>l.a});var a=t(4146),l=t.n(a)},6046:(A,e,t)=>{"use strict";var a=t(6658);t.o(a,"useRouter")&&t.d(e,{useRouter:function(){return a.useRouter}})},4146:(A,e,t)=>{"use strict";Object.defineProperty(e,"__esModule",{value:!0}),function(A,e){for(var t in e)Object.defineProperty(A,t,{enumerable:!0,get:e[t]})}(e,{default:function(){return n},getImageProps:function(){return r}});let a=t(306),l=t(666),i=t(7970),s=a._(t(5514));function r(A){let{props:e}=(0,l.getImgProps)(A,{defaultLoader:s.default,imgConf:{deviceSizes:[640,750,828,1080,1200,1920,2048,3840],imageSizes:[16,32,48,64,96,128,256,384],path:"/AIS-Web-Portal/_next/image",loader:"default",dangerouslyAllowSVG:!1,unoptimized:!0}});for(let[A,t]of Object.entries(e))void 0===t&&delete e[A];return{props:e}}let n=i.Image},7502:(A,e,t)=>{"use strict";t.r(e),t.d(e,{default:()=>f});var a=t(5155),l=t(2115),i=t(6046),s=t(5565),r=t(4845);let n=A=>{let{classname:e}=A;return(0,a.jsx)("div",{className:"w-full",children:(0,a.jsx)("div",{className:"w-full bg-gradient-to-r from-indigo-600 to-teal-500 p-3 flex items-center rounded-b-lg ".concat(null!=e?e:""),children:(0,a.jsx)("div",{className:"flex items-center",children:(0,a.jsx)("div",{className:"transition-opacity duration-300 hover:opacity-50",children:(0,a.jsx)(s.default,{src:r.default,alt:"AIS Logo",width:150,height:50})})})})})},g=A=>{let{pictures:e,infoImages:t,interval:i=5e3}=A,[r,n]=(0,l.useState)(0),[g,d]=(0,l.useState)(!1);(0,l.useEffect)(()=>{let A=setInterval(()=>{d(!0),setTimeout(()=>{n(A=>(A+1)%e.length),d(!1)},500)},i);return()=>clearInterval(A)},[e.length,i]);let c=A=>{d(!0),setTimeout(()=>{n(A),d(!1)},500)};return(0,a.jsxs)("div",{className:"w-full space-y-12",children:[(0,a.jsx)("div",{className:"relative w-full overflow-hidden",children:(0,a.jsx)("div",{className:"transform transition-opacity duration-1000 ".concat(g?"opacity-0":"opacity-100"),children:(0,a.jsx)(s.default,{src:e[r],alt:"Slide ".concat(r+1),width:600,height:400,className:"w-full h-auto",priority:0===r})})}),(0,a.jsx)("div",{className:"flex justify-center gap-2",children:e.map((A,e)=>(0,a.jsx)("button",{onClick:()=>c(e),className:"w-3 h-3 rounded-full transition-all duration-300 ".concat(r===e?"bg-[#4F46E5] w-6":"bg-gray-300 hover:bg-gray-400"),"aria-label":"Go to slide ".concat(e+1)},e))}),(0,a.jsx)("div",{className:"flex items-center gap-4",children:(0,a.jsx)("div",{className:"transform transition-opacity duration-1000 ".concat(g?"opacity-0":"opacity-100"),children:(0,a.jsx)(s.default,{src:t[r],alt:"Info ".concat(r+1),width:450,height:450,className:"object-contain",priority:0===r})})})]})},d={src:"/AIS-Web-Portal/_next/static/media/landingpageinfo1.182b111d.png",height:289,width:2225,blurDataURL:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAABCAMAAADU3h9xAAAACVBMVEUvMTEAAAAttomPNr6+AAAAA3RSTlMlFEMFi4eqAAAACXBIWXMAACxLAAAsSwGlPZapAAAADUlEQVR4nGNgYgADRgAAGgAEX6RitgAAAABJRU5ErkJggg==",blurWidth:8,blurHeight:1},c={src:"/AIS-Web-Portal/_next/static/media/landingpageinfo2.8bb7e42b.png",height:289,width:2225,blurDataURL:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAABCAMAAADU3h9xAAAADFBMVEUzMzM9RUFMaXEvsYgq+t9hAAAABHRSTlMoHQBWQOMlqQAAAAlwSFlzAAAsSwAALEsBpT2WqQAAABFJREFUeJxjYGZkYGBgYGQCAAAsAAi0MuDHAAAAAElFTkSuQmCC",blurWidth:8,blurHeight:1},o={src:"/AIS-Web-Portal/_next/static/media/landingpageinfo3.b0c14c40.png",height:289,width:2293,blurDataURL:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAABCAMAAADU3h9xAAAACVBMVEUyMjIqKiovs4cWXFVlAAAAA3RSTlMqHUBGHCpkAAAACXBIWXMAACxLAAAsSwGlPZapAAAADklEQVR4nGNgYmQAAUYAACEABTXfgjwAAAAASUVORK5CYII=",blurWidth:8,blurHeight:1},h={src:"/AIS-Web-Portal/_next/static/media/landingpageinfo4.4569f14e.png",height:289,width:2273,blurDataURL:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAABCAMAAADU3h9xAAAADFBMVEU2NjY9SUVmZmYxsokl/M2jAAAABHRSTlMmIRRDzj590AAAAAlwSFlzAAAsSwAALEsBpT2WqQAAABFJREFUeJxjYGZkYGBgYGQCAAAsAAi0MuDHAAAAAElFTkSuQmCC",blurWidth:8,blurHeight:1},u={src:"/AIS-Web-Portal/_next/static/media/landingpagepicture.21c6f84e.png",height:2157,width:2797,blurDataURL:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAGCAMAAADJ2y/JAAAASFBMVEWQrbHn6uzh4eHU1NTo6OjV2t3t7e2Emf8/YeU5TvDi4uLl5eatufPh6OXt7e3a391vf//m5vXo5+fj4+Py8vL////U1NT7+/tzfi0BAAAAF3RSTlMBjJ9v8CL+DwkQWbEWRc54IDTcN2QM6D1sBZsAAAAJcEhZcwAALEsAACxLAaU9lqkAAAA2SURBVHicFcbHEcAgEACxBS6Cc+y/U4/1ErT6NNXOaSYmo1OP5ZVRbq51Lns4MGnm9ifSPeADKxMBhYO8SVUAAAAASUVORK5CYII=",blurWidth:8,blurHeight:6},m={src:"/AIS-Web-Portal/_next/static/media/landingpagepicture2.f18fb6c0.png",height:2157,width:2797,blurDataURL:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAGCAMAAADJ2y/JAAAAP1BMVEWdperX3uDV1+HX2enY2dvV1tbi5ed9fdfX2ebAxtrY2NfR0dHT09Do6evb2dnk5Obg5Ovp7Ozi4+bU1NTPz8+PefhVAAAAFXRSTlMInllKetZsAmUbmCQ/76TfuP3fi8i0wDYDAAAACXBIWXMAACxLAAAsSwGlPZapAAAANElEQVR4nAXBiQGAIAwEwQUSLgEUv/5rdQYlYiXM8VbzbzLcz7CyaM9x7x4GtZcrsgGSgB8nJQFQZrrzwwAAAABJRU5ErkJggg==",blurWidth:8,blurHeight:6},x={src:"/AIS-Web-Portal/_next/static/media/landingpagepicture3.dc42bc24.png",height:2157,width:2797,blurDataURL:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAGCAMAAADJ2y/JAAAAQlBMVEUTKenU1NTb2tqFptnd3N3g4ODU0tLg4OAUTeDY2Njh4evl4+Hx8fHq6enZ2dmbptqluuLt7e3q6urV2Obm5eOJpOF3aNsXAAAAFnRSTlMCHcI2OWGJeRZhDU0b0SlFP4JvSacQYtbXKAAAAAlwSFlzAAAsSwAALEsBpT2WqQAAADNJREFUeJwFwYcBACEIALFTQcD+Zf9ZTSAipVocQnvN22ldLZsA5Z8mC/zMR60Bn4x3wAUgxwFWX+ZEXAAAAABJRU5ErkJggg==",blurWidth:8,blurHeight:6},b={src:"/AIS-Web-Portal/_next/static/media/landingpagepicture4.aca002a1.png",height:2157,width:2797,blurDataURL:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAGCAMAAADJ2y/JAAAAJ1BMVEXU1+Zpddnc3t7g4N3S09PS1NrW19uptunl6OWwutzU1NHt8Orm6uqw2XoKAAAADXRSTlMOAysiPmFJGmZZfVhJhnXA6gAAAAlwSFlzAAAsSwAALEsBpT2WqQAAAC5JREFUeJwFwYcBADAIwzAHAnT9f28lREYkQmEnI7Kr2jNE7XMqgLva3iDeqk59EfwAx83eg6YAAAAASUVORK5CYII=",blurWidth:8,blurHeight:6};var p=t(9803);function f(){let A=(0,i.useRouter)();return(0,a.jsxs)("main",{className:"min-h-screen bg-white",children:[(0,a.jsx)(n,{}),(0,a.jsx)("div",{className:"container mx-auto px-4 py-12",children:(0,a.jsxs)("div",{className:"flex flex-col md:flex-row items-start gap-16",children:[(0,a.jsx)("div",{className:"w-full md:w-1/2",children:(0,a.jsx)(g,{pictures:[u,m,x,b],infoImages:[d,c,o,h],interval:5e3})}),(0,a.jsxs)("div",{className:"w-full md:w-1/2 md:pl-8",children:[(0,a.jsx)("h1",{className:"text-[40px] font-bold text-black mb-2",children:"Welcome to"}),(0,a.jsx)("h2",{className:"text-[40px] font-semibold text-[#4F46E5] mb-12",children:"Our AIS Data Analysis Platform"}),(0,a.jsxs)("div",{className:"bg-gray-50 rounded-lg p-8 mb-12",children:[(0,a.jsx)("h3",{className:"text-xl text-gray-800 mb-6",children:"Dive deeper with insights into key port service KPIs:"}),(0,a.jsxs)("ul",{className:"space-y-4",children:[(0,a.jsxs)("li",{className:"flex items-center gap-3",children:[(0,a.jsx)("svg",{className:"w-5 h-5 text-[#10B981]",fill:"none",stroke:"currentColor",viewBox:"0 0 24 24",children:(0,a.jsx)("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"2",d:"M5 13l4 4L19 7"})}),(0,a.jsx)("span",{className:"text-gray-600",children:"Vessel arrivals and berthings"})]}),(0,a.jsxs)("li",{className:"flex items-center gap-3",children:[(0,a.jsx)("svg",{className:"w-5 h-5 text-[#10B981]",fill:"none",stroke:"currentColor",viewBox:"0 0 24 24",children:(0,a.jsx)("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"2",d:"M5 13l4 4L19 7"})}),(0,a.jsx)("span",{className:"text-gray-600",children:"Just-In-Time (JIT) performance"})]}),(0,a.jsxs)("li",{className:"flex items-center gap-3",children:[(0,a.jsx)("svg",{className:"w-5 h-5 text-[#10B981]",fill:"none",stroke:"currentColor",viewBox:"0 0 24 24",children:(0,a.jsx)("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"2",d:"M5 13l4 4L19 7"})}),(0,a.jsx)("span",{className:"text-gray-600",children:"Wharf utilization rates"})]})]})]}),(0,a.jsx)("p",{className:"text-gray-600 text-lg mb-8",children:"Please log in to explore the data and analysis."}),(0,a.jsxs)("div",{className:"grid grid-cols-2 gap-4 mb-20",children:[(0,a.jsx)("button",{onClick:()=>{A.push("/login")},className:"w-full py-4 bg-[#4F46E5] text-white rounded-lg hover:bg-[#4338CA] transition-colors text-lg font-medium",children:"Log in"}),(0,a.jsx)("button",{onClick:()=>{A.push("/signup")},className:"w-full py-4 bg-[#4F46E5] text-white rounded-lg hover:bg-[#4338CA] transition-colors text-lg font-medium",children:"Sign up"})]}),(0,a.jsx)("div",{className:"w-full flex justify-end",children:(0,a.jsx)(s.default,{src:p.Kt,alt:"NUS Logo",width:700,height:140,className:"w-full max-w-[700px]",priority:!0})})]})]})})]})}t(347)},9803:(A,e,t)=>{"use strict";t.d(e,{K1:()=>i.default,Kt:()=>a.default,OZ:()=>l.default});var a=t(5063),l=t(4845);t(9611);var i=t(4438)},347:()=>{},5063:(A,e,t)=>{"use strict";t.r(e),t.d(e,{default:()=>a});let a={src:"/AIS-Web-Portal/_next/static/media/C4NGP.6576cca0.png",height:432,width:3113,blurDataURL:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAABCAMAAADU3h9xAAAACVBMVEUDO34AMn90h5mYSo+UAAAAA3RSTlMZCkRi3zEiAAAACXBIWXMAACxLAAAsSwGlPZapAAAAEUlEQVR4nGNgYmBgYGBkZAQAAB8ABuQLKgcAAAAASUVORK5CYII=",blurWidth:8,blurHeight:1}},4438:(A,e,t)=>{"use strict";t.r(e),t.d(e,{default:()=>a});let a={src:"/AIS-Web-Portal/_next/static/media/C4NGP_light.75713044.png",height:198,width:1704,blurDataURL:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAABCAMAAADU3h9xAAAADFBMVEX08vL////////+/v7VgwcqAAAABHRSTlMmGggOCBoX0QAAAAlwSFlzAAAsSwAALEsBpT2WqQAAABFJREFUeJxjYGBkYGBkZmYCAAAlAAuOExyNAAAAAElFTkSuQmCC",blurWidth:8,blurHeight:1}},9611:(A,e,t)=>{"use strict";t.r(e),t.d(e,{default:()=>a});let a={src:"/AIS-Web-Portal/_next/static/media/logo_dark.a52efaf7.png",height:84,width:315,blurDataURL:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAACCAMAAABSSm3fAAAAElBMVEXFzv/Gzv/Gzf/Gyv/Gz//Iz/8j0tjAAAAABnRSTlM4QEodKGbHpzilAAAACXBIWXMAABYlAAAWJQFJUiTwAAAAF0lEQVR4nGNgZWBmZGFgZGBgYmBmAjEAAR8AG072dxEAAAAASUVORK5CYII=",blurWidth:8,blurHeight:2}},4845:(A,e,t)=>{"use strict";t.r(e),t.d(e,{default:()=>a});let a={src:"/AIS-Web-Portal/_next/static/media/logo_light.24774a4c.png",height:168,width:629,blurDataURL:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAACCAMAAABSSm3fAAAAElBMVEX///////////////////////+65XQCAAAABnRSTlMiNz9FTmdU9vaWAAAACXBIWXMAACxLAAAsSwGlPZapAAAAF0lEQVR4nGNgZWRgYmBkZmJgYWRgBjEAARUAHf3E5qQAAAAASUVORK5CYII=",blurWidth:8,blurHeight:2}}},A=>{var e=e=>A(A.s=e);A.O(0,[690,970,441,517,358],()=>e(8359)),_N_E=A.O()}]);