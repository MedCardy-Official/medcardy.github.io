/* Course labels and Telegram post IDs follow the supplied MedCardy catalogue. */
const CATEGORIES = {
  basic: {fa:'علوم پایه',en:'Basic sciences',color:'#62decc',icon:'⌘'},
  floating: {fa:'دروس شناور',en:'Shared courses',color:'#bcacf5',icon:'⌬'},
  basicExam: {fa:'آزمون علوم پایه',en:'Basic sciences exam',color:'#e8ca81',icon:'✓'},
  physiopath: {fa:'فیزیوپات',en:'Physiopathology',color:'#83baf2',icon:'♡'},
  externship: {fa:'استاجری',en:'Externship',color:'#eaa5bb',icon:'✚'}
};
const UNIVERSITIES = {medcardy:{fa:'مدکاردی',en:'MedCardy'},beheshti:{fa:'بهشتی',en:'Shahid Beheshti'},iran:{fa:'ایران',en:'Iran'},alborz:{fa:'البرز',en:'Alborz'},tehran:{fa:'تهران',en:'Tehran'},houshmand:{fa:'هوشمند',en:'Houshmand'}};
const COURSES = [
 ['basic','خلاصه فیزیولوژی گایتون','Guyton physiology summary','medcardy',747,true],
 ['basic','آناتومی اندام','Limb anatomy','beheshti',220],
 ['basic','فیزیولوژی سلول','Cell physiology','beheshti',831],
 ['basic','فیزیولوژی گردش خون','Circulatory physiology','iran',548],
 ['basic','فیزیولوژی گردش خون','Circulatory physiology','alborz',483],
 ['basic','فیزیولوژی غدد و تولیدمثل','Endocrine & reproductive physiology','alborz',360],
 ['basic','جنین‌شناسی','Embryology','iran',521],
 ['basic','انگل‌شناسی','Parasitology','alborz',670],
 ['basic','ایمنی‌شناسی','Immunology','alborz',321],
 ['basic','اپیدمیولوژی','Epidemiology','iran',429],
 ['basic','اصول خدمات سلامت','Principles of health services','iran',969],
 ['floating','ژنتیک پزشکی','Medical genetics','alborz',284],
 ['floating','فارماکولوژی','Pharmacology','alborz',361],
 ['floating','روانشناسی','Psychology','alborz',366],
 ['basicExam','نکته و تست ۱۰۰۰ سوال اخیر علوم پایه پزشکی','1,000 recent basic sciences questions','medcardy',1003,true],
 ['basicExam','فیزیولوژی','Physiology','medcardy',643],
 ['basicExam','بیوشیمی','Biochemistry','medcardy',718],
 ['basicExam','باکتری و ویروس','Bacteriology & virology','medcardy',727],
 ['basicExam','ایمنی‌شناسی','Immunology','medcardy',736],
 ['physiopath','کورس ریه','Pulmonology','tehran',364],
 ['physiopath','کورس ریه','Pulmonology','alborz',368],
 ['physiopath','کورس قلب','Cardiology','tehran',150],
 ['physiopath','کورس اعصاب','Neurology','alborz',484],
 ['physiopath','کورس اعصاب','Neurology','medcardy',486],
 ['physiopath','کورس اعصاب','Neurology','houshmand,medcardy',937],
 ['physiopath','کورس اطفال','Pediatrics','medcardy',495],
 ['physiopath','کورس جراحی','Surgery','medcardy,alborz',668],
 ['physiopath','کورس کلیه','Nephrology','medcardy,alborz',714],
 ['physiopath','کورس عفونی','Infectious diseases','medcardy,alborz',827],
 ['physiopath','ایمونولوژی بالینی','Clinical immunology','medcardy,alborz',933],
 ['physiopath','فارماکولوژی بالینی ۱','Clinical pharmacology I','medcardy,alborz',935],
 ['physiopath','پاتولوژی اختصاصی ۱','Systemic pathology I','medcardy,alborz',1000],
 ['physiopath','کورس غدد','Endocrinology','medcardy,alborz',1007],
 ['physiopath','کورس هماتولوژی','Hematology','alborz',574],
 ['externship','گایدلاین عفونی','Infectious disease guidelines','medcardy',874,true],
 ['externship','بیماری‌های عفونی','Infectious diseases','alborz',149],
 ['externship','ژنتیک بالینی','Clinical genetics','alborz',522]
].map(([category,fa,en,universities,post,featured=false])=>({category,fa,en,universities:universities.split(','),post,featured}));
let language='fa';
try{language=localStorage.getItem('medcardy-language')==='en'?'en':'fa';}catch{}
let category='all';
const search=document.querySelector('#course-search');
const university=document.querySelector('#university');
const choose=(fa,en)=>language==='fa'?fa:en;
const number=n=>new Intl.NumberFormat(language==='fa'?'fa-IR':'en').format(n);
const normalize=s=>s.toLowerCase().replace(/[يى]/g,'ی').replace(/ك/g,'ک').replace(/[\u200c\u200f\u200e\sـ]/g,'').replace(/[۰-۹]/g,d=>'۰۱۲۳۴۵۶۷۸۹'.indexOf(d)).replace(/[٠-٩]/g,d=>'٠١٢٣٤٥٦٧٨٩'.indexOf(d));
function renderFilters(){
 const choices=[['all',{fa:'همهٔ دوره‌ها',en:'All courses'}],...Object.entries(CATEGORIES)];
 document.querySelector('#categoryFilters').innerHTML=choices.map(([key,label])=>`<button type="button" class="filter-button ${category===key?'active':''}" data-category="${key}" aria-pressed="${category===key}">${label[language]}<span>${number(key==='all'?COURSES.length:COURSES.filter(c=>c.category===key).length)}</span></button>`).join('');
}
function courseCard(c){
 const cat=CATEGORIES[c.category];
 return `<article class="course-card ${c.featured?'featured':''}" style="--card-color:${cat.color}"><div class="card-top"><span class="course-icon" aria-hidden="true">${cat.icon}</span><span class="category-tag">${cat[language]}</span></div><h3>${c[language]}</h3><div class="course-meta">${c.universities.map(u=>`<span>${UNIVERSITIES[u][language]}</span>`).join('')}</div>${c.post===714?`<p class="course-details">${choose('۴۴ جلسه · حدود ۱۵ ساعت صوت · ۴۴۳ صفحه','44 sessions · ~15 audio hours · 443 pages')}</p>`:''}<div class="course-bottom"><span class="course-type">${choose(c.featured?'✦ مجموعهٔ منتخب':'♫ پادکست آموزشی',c.featured?'✦ Featured collection':'♫ Audio course')}</span><a href="https://t.me/medcardy_podcast/${c.post}" target="_blank" rel="noopener noreferrer" aria-label="${choose('مشاهدهٔ','Open')} ${c[language]} — ${c.universities.map(u=>UNIVERSITIES[u][language]).join(' / ')}">${choose('مشاهدهٔ دوره','Open course')}</a></div>${c.post===714?`<a class="notes-link" href="https://t.me/medcardy_podcast/715" target="_blank" rel="noopener noreferrer">${choose('جزوهٔ نوشتاری (PDF) ↗','Written notes (PDF) ↗')}</a>`:''}</article>`;
}
function renderArchive(){
 const term=normalize(search.value);
 const items=COURSES.filter(c=>(category==='all'||c.category===category)&&(university.value==='all'||c.universities.includes(university.value))&&normalize([c.fa,c.en,CATEGORIES[c.category].fa,CATEGORIES[c.category].en,...c.universities.flatMap(u=>[UNIVERSITIES[u].fa,UNIVERSITIES[u].en])].join(' ')).includes(term));
 document.querySelector('#archiveGrid').innerHTML=items.map(courseCard).join('');
 document.querySelector('#archiveCount').textContent=choose(`${number(items.length)} دوره از ${number(COURSES.length)} مجموعه`,`${number(items.length)} of ${number(COURSES.length)} courses`);
 document.querySelector('#archiveEmpty').hidden=items.length>0;
 document.querySelector('#reset').hidden=category==='all'&&university.value==='all'&&!search.value;
}
function applyLanguage(){
 document.documentElement.lang=language;document.documentElement.dir=language==='fa'?'rtl':'ltr';
 document.querySelectorAll('[data-fa][data-en]').forEach(el=>el.textContent=el.dataset[language]);
 const languageButton=document.querySelector('.language');languageButton.textContent=choose('EN','فا');languageButton.setAttribute('aria-label',choose('Switch to English','تغییر زبان به فارسی'));
 document.title=choose('MedCardy | مدکاردی؛ یادگیری پزشکی شنیداری','MedCardy | Medical audio learning');
 document.querySelector('meta[name="description"]').content=choose('مدکاردی؛ پادکست‌های آموزشی پزشکی، خلاصه کتاب‌ها و مرور دوره‌ها از علوم پایه تا استاجری.','MedCardy: medical audio courses, textbook summaries and exam reviews, from basic sciences to externship.');
 search.placeholder=choose('اسم درس یا دانشگاهت را جست‌وجو کن…','Search a course or university…');search.setAttribute('aria-label',choose('جست‌وجوی دوره','Search courses'));
 document.querySelector('#navigation').setAttribute('aria-label',choose('منوی اصلی','Main navigation'));
 document.querySelector('#categoryFilters').setAttribute('aria-label',choose('مقطع آموزشی','Learning path'));
 document.querySelector('.menu').setAttribute('aria-label',choose('باز و بسته کردن منو','Toggle navigation'));
 const previous=university.value||'all';
 university.innerHTML=`<option value="all">${choose('همهٔ دانشگاه‌ها و منابع','All universities & sources')}</option>`+Object.entries(UNIVERSITIES).map(([key,label])=>`<option value="${key}">${label[language]}</option>`).join('');university.value=previous;
 document.querySelector('#totalCourses').textContent=number(COURSES.length);
 document.querySelectorAll('.hero-stats strong')[1].textContent=number(5);document.querySelectorAll('.hero-stats strong')[2].textContent=number(4);
 renderFilters();renderArchive();try{localStorage.setItem('medcardy-language',language);}catch{}
}
function resetFilters(){category='all';university.value='all';search.value='';renderFilters();renderArchive();}
document.querySelector('#categoryFilters').addEventListener('click',e=>{const button=e.target.closest('button');if(!button)return;category=button.dataset.category;renderFilters();renderArchive();});
search.addEventListener('input',renderArchive);university.addEventListener('change',renderArchive);
document.querySelector('#reset').addEventListener('click',resetFilters);document.querySelector('#empty-reset').addEventListener('click',resetFilters);
document.querySelector('.language').addEventListener('click',()=>{language=language==='fa'?'en':'fa';applyLanguage();});
const menu=document.querySelector('.menu');const navigation=document.querySelector('#navigation');
function closeMenu(){navigation.classList.remove('open');menu.setAttribute('aria-expanded','false');}
menu.addEventListener('click',()=>{const open=navigation.classList.toggle('open');menu.setAttribute('aria-expanded',String(open));});
navigation.addEventListener('click',e=>{if(e.target.closest('a'))closeMenu();});
document.addEventListener('click',e=>{if(!e.target.closest('.header'))closeMenu();});
document.addEventListener('keydown',e=>{if(e.key==='Escape'){if(menu.getAttribute('aria-expanded')==='true'){closeMenu();menu.focus();}}if(e.key==='/'&&!e.ctrlKey&&!e.metaKey&&!e.altKey&&!e.target.closest('input,textarea,select,[contenteditable]')){e.preventDefault();search.focus();}});
const wave=document.querySelector('.wave');wave.innerHTML=Array.from({length:43},(_,i)=>`<i style="height:${6+Math.round((Math.sin(i*1.7)+1)*9+Math.sin(i*.48)**2*17)}px"></i>`).join('');
applyLanguage();
