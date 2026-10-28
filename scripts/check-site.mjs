import assert from 'node:assert/strict';
import { readFile, access } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import vm from 'node:vm';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const html = await readFile(resolve(root,'site/index.html'),'utf8');
const css = await readFile(resolve(root,'site/styles.css'),'utf8');
const js = await readFile(resolve(root,'site/app.js'),'utf8');
const ids = [...html.matchAll(/\bid="([^"]+)"/g)].map(match=>match[1]);
assert.equal(ids.length,new Set(ids).size,'IDs must be unique');
const resources = [...html.matchAll(/(?:src|href)="([^"#]+)"/g)].map(match=>match[1]).filter(url=>url.startsWith('./'));
for (const url of resources) await access(resolve(root,'site',url));
for (const [,id] of html.matchAll(/href="#([^"]+)"/g)) assert(ids.includes(id),`Missing section: ${id}`);
assert.match(html,/<meta name="viewport" content="width=device-width, initial-scale=1">/);
assert.match(css,/@media\(max-width:760px\)/);
assert.match(css,/prefers-reduced-motion/);
assert.match(html,/https:\/\/kjk0189-boop.github.io\/haru-sudoku\//);
assert.equal((html.match(/<h1\b/g)||[]).length,1);
assert(!html.includes('href="#"'),'No placeholder links');

// Exercise the menu handlers without substituting this for browser layout QA.
const node = (attrs={}) => ({ attrs, hidden:true, events:{}, setAttribute(k,v){this.attrs[k]=v;}, getAttribute(k){return this.attrs[k];}, addEventListener(k,v){this.events[k]=v;}, focus(){this.focused=true;}, classList:{toggle(){}} });
const button=node({'aria-expanded':'false'}), menu=node(), destination=node(), documentEvents={}, mediaEvents={};
const context={document:{querySelector(selector){return selector==='.menu-toggle'?button:selector==='#mobile-menu'?menu:destination;},querySelectorAll(){return [];},addEventListener(type,fn){documentEvents[type]=fn;}},window:{matchMedia(){return {addEventListener(type,fn){mediaEvents[type]=fn;}};},addEventListener(){}},requestAnimationFrame(fn){fn();}};
vm.runInNewContext(js,context);
button.events.click(); assert.equal(menu.hidden,false); assert.equal(button.attrs['aria-expanded'],'true');
documentEvents.keydown({key:'Escape'}); assert.equal(menu.hidden,true); assert(button.focused);
button.events.click(); menu.events.click({target:{closest(){return {hash:'#work'};}}}); assert.equal(menu.hidden,true); assert(destination.focused);
button.events.click(); mediaEvents.change({matches:true}); assert.equal(menu.hidden,true);
button.events.click(); documentEvents.click({target:{closest(){return null;}}}); assert.equal(menu.hidden,true);
console.log(JSON.stringify({localResources:resources.length,anchorTargets:ids.length,menuChecks:5,result:'passed',browserLayout:'not covered by static checks'},null,2));
