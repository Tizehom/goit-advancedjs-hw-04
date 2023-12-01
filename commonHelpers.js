import{a as m,i as l,S as h}from"./assets/vendor-aa7a424a.js";(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))a(t);new MutationObserver(t=>{for(const r of t)if(r.type==="childList")for(const c of r.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&a(c)}).observe(document,{childList:!0,subtree:!0});function n(t){const r={};return t.integrity&&(r.integrity=t.integrity),t.referrerpolicy&&(r.referrerPolicy=t.referrerpolicy),t.crossorigin==="use-credentials"?r.credentials="include":t.crossorigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function a(t){if(t.ep)return;t.ep=!0;const r=n(t);fetch(t.href,r)}})();const p="41002139-ab30ad0ff8976a28ff14eed97";async function g(o,e=1,n=40){const a=`https://pixabay.com/api/?key=${p}&q=${encodeURIComponent(o)}&image_type=photo&orientation=horizontal&safesearch=true&page=${e}&per_page=${n}`;try{return(await m.get(a)).data}catch(t){throw t}}let i=1;const d=document.querySelector(".gallery");let s,f=0;document.getElementById("search-form").addEventListener("submit",async function(o){o.preventDefault(),w(),i=1;const e=o.target.elements.searchQuery.value;await u(e)});window.addEventListener("scroll",()=>{window.scrollY+window.innerHeight>=document.documentElement.scrollHeight&&y()});async function y(){i++;const o=document.getElementById("search-form").elements.searchQuery.value;await u(o)}async function u(o){try{const e=await g(o,i);f=e.totalHits,e.hits.length===0?l.error({title:"Error",message:"Sorry, there are no images matching your search query. Please try again.",position:"topRight"}):(v(e.hits),i===1&&l.success({title:"Hooray!",message:`We found ${f} images.`,position:"topRight"}))}catch(e){console.error("Error fetching images:",e),l.error({title:"Error",message:"Error fetching images",position:"topRight"})}}function v(o){o.forEach(e=>{const n=`
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
            </div>`;d.insertAdjacentHTML("beforeend",n)}),s?s.refresh():s=new h(".gallery a",{}),i>1&&b()}function w(){d.innerHTML="",s&&(s.destroy(),s=null)}function b(){const{height:o}=d.firstElementChild.getBoundingClientRect();window.scrollBy({top:o*2,behavior:"smooth"})}
//# sourceMappingURL=commonHelpers.js.map
