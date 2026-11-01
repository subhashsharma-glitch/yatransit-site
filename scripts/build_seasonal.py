#!/usr/bin/env python3
"""PREVIEW: render the home page 'Coming up' strip and the festive banner into index.html from
data/key-dates.json and data/festive.json. Run from the repo root: python3 scripts/build_seasonal.py
Markup goes between <!-- seasonal:fx --> / <!-- /seasonal:fx --> and <!-- seasonal:up --> / <!-- /seasonal:up -->.
Items are filtered at build time (no-JS fallback) and again in the browser by Europe/London date, by an inline
script straight after the markup, so nothing moves after first paint. Preview: ?festive=diwali, ?date=YYYY-MM-DD."""
import json, re, html, datetime
from zoneinfo import ZoneInfo
TODAY = datetime.datetime.now(ZoneInfo("Europe/London")).date().isoformat()
E = lambda s: html.escape(s or "", quote=True)
JS_TODAY = ('function(){var q=(location.search.match(/[?&]date=(\\d{4}-\\d\\d-\\d\\d)/)||[])[1];if(q)return q;'
            'try{return new Intl.DateTimeFormat("en-CA",{timeZone:"Europe/London",year:"numeric",month:"2-digit",day:"2-digit"}).format(new Date())}'
            'catch(e){return new Date().toISOString().slice(0,10)}}')
ICONS = {
 "diya": '<svg class="fx-ico" viewBox="0 0 48 32" aria-hidden="true" focusable="false"><path class="fx-flame" d="M24 2c3 5 5 8 5 11a5 5 0 0 1-10 0c0-3 2-6 5-11z"/><path class="fx-bowl" d="M6 18h36c-1 7-8 12-18 12S7 25 6 18z"/></svg>',
 "star": '<svg class="fx-ico" viewBox="0 0 32 32" aria-hidden="true" focusable="false"><path class="fx-bowl" d="M16 2l4 9 10 1-7.5 6.5L25 29l-9-5.5L7 29l2.5-10.5L2 12l10-1z"/></svg>',
 "spark": '<svg class="fx-ico" viewBox="0 0 32 32" aria-hidden="true" focusable="false"><path class="fx-bowl" d="M16 1l3 12 12 3-12 3-3 12-3-12-12-3 12-3z"/></svg>',
 "moon": '<svg class="fx-ico" viewBox="0 0 32 32" aria-hidden="true" focusable="false"><path class="fx-bowl" d="M21 3a13 13 0 1 0 8 21A11 11 0 0 1 21 3z"/></svg>'}
def on(x): return x["start"] <= TODAY <= x["end"]
def fx():
    F = json.load(open("data/festive.json"))["festivals"]
    items = "".join(f'<div class="fx fx-{E(f["id"])}" data-id="{E(f["id"])}" data-s="{f["start"]}" data-e="{f["end"]}"{"" if on(f) else " hidden"}>'
        f'<div class="fx-in">{ICONS.get(f.get("icon"), ICONS["spark"])}<p><b>{E(f["greeting"])}</b> <span>{E(f["line"])}</span></p></div></div>' for f in F)
    return ('<div id="fx" class="fx-wrap">' + items + '</div><script>(function(){var t=(' + JS_TODAY + ')(),'
        'f=(location.search.match(/[?&]festive=([a-z-]+)/)||[])[1],o=0;[].forEach.call(document.querySelectorAll("#fx .fx"),function(el){'
        'var s=f?el.getAttribute("data-id")===f:(t>=el.getAttribute("data-s")&&t<=el.getAttribute("data-e"));if(s&&!o){el.hidden=false;o=1}else el.hidden=true})})();</script>')
def up():
    K = sorted(json.load(open("data/key-dates.json"))["items"], key=lambda x: x["date"])
    li = "".join(f'<li data-s="{x["start"]}" data-e="{x["end"]}"{"" if on(x) else " hidden"}><time datetime="{x["date"]}">{E(x["dateLabel"])}</time>'
        f'<span><a href="{E(x["url"])}" target="_blank" rel="noopener">{E(x["title"])}</a><small>{E(x["where"])}</small></span></li>' for x in K)
    chk = max(x["checked"] for x in K); d = datetime.date.fromisoformat(chk)
    return (f'<section class="upnext" aria-labelledby="upnext-title"><div class="container"><div class="upnext-head"><p class="kicker">Coming up</p>'
        f'<h2 id="upnext-title" class="upnext-h">Robotaxi and transport dates</h2></div><ul class="upnext-list">{li}</ul>'
        f'<p class="upnext-empty" hidden>No confirmed dates in the next few weeks.</p>'
        f'<p class="upnext-src">Dates from each organiser\'s own page, checked {d.day} {d:%b %Y}. Links open the organiser\'s site in a new tab.</p></div></section>'
        '<script>(function(){var t=(' + JS_TODAY + ')(),n=0,b=document.querySelector(".upnext");if(!b)return;'
        '[].forEach.call(b.querySelectorAll(".upnext-list li"),function(li){var s=t>=li.getAttribute("data-s")&&t<=li.getAttribute("data-e")&&n<4;li.hidden=!s;if(s)n++});'
        'b.querySelector(".upnext-empty").hidden=n>0})();</script>')
s = open("index.html", encoding="utf-8").read()
for k, f in (("fx", fx), ("up", up)):
    s, n = re.subn(rf"(<!-- seasonal:{k} -->).*?(<!-- /seasonal:{k} -->)", lambda m: m[1] + f() + m[2], s, flags=re.S)
    assert n == 1, f"marker seasonal:{k} not found exactly once"
open("index.html", "w", encoding="utf-8").write(s)
print("seasonal: built for", TODAY)
