'use strict';var $jscomp={scope:{},findInternal:function(f,q,p){f instanceof String&&(f=String(f));for(var r=f.length,t=0;t<r;t++){var w=f[t];if(q.call(p,w,t,f))return{i:t,v:w}}return{i:-1,v:void 0}}};$jscomp.defineProperty="function"==typeof Object.defineProperties?Object.defineProperty:function(f,q,p){if(p.get||p.set)throw new TypeError("ES3 does not support getters and setters.");f!=Array.prototype&&f!=Object.prototype&&(f[q]=p.value)};
$jscomp.getGlobal=function(f){return"undefined"!=typeof window&&window===f?f:"undefined"!=typeof global&&null!=global?global:f};$jscomp.global=$jscomp.getGlobal(this);$jscomp.polyfill=function(f,q,p,r){if(q){p=$jscomp.global;f=f.split(".");for(r=0;r<f.length-1;r++){var t=f[r];t in p||(p[t]={});p=p[t]}f=f[f.length-1];r=p[f];q=q(r);q!=r&&null!=q&&$jscomp.defineProperty(p,f,{configurable:!0,writable:!0,value:q})}};
$jscomp.polyfill("Array.prototype.find",function(f){return f?f:function(f,p){return $jscomp.findInternal(this,f,p).v}},"es6-impl","es3");
(function(f){"object"==typeof exports&&"object"==typeof module?f(require("../lib/codemirror"),require("../addon/search/searchcursor"),require("../addon/edit/matchbrackets")):"function"==typeof define&&define.amd?define(["../lib/codemirror","../addon/search/searchcursor","../addon/edit/matchbrackets"],f):f(CodeMirror)})(function(f){function q(a,b){a.extendSelectionsBy(function(c){if(a.display.shift||a.doc.extend||c.empty()){var e;var l=a.doc;c=c.head;if(0>b&&0==c.ch)e=l.clipPos(m(c.line-1));else{var v=
l.getLine(c.line);if(0<b&&c.ch>=v.length)e=l.clipPos(m(c.line+1,0));else{for(var l="start",k=c.ch,d=0>b?0:v.length,g=0;k!=d;k+=b,g++){var h=v.charAt(0>b?k-1:k),n="_"!=h&&f.isWordChar(h)?"w":"o";"w"==n&&h.toUpperCase()==h&&(n="W");if("start"==l)"o"!=n&&(l="in",e=n);else if("in"==l&&e!=n)if("w"==e&&"W"==n&&0>b&&k--,"W"==e&&"w"==n&&0<b)e="w";else break}e=m(c.line,k)}}return e}return 0>b?c.from():c.to()})}function p(a,b){if(a.isReadOnly())return f.Pass;a.operation(function(){for(var c=a.listSelections().length,
e=[],l=-1,d=0;d<c;d++){var k=a.listSelections()[d].head;k.line<=l||(l=m(k.line+(b?0:1),0),a.replaceRange("\n",l,null,"+insertLine"),a.indentLine(l.line,null,!0),e.push({head:l,anchor:l}),l=k.line+1)}a.setSelections(e)});a.execCommand("indentAuto")}function r(a,b){var c=b.ch,e=c;for(a=a.getLine(b.line);c&&f.isWordChar(a.charAt(c-1));)--c;for(;e<a.length&&f.isWordChar(a.charAt(e));)++e;return{from:m(b.line,c),to:m(b.line,e),word:a.slice(c,e)}}function t(a){for(var b=a.listSelections(),c=[],e=0;e<b.length;e++){var l=
b[e].head,d=a.scanForBracket(l,-1);if(!d)return!1;for(;;){l=a.scanForBracket(l,1);if(!l)return!1;if(l.ch=="(){}[]".charAt("(){}[]".indexOf(d.ch)+1)){c.push({anchor:m(d.pos.line,d.pos.ch+1),head:l.pos});break}l=m(l.pos.line,l.pos.ch+1)}}a.setSelections(c);return!0}function w(a,b){if(a.isReadOnly())return f.Pass;for(var c=a.listSelections(),e=[],l,d=0;d<c.length;d++){var k=c[d];if(!k.empty()){for(var g=k.from().line,k=k.to().line;d<c.length-1&&c[d+1].from().line==k;)k=c[++d].to().line;c[d].to().ch||
k--;e.push(g,k)}}e.length?l=!0:e.push(a.firstLine(),a.lastLine());a.operation(function(){for(var c=[],d=0;d<e.length;d+=2){var k=e[d+1],f=m(e[d],0),g=m(k),v=a.getRange(f,g,!1);b?v.sort():v.sort(function(a,c){var b=a.toUpperCase(),e=c.toUpperCase();b!=e&&(a=b,c=e);return a<c?-1:a==c?0:1});a.replaceRange(v,f,g);l&&c.push({anchor:f,head:m(k+1,0)})}l&&a.setSelections(c,0)})}function x(a,b){a.operation(function(){for(var c=a.listSelections(),e=[],l=[],d=0;d<c.length;d++){var k=c[d];k.empty()?(e.push(d),
l.push("")):l.push(b(a.getRange(k.from(),k.to())))}a.replaceSelections(l,"around","case");for(var d=e.length-1,g;0<=d;d--)k=c[e[d]],g&&0<f.cmpPos(k.head,g)||(l=r(a,k.head),g=l.from,a.replaceRange(b(l.word),l.from,l.to))})}function y(a){var b=a.getCursor("from"),c=a.getCursor("to");if(0==f.cmpPos(b,c)){var e=r(a,b);if(!e.word)return;b=e.from;c=e.to}return{from:b,to:c,query:a.getRange(b,c),word:e}}function z(a,b){var c=y(a);if(c){var e=c.query,d=a.getSearchCursor(e,b?c.to:c.from);(b?d.findNext():d.findPrevious())?
a.setSelection(d.from(),d.to()):(d=a.getSearchCursor(e,b?m(a.firstLine(),0):a.clipPos(m(a.lastLine()))),(b?d.findNext():d.findPrevious())?a.setSelection(d.from(),d.to()):c.word&&a.setSelection(c.from,c.to))}}var d=f.keyMap.sublime={fallthrough:"default"},g=f.commands,m=f.Pos,u=f.keyMap["default"]==f.keyMap.macDefault,h=u?"Cmd-":"Ctrl-",n=u?"Ctrl-":"Alt-";g[d[n+"Left"]="goSubwordLeft"]=function(a){q(a,-1)};g[d[n+"Right"]="goSubwordRight"]=function(a){q(a,1)};u&&(d["Cmd-Left"]="goLineStartSmart");n=
u?"Ctrl-Alt-":"Ctrl-";g[d[n+"Up"]="scrollLineUp"]=function(a){var b=a.getScrollInfo();if(!a.somethingSelected()){var c=a.lineAtHeight(b.top+b.clientHeight,"local");a.getCursor().line>=c&&a.execCommand("goLineUp")}a.scrollTo(null,b.top-a.defaultTextHeight())};g[d[n+"Down"]="scrollLineDown"]=function(a){var b=a.getScrollInfo();if(!a.somethingSelected()){var c=a.lineAtHeight(b.top,"local")+1;a.getCursor().line<=c&&a.execCommand("goLineDown")}a.scrollTo(null,b.top+a.defaultTextHeight())};g[d["Shift-"+
h+"L"]="splitSelectionByLine"]=function(a){for(var b=a.listSelections(),c=[],e=0;e<b.length;e++)for(var d=b[e].from(),f=b[e].to(),k=d.line;k<=f.line;++k)f.line>d.line&&k==f.line&&0==f.ch||c.push({anchor:k==d.line?d:m(k,0),head:k==f.line?f:m(k)});a.setSelections(c,0)};d["Shift-Tab"]="indentLess";g[d.Esc="singleSelectionTop"]=function(a){var b=a.listSelections()[0];a.setSelection(b.anchor,b.head,{scroll:!1})};g[d[h+"L"]="selectLine"]=function(a){for(var b=a.listSelections(),c=[],e=0;e<b.length;e++){var d=
b[e];c.push({anchor:m(d.from().line,0),head:m(d.to().line+1,0)})}a.setSelections(c)};d["Shift-Ctrl-K"]="deleteLine";g[d[h+"Enter"]="insertLineAfter"]=function(a){return p(a,!1)};g[d["Shift-"+h+"Enter"]="insertLineBefore"]=function(a){return p(a,!0)};g[d[h+"D"]="selectNextOccurrence"]=function(a){var b=a.getCursor("from"),c=a.getCursor("to"),e=a.state.sublimeFindFullWord==a.doc.sel;if(0==f.cmpPos(b,c)){e=r(a,b);if(!e.word)return;a.setSelection(e.from,e.to);e=!0}else b=a.getRange(b,c),b=e?new RegExp("\\b"+
b+"\\b"):b,c=a.getSearchCursor(b,c),c.findNext()?a.addSelection(c.from(),c.to()):(c=a.getSearchCursor(b,m(a.firstLine(),0)),c.findNext()&&a.addSelection(c.from(),c.to()));e&&(a.state.sublimeFindFullWord=a.doc.sel)};g[d["Shift-"+h+"Space"]="selectScope"]=function(a){t(a)||a.execCommand("selectAll")};g[d["Shift-"+h+"M"]="selectBetweenBrackets"]=function(a){if(!t(a))return f.Pass};g[d[h+"M"]="goToBracket"]=function(a){a.extendSelectionsBy(function(b){var c=a.scanForBracket(b.head,1);return c&&0!=f.cmpPos(c.pos,
b.head)?c.pos:(c=a.scanForBracket(b.head,-1))&&m(c.pos.line,c.pos.ch+1)||b.head})};n=u?"Cmd-Ctrl-":"Shift-Ctrl-";g[d[n+"Up"]="swapLineUp"]=function(a){if(a.isReadOnly())return f.Pass;for(var b=a.listSelections(),c=[],e=a.firstLine()-1,d=[],g=0;g<b.length;g++){var k=b[g],h=k.from().line-1,n=k.to().line;d.push({anchor:m(k.anchor.line-1,k.anchor.ch),head:m(k.head.line-1,k.head.ch)});0!=k.to().ch||k.empty()||--n;h>e?c.push(h,n):c.length&&(c[c.length-1]=n);e=n}a.operation(function(){for(var b=0;b<c.length;b+=
2){var e=c[b],f=c[b+1],l=a.getLine(e);a.replaceRange("",m(e,0),m(e+1,0),"+swapLine");f>a.lastLine()?a.replaceRange("\n"+l,m(a.lastLine()),null,"+swapLine"):a.replaceRange(l+"\n",m(f,0),null,"+swapLine")}a.setSelections(d);a.scrollIntoView()})};g[d[n+"Down"]="swapLineDown"]=function(a){if(a.isReadOnly())return f.Pass;for(var b=a.listSelections(),c=[],e=a.lastLine()+1,d=b.length-1;0<=d;d--){var g=b[d],k=g.to().line+1,h=g.from().line;0!=g.to().ch||g.empty()||k--;k<e?c.push(k,h):c.length&&(c[c.length-
1]=h);e=h}a.operation(function(){for(var b=c.length-2;0<=b;b-=2){var e=c[b],d=c[b+1],f=a.getLine(e);e==a.lastLine()?a.replaceRange("",m(e-1),m(e),"+swapLine"):a.replaceRange("",m(e,0),m(e+1,0),"+swapLine");a.replaceRange(f+"\n",m(d,0),null,"+swapLine")}a.scrollIntoView()})};g[d[h+"/"]="toggleCommentIndented"]=function(a){a.toggleComment({indent:!0})};g[d[h+"J"]="joinLines"]=function(a){for(var b=a.listSelections(),c=[],e=0;e<b.length;e++){for(var d=b[e],f=d.from(),k=f.line,g=d.to().line;e<b.length-
1&&b[e+1].from().line==g;)g=b[++e].to().line;c.push({start:k,end:g,anchor:!d.empty()&&f})}a.operation(function(){for(var b=0,e=[],d=0;d<c.length;d++){for(var f=c[d],g=f.anchor&&m(f.anchor.line-b,f.anchor.ch),k,l=f.start;l<=f.end;l++){var h=l-b;l==f.end&&(k=m(h,a.getLine(h).length+1));h<a.lastLine()&&(a.replaceRange(" ",m(h),m(h+1,/^\s*/.exec(a.getLine(h+1))[0].length)),++b)}e.push({anchor:g||k,head:k})}a.setSelections(e,0)})};g[d["Shift-"+h+"D"]="duplicateLine"]=function(a){a.operation(function(){for(var b=
a.listSelections().length,c=0;c<b;c++){var e=a.listSelections()[c];e.empty()?a.replaceRange(a.getLine(e.head.line)+"\n",m(e.head.line,0)):a.replaceRange(a.getRange(e.from(),e.to()),e.from())}a.scrollIntoView()})};u||(d[h+"T"]="transposeChars");g[d.F9="sortLines"]=function(a){w(a,!0)};g[d[h+"F9"]="sortLinesInsensitive"]=function(a){w(a,!1)};g[d.F2="nextBookmark"]=function(a){var b=a.state.sublimeBookmarks;if(b)for(;b.length;){var c=b.shift(),e=c.find();if(e)return b.push(c),a.setSelection(e.from,e.to)}};
g[d["Shift-F2"]="prevBookmark"]=function(a){var b=a.state.sublimeBookmarks;if(b)for(;b.length;){b.unshift(b.pop());var c=b[b.length-1].find();if(c)return a.setSelection(c.from,c.to);b.pop()}};g[d[h+"F2"]="toggleBookmark"]=function(a){for(var b=a.listSelections(),c=a.state.sublimeBookmarks||(a.state.sublimeBookmarks=[]),e=0;e<b.length;e++){for(var d=b[e].from(),f=b[e].to(),g=a.findMarks(d,f),h=0;h<g.length;h++)if(g[h].sublimeBookmark){g[h].clear();for(var m=0;m<c.length;m++)c[m]==g[h]&&c.splice(m--,
1);break}h==g.length&&c.push(a.markText(d,f,{sublimeBookmark:!0,clearWhenEmpty:!1}))}};g[d["Shift-"+h+"F2"]="clearBookmarks"]=function(a){if(a=a.state.sublimeBookmarks)for(var b=0;b<a.length;b++)a[b].clear();a.length=0};g[d["Alt-F2"]="selectBookmarks"]=function(a){var b=a.state.sublimeBookmarks,c=[];if(b)for(var d=0;d<b.length;d++){var f=b[d].find();f?c.push({anchor:f.from,head:f.to}):b.splice(d--,0)}c.length&&a.setSelections(c,0)};d["Alt-Q"]="wrapLines";n=h+"K ";d[n+h+"Backspace"]="delLineLeft";
g[d.Backspace="smartBackspace"]=function(a){if(a.somethingSelected())return f.Pass;a.operation(function(){for(var b=a.listSelections(),c=a.getOption("indentUnit"),d=b.length-1;0<=d;d--){var g=b[d].head,h=a.getRange({line:g.line,ch:0},g),k=f.countColumn(h,null,a.getOption("tabSize")),n=a.findPosH(g,-1,"char",!1);h&&!/\S/.test(h)&&0==k%c&&(h=new m(g.line,f.findColumn(h,k-c,c)),h.ch!=g.ch&&(n=h));a.replaceRange("",n,g,"+delete")}})};g[d[n+h+"K"]="delLineRight"]=function(a){a.operation(function(){for(var b=
a.listSelections(),c=b.length-1;0<=c;c--)a.replaceRange("",b[c].anchor,m(b[c].to().line),"+delete");a.scrollIntoView()})};g[d[n+h+"U"]="upcaseAtCursor"]=function(a){x(a,function(a){return a.toUpperCase()})};g[d[n+h+"L"]="downcaseAtCursor"]=function(a){x(a,function(a){return a.toLowerCase()})};g[d[n+h+"Space"]="setSublimeMark"]=function(a){a.state.sublimeMark&&a.state.sublimeMark.clear();a.state.sublimeMark=a.setBookmark(a.getCursor())};g[d[n+h+"A"]="selectToSublimeMark"]=function(a){var b=a.state.sublimeMark&&
a.state.sublimeMark.find();b&&a.setSelection(a.getCursor(),b)};g[d[n+h+"W"]="deleteToSublimeMark"]=function(a){var b=a.state.sublimeMark&&a.state.sublimeMark.find();if(b){var c=a.getCursor();if(0<f.cmpPos(c,b))var d=b,b=c,c=d;a.state.sublimeKilled=a.getRange(c,b);a.replaceRange("",c,b)}};g[d[n+h+"X"]="swapWithSublimeMark"]=function(a){var b=a.state.sublimeMark&&a.state.sublimeMark.find();b&&(a.state.sublimeMark.clear(),a.state.sublimeMark=a.setBookmark(a.getCursor()),a.setCursor(b))};g[d[n+h+"Y"]=
"sublimeYank"]=function(a){null!=a.state.sublimeKilled&&a.replaceSelection(a.state.sublimeKilled,null,"paste")};d[n+h+"G"]="clearBookmarks";g[d[n+h+"C"]="showInCenter"]=function(a){var b=a.cursorCoords(null,"local");a.scrollTo(null,(b.top+b.bottom)/2-a.getScrollInfo().clientHeight/2)};u=u?"Ctrl-Shift-":"Ctrl-Alt-";g[d[u+"Up"]="selectLinesUpward"]=function(a){a.operation(function(){for(var b=a.listSelections(),c=0;c<b.length;c++){var d=b[c];d.head.line>a.firstLine()&&a.addSelection(m(d.head.line-1,
d.head.ch))}})};g[d[u+"Down"]="selectLinesDownward"]=function(a){a.operation(function(){for(var b=a.listSelections(),c=0;c<b.length;c++){var d=b[c];d.head.line<a.lastLine()&&a.addSelection(m(d.head.line+1,d.head.ch))}})};g[d[h+"F3"]="findUnder"]=function(a){z(a,!0)};g[d["Shift-"+h+"F3"]="findUnderPrevious"]=function(a){z(a,!1)};g[d["Alt-F3"]="findAllUnder"]=function(a){var b=y(a);if(b){for(var c=a.getSearchCursor(b.query),d=[],f=-1;c.findNext();)d.push({anchor:c.from(),head:c.to()}),c.from().line<=
b.from.line&&c.from().ch<=b.from.ch&&f++;a.setSelections(d,f)}};d["Shift-"+h+"["]="fold";d["Shift-"+h+"]"]="unfold";d[n+h+"0"]=d[n+h+"J"]="unfoldAll";d[h+"I"]="findIncremental";d["Shift-"+h+"I"]="findIncrementalReverse";d[h+"H"]="replace";d.F3="findNext";d["Shift-F3"]="findPrev";f.normalizeKeyMap(d)});
