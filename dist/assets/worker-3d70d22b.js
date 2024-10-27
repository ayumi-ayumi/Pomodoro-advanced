(function(){"use strict";let t;onmessage=({data:{isActive:a,expiryTimestamp:s}})=>{let e=s;(!a||t||e===0)&&clearInterval(t),a&&e&&(t=setInterval(()=>{e-=1,postMessage({time:e})},1e3))}})();
