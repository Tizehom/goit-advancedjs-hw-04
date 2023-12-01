import{a as h,i as s,S as p}from"./assets/vendor-aa7a424a.js";(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))l(t);new MutationObserver(t=>{for(const o of t)if(o.type==="childList")for(const c of o.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&l(c)}).observe(document,{childList:!0,subtree:!0});function a(t){const o={};return t.integrity&&(o.integrity=t.integrity),t.referrerpolicy&&(o.referrerPolicy=t.referrerpolicy),t.crossorigin==="use-credentials"?o.credentials="include":t.crossorigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function l(t){if(t.ep)return;t.ep=!0;const o=a(t);fetch(t.href,o)}})();const y="41002139-ab30ad0ff8976a28ff14eed97";async function w(r,e=1,a=40){const l=`https://pixabay.com/api/?key=${y}&q=${encodeURIComponent(r)}&image_type=photo&orientation=horizontal&safesearch=true&page=${e}&per_page=${a}`;try{return(await h.get(l)).data}catch(t){throw t}}let i=1,d=0,f=0;const m=40,u=document.querySelector(".gallery");let n;document.getElementById("search-form").addEventListener("submit",async function(r){r.preventDefault(),L(),i=1;const e=r.target.elements.searchQuery.value.trim();if(!e){s.warning({title:"Warning",message:"Please enter a search query.",position:"topRight"});return}await g(e)});window.addEventListener("scroll",()=>{window.scrollY+window.innerHeight>=document.documentElement.scrollHeight&&v()});async function v(){const r=document.getElementById("search-form").elements.searchQuery.value.trim();!r||i>=f||(i++,await g(r))}async function g(r){if(r=r.trim(),!r){s.warning({title:"Warning",message:"Please enter a search query.",position:"topRight"});return}try{const e=await w(r,i,m);d=e.totalHits,f=Math.ceil(d/m),e.hits.length===0?s.error({title:"Error",message:"Sorry, there are no images matching your search query. Please try again.",position:"topRight"}):(b(e.hits),i===1&&s.success({title:"Hooray!",message:`We found ${d} images.`,position:"topRight"}))}catch(e){console.error("Error fetching images:",e),s.error({title:"Error",message:"Error fetching images",position:"topRight"})}}function b(r){r.forEach(e=>{const a=`
      <div class="photo-card">
        <a href="${e.largeImageURL}">
          <img src="${e.webformatURL}" alt="${e.tags}" loading="lazy" />
        </a>
        <div class="info">
          <div class="info-item">
            <b>Likes</b>
            <span>${e.likes}</span>
          </div>
          <div class="info-item">
            <b>Views</b>
            <span>${e.views}</span>
          </div>
          <div class="info-item">
            <b>Comments</b>
            <span>${e.comments}</span>
          </div>
          <div class="info-item">
            <b>Downloads</b>
            <span>${e.downloads}</span>
          </div>
        </div>
      </div>`;u.insertAdjacentHTML("beforeend",a)}),n?n.refresh():n=new p(".gallery a",{}),i>=f&&s.error({title:"End of Results",message:"Sorry, there are no more images matching your search query. Please try again.",position:"topRight"}),i>1&&E()}function L(){u.innerHTML="",n&&(n.destroy(),n=null)}function E(){const{height:r}=u.firstElementChild.getBoundingClientRect();window.scrollBy({top:r*2,behavior:"smooth"})}
//# sourceMappingURL=commonHelpers.js.map
