import{a as q,S as B,i}from"./assets/vendor-BK_rxH-O.js";(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))a(t);new MutationObserver(t=>{for(const o of t)if(o.type==="childList")for(const c of o.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&a(c)}).observe(document,{childList:!0,subtree:!0});function s(t){const o={};return t.integrity&&(o.integrity=t.integrity),t.referrerPolicy&&(o.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?o.credentials="include":t.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function a(t){if(t.ep)return;t.ep=!0;const o=s(t);fetch(t.href,o)}})();const v="https://pixabay.com/api/",b="51319352-42813f34bc37caf0322d42b73",m=async(r,e=1)=>{const s=await q(v,{params:{key:b,q:r,image_type:"photo",orientation:"horizontal",safesearch:!0,page:e,per_page:15}});return{hits:s.data.hits,totalHits:s.data.totalHits}},l={form:document.querySelector(".form"),input:document.querySelector('input[name="search-text"]'),gallery:document.querySelector(".gallery"),loader:document.querySelector(".loader"),loadBtn:document.querySelector(".load-more-btn"),scrollBtn:document.querySelector(".scroll-to-top"),header:document.querySelector("header")},w=new B(".gallery-item a",{captionsData:"alt",captionDelay:250}),p=r=>{const e=r.map(({webformatURL:s,largeImageURL:a,tags:t,likes:o,views:c,comments:L,downloads:S})=>`
         <li class="gallery-item">
        <a class="gallery-link" href="${a}">
            <img
                class="gallery-img"
                src="${s}"
                alt="${t}"
            />
        </a>
        <ul class="list-description">
            <li class="description">
                <h3 class="title">Likes</h3>
                <p class="text">${o}</p>
            </li>
            <li class="description">
                <h3 class="title">Views</h3>
                <p class="text">${c}</p>
            </li>
            <li class="description">
                <h3 class="title">Comments</h3>
                <p class="text">${L}</p>
            </li>
            <li class="description">
                <h3 class="title">Downloads</h3>
                <p class="text">${S}</p>
            </li>
        </ul>
    </li>
        `).join("");l.gallery.insertAdjacentHTML("beforeend",e),w.refresh()},x=()=>{l.gallery.innerHTML=""},y=()=>{l.loader.classList.remove("hidden")},f=()=>{l.loader.classList.add("hidden")},g=()=>{l.loadBtn.classList.remove("hidden")},h=()=>{l.loadBtn.classList.add("hidden")},$=()=>{const r=document.querySelector(".gallery-item"),e=(r==null?void 0:r.getBoundingClientRect().height)||0;window.scrollBy({top:e*2,behavior:"smooth"})},P=()=>{l.header.getBoundingClientRect().top<0?l.scrollBtn.classList.remove("hidden"):l.scrollBtn.classList.add("hidden")},u={form:document.querySelector(".form"),input:document.querySelector('input[name="search-text"]'),gallery:document.querySelector(".gallery"),loader:document.querySelector(".loader"),loadBtn:document.querySelector(".load-more-btn"),scrollBtn:document.querySelector(".scroll-to-top"),header:document.querySelector("header")};window.addEventListener("scroll",P);let d="",n=1;u.form.addEventListener("submit",async r=>{if(r.preventDefault(),x(),d=u.input.value.trim(),n=1,!d)return i.error({message:"Please enter a search query!",position:"topRight"});y(),h();try{const{hits:e,totalHits:s}=await m(d,n);if(e.length===0)return i.error({message:`Sorry, there are no images matching your search ${d}. Please try again!`,position:"topRight"});p(e);const a=Math.ceil(s/15);n>=a?i.info({message:"We're sorry, but you've reached the end of search results.",position:"topRight"}):g()}catch(e){i.error({title:e.message})}finally{f()}u.form.reset()});u.loadBtn.addEventListener("click",async r=>{n+=1,h(),y();try{const{hits:e,totalHits:s}=await m(d,n);p(e),setTimeout(()=>{$()},300);const a=Math.ceil(s/15);n>=a?(h(),i.info({message:"We're sorry, but you've reached the end of search results.",position:"topRight"})):g()}catch(e){i.error({title:e.message})}finally{f()}});u.scrollBtn.addEventListener("click",r=>{r.preventDefault(),window.scrollTo({top:0,behavior:"smooth"})});
//# sourceMappingURL=index.js.map
