'use strict';var $jscomp={scope:{},findInternal:function(g,q,m){g instanceof String&&(g=String(g));for(var r=g.length,t=0;t<r;t++){var w=g[t];if(q.call(m,w,t,g))return{i:t,v:w}}return{i:-1,v:void 0}}};$jscomp.defineProperty="function"==typeof Object.defineProperties?Object.defineProperty:function(g,q,m){if(m.get||m.set)throw new TypeError("ES3 does not support getters and setters.");g!=Array.prototype&&g!=Object.prototype&&(g[q]=m.value)};
$jscomp.getGlobal=function(g){return"undefined"!=typeof window&&window===g?g:"undefined"!=typeof global&&null!=global?global:g};$jscomp.global=$jscomp.getGlobal(this);$jscomp.polyfill=function(g,q,m,r){if(q){m=$jscomp.global;g=g.split(".");for(r=0;r<g.length-1;r++){var t=g[r];t in m||(m[t]={});m=m[t]}g=g[g.length-1];r=m[g];q=q(r);q!=r&&null!=q&&$jscomp.defineProperty(m,g,{configurable:!0,writable:!0,value:q})}};
$jscomp.polyfill("Array.prototype.find",function(g){return g?g:function(g,m){return $jscomp.findInternal(this,g,m).v}},"es6-impl","es3");
(function(g){"object"==typeof exports&&"object"==typeof module?g(require("../lib/codemirror"),require("../addon/search/searchcursor"),require("../addon/edit/matchbrackets")):"function"==typeof define&&define.amd?define(["../lib/codemirror","../addon/search/searchcursor","../addon/edit/matchbrackets"],g):g(CodeMirror)})(function(g){function q(a,b){a.extendSelectionsBy(function(c){if(a.display.shift||a.doc.extend||c.empty()){var f;var n=a.doc;c=c.head;if(0>b&&0==c.ch)f=n.clipPos(l(c.line-1));else{var d=
n.getLine(c.line);if(0<b&&c.ch>=d.length)f=n.clipPos(l(c.line+1,0));else{for(var n="start",p=c.ch,e=0>b?0:d.length,h=0;p!=e;p+=b,h++){var k=d.charAt(0>b?p-1:p),v="_"!=k&&g.isWordChar(k)?"w":"o";"w"==v&&k.toUpperCase()==k&&(v="W");if("start"==n)"o"!=v&&(n="in",f=v);else if("in"==n&&f!=v)if("w"==f&&"W"==v&&0>b&&p--,"W"==f&&"w"==v&&0<b)f="w";else break}f=l(c.line,p)}}return f}return 0>b?c.from():c.to()})}function m(a,b){if(a.isReadOnly())return g.Pass;a.operation(function(){for(var c=a.listSelections().length,
f=[],n=-1,d=0;d<c;d++){var g=a.listSelections()[d].head;g.line<=n||(n=l(g.line+(b?0:1),0),a.replaceRange("\n",n,null,"+insertLine"),a.indentLine(n.line,null,!0),f.push({head:n,anchor:n}),n=g.line+1)}a.setSelections(f)});a.execCommand("indentAuto")}function r(a,b){var c=b.ch,f=c;for(a=a.getLine(b.line);c&&g.isWordChar(a.charAt(c-1));)--c;for(;f<a.length&&g.isWordChar(a.charAt(f));)++f;return{from:l(b.line,c),to:l(b.line,f),word:a.slice(c,f)}}function t(a){var b=a.getCursor(),c=a.scanForBracket(b,-1);
if(c)for(;;){b=a.scanForBracket(b,1);if(!b)break;if(b.ch=="(){}[]".charAt("(){}[]".indexOf(c.ch)+1))return a.setSelection(l(c.pos.line,c.pos.ch+1),b.pos,!1),!0;b=l(b.pos.line,b.pos.ch+1)}}function w(a,b){if(a.isReadOnly())return g.Pass;for(var c=a.listSelections(),f=[],n,d=0;d<c.length;d++){var p=c[d];if(!p.empty()){for(var e=p.from().line,h=p.to().line;d<c.length-1&&c[d+1].from().line==h;)h=p[++d].to().line;f.push(e,h)}}f.length?n=!0:f.push(a.firstLine(),a.lastLine());a.operation(function(){for(var c=
[],d=0;d<f.length;d+=2){var g=f[d+1],p=l(f[d],0),g=l(g),e=a.getRange(p,g,!1);b?e.sort():e.sort(function(a,b){var c=a.toUpperCase(),f=b.toUpperCase();c!=f&&(a=c,b=f);return a<b?-1:a==b?0:1});a.replaceRange(e,p,g);n&&c.push({anchor:p,head:g})}n&&a.setSelections(c,0)})}function x(a,b){a.operation(function(){for(var c=a.listSelections(),f=[],d=[],e=0;e<c.length;e++){var p=c[e];p.empty()?(f.push(e),d.push("")):d.push(b(a.getRange(p.from(),p.to())))}a.replaceSelections(d,"around","case");for(var e=f.length-
1,h;0<=e;e--)p=c[f[e]],h&&0<g.cmpPos(p.head,h)||(d=r(a,p.head),h=d.from,a.replaceRange(b(d.word),d.from,d.to))})}function y(a){var b=a.getCursor("from"),c=a.getCursor("to");if(0==g.cmpPos(b,c)){var f=r(a,b);if(!f.word)return;b=f.from;c=f.to}return{from:b,to:c,query:a.getRange(b,c),word:f}}function z(a,b){var c=y(a);if(c){var f=c.query,d=a.getSearchCursor(f,b?c.to:c.from);(b?d.findNext():d.findPrevious())?a.setSelection(d.from(),d.to()):(d=a.getSearchCursor(f,b?l(a.firstLine(),0):a.clipPos(l(a.lastLine()))),
(b?d.findNext():d.findPrevious())?a.setSelection(d.from(),d.to()):c.word&&a.setSelection(c.from,c.to))}}var d=g.keyMap.sublime={fallthrough:"default"},e=g.commands,l=g.Pos,u=g.keyMap["default"]==g.keyMap.macDefault,h=u?"Cmd-":"Ctrl-",k=u?"Ctrl-":"Alt-";e[d[k+"Left"]="goSubwordLeft"]=function(a){q(a,-1)};e[d[k+"Right"]="goSubwordRight"]=function(a){q(a,1)};u&&(d["Cmd-Left"]="goLineStartSmart");k=u?"Ctrl-Alt-":"Ctrl-";e[d[k+"Up"]="scrollLineUp"]=function(a){var b=a.getScrollInfo();if(!a.somethingSelected()){var c=
a.lineAtHeight(b.top+b.clientHeight,"local");a.getCursor().line>=c&&a.execCommand("goLineUp")}a.scrollTo(null,b.top-a.defaultTextHeight())};e[d[k+"Down"]="scrollLineDown"]=function(a){var b=a.getScrollInfo();if(!a.somethingSelected()){var c=a.lineAtHeight(b.top,"local")+1;a.getCursor().line<=c&&a.execCommand("goLineDown")}a.scrollTo(null,b.top+a.defaultTextHeight())};e[d["Shift-"+h+"L"]="splitSelectionByLine"]=function(a){for(var b=a.listSelections(),c=[],f=0;f<b.length;f++)for(var d=b[f].from(),
g=b[f].to(),e=d.line;e<=g.line;++e)g.line>d.line&&e==g.line&&0==g.ch||c.push({anchor:e==d.line?d:l(e,0),head:e==g.line?g:l(e)});a.setSelections(c,0)};d["Shift-Tab"]="indentLess";e[d.Esc="singleSelectionTop"]=function(a){var b=a.listSelections()[0];a.setSelection(b.anchor,b.head,{scroll:!1})};e[d[h+"L"]="selectLine"]=function(a){for(var b=a.listSelections(),c=[],f=0;f<b.length;f++){var d=b[f];c.push({anchor:l(d.from().line,0),head:l(d.to().line+1,0)})}a.setSelections(c)};d["Shift-Ctrl-K"]="deleteLine";
e[d[h+"Enter"]="insertLineAfter"]=function(a){return m(a,!1)};e[d["Shift-"+h+"Enter"]="insertLineBefore"]=function(a){return m(a,!0)};e[d[h+"D"]="selectNextOccurrence"]=function(a){var b=a.getCursor("from"),c=a.getCursor("to"),f=a.state.sublimeFindFullWord==a.doc.sel;if(0==g.cmpPos(b,c)){f=r(a,b);if(!f.word)return;a.setSelection(f.from,f.to);f=!0}else b=a.getRange(b,c),b=f?new RegExp("\\b"+b+"\\b"):b,c=a.getSearchCursor(b,c),c.findNext()?a.addSelection(c.from(),c.to()):(c=a.getSearchCursor(b,l(a.firstLine(),
0)),c.findNext()&&a.addSelection(c.from(),c.to()));f&&(a.state.sublimeFindFullWord=a.doc.sel)};e[d["Shift-"+h+"Space"]="selectScope"]=function(a){t(a)||a.execCommand("selectAll")};e[d["Shift-"+h+"M"]="selectBetweenBrackets"]=function(a){if(!t(a))return g.Pass};e[d[h+"M"]="goToBracket"]=function(a){a.extendSelectionsBy(function(b){var c=a.scanForBracket(b.head,1);return c&&0!=g.cmpPos(c.pos,b.head)?c.pos:(c=a.scanForBracket(b.head,-1))&&l(c.pos.line,c.pos.ch+1)||b.head})};k=u?"Cmd-Ctrl-":"Shift-Ctrl-";
e[d[k+"Up"]="swapLineUp"]=function(a){if(a.isReadOnly())return g.Pass;for(var b=a.listSelections(),c=[],f=a.firstLine()-1,d=[],e=0;e<b.length;e++){var h=b[e],k=h.from().line-1,m=h.to().line;d.push({anchor:l(h.anchor.line-1,h.anchor.ch),head:l(h.head.line-1,h.head.ch)});0!=h.to().ch||h.empty()||--m;k>f?c.push(k,m):c.length&&(c[c.length-1]=m);f=m}a.operation(function(){for(var b=0;b<c.length;b+=2){var f=c[b],g=c[b+1],e=a.getLine(f);a.replaceRange("",l(f,0),l(f+1,0),"+swapLine");g>a.lastLine()?a.replaceRange("\n"+
e,l(a.lastLine()),null,"+swapLine"):a.replaceRange(e+"\n",l(g,0),null,"+swapLine")}a.setSelections(d);a.scrollIntoView()})};e[d[k+"Down"]="swapLineDown"]=function(a){if(a.isReadOnly())return g.Pass;for(var b=a.listSelections(),c=[],f=a.lastLine()+1,d=b.length-1;0<=d;d--){var e=b[d],h=e.to().line+1,k=e.from().line;0!=e.to().ch||e.empty()||h--;h<f?c.push(h,k):c.length&&(c[c.length-1]=k);f=k}a.operation(function(){for(var b=c.length-2;0<=b;b-=2){var f=c[b],d=c[b+1],e=a.getLine(f);f==a.lastLine()?a.replaceRange("",
l(f-1),l(f),"+swapLine"):a.replaceRange("",l(f,0),l(f+1,0),"+swapLine");a.replaceRange(e+"\n",l(d,0),null,"+swapLine")}a.scrollIntoView()})};e[d[h+"/"]="toggleCommentIndented"]=function(a){a.toggleComment({indent:!0})};e[d[h+"J"]="joinLines"]=function(a){for(var b=a.listSelections(),c=[],f=0;f<b.length;f++){for(var d=b[f],e=d.from(),g=e.line,h=d.to().line;f<b.length-1&&b[f+1].from().line==h;)h=b[++f].to().line;c.push({start:g,end:h,anchor:!d.empty()&&e})}a.operation(function(){for(var b=0,f=[],d=
0;d<c.length;d++){for(var e=c[d],g=e.anchor&&l(e.anchor.line-b,e.anchor.ch),h,n=e.start;n<=e.end;n++){var k=n-b;n==e.end&&(h=l(k,a.getLine(k).length+1));k<a.lastLine()&&(a.replaceRange(" ",l(k),l(k+1,/^\s*/.exec(a.getLine(k+1))[0].length)),++b)}f.push({anchor:g||h,head:h})}a.setSelections(f,0)})};e[d["Shift-"+h+"D"]="duplicateLine"]=function(a){a.operation(function(){for(var b=a.listSelections().length,c=0;c<b;c++){var f=a.listSelections()[c];f.empty()?a.replaceRange(a.getLine(f.head.line)+"\n",l(f.head.line,
0)):a.replaceRange(a.getRange(f.from(),f.to()),f.from())}a.scrollIntoView()})};u||(d[h+"T"]="transposeChars");e[d.F9="sortLines"]=function(a){w(a,!0)};e[d[h+"F9"]="sortLinesInsensitive"]=function(a){w(a,!1)};e[d.F2="nextBookmark"]=function(a){var b=a.state.sublimeBookmarks;if(b)for(;b.length;){var c=b.shift(),f=c.find();if(f)return b.push(c),a.setSelection(f.from,f.to)}};e[d["Shift-F2"]="prevBookmark"]=function(a){var b=a.state.sublimeBookmarks;if(b)for(;b.length;){b.unshift(b.pop());var c=b[b.length-
1].find();if(c)return a.setSelection(c.from,c.to);b.pop()}};e[d[h+"F2"]="toggleBookmark"]=function(a){for(var b=a.listSelections(),c=a.state.sublimeBookmarks||(a.state.sublimeBookmarks=[]),f=0;f<b.length;f++){for(var d=b[f].from(),e=b[f].to(),g=a.findMarks(d,e),h=0;h<g.length;h++)if(g[h].sublimeBookmark){g[h].clear();for(var k=0;k<c.length;k++)c[k]==g[h]&&c.splice(k--,1);break}h==g.length&&c.push(a.markText(d,e,{sublimeBookmark:!0,clearWhenEmpty:!1}))}};e[d["Shift-"+h+"F2"]="clearBookmarks"]=function(a){if(a=
a.state.sublimeBookmarks)for(var b=0;b<a.length;b++)a[b].clear();a.length=0};e[d["Alt-F2"]="selectBookmarks"]=function(a){var b=a.state.sublimeBookmarks,c=[];if(b)for(var d=0;d<b.length;d++){var e=b[d].find();e?c.push({anchor:e.from,head:e.to}):b.splice(d--,0)}c.length&&a.setSelections(c,0)};d["Alt-Q"]="wrapLines";k=h+"K ";d[k+h+"Backspace"]="delLineLeft";e[d.Backspace="smartBackspace"]=function(a){if(a.somethingSelected())return g.Pass;a.operation(function(){for(var b=a.listSelections(),c=a.getOption("indentUnit"),
d=b.length-1;0<=d;d--){var e=b[d].head,h=a.getRange({line:e.line,ch:0},e),k=g.countColumn(h,null,a.getOption("tabSize")),m=a.findPosH(e,-1,"char",!1);h&&!/\S/.test(h)&&0==k%c&&(h=new l(e.line,g.findColumn(h,k-c,c)),h.ch!=e.ch&&(m=h));a.replaceRange("",m,e,"+delete")}})};e[d[k+h+"K"]="delLineRight"]=function(a){a.operation(function(){for(var b=a.listSelections(),c=b.length-1;0<=c;c--)a.replaceRange("",b[c].anchor,l(b[c].to().line),"+delete");a.scrollIntoView()})};e[d[k+h+"U"]="upcaseAtCursor"]=function(a){x(a,
function(a){return a.toUpperCase()})};e[d[k+h+"L"]="downcaseAtCursor"]=function(a){x(a,function(a){return a.toLowerCase()})};e[d[k+h+"Space"]="setSublimeMark"]=function(a){a.state.sublimeMark&&a.state.sublimeMark.clear();a.state.sublimeMark=a.setBookmark(a.getCursor())};e[d[k+h+"A"]="selectToSublimeMark"]=function(a){var b=a.state.sublimeMark&&a.state.sublimeMark.find();b&&a.setSelection(a.getCursor(),b)};e[d[k+h+"W"]="deleteToSublimeMark"]=function(a){var b=a.state.sublimeMark&&a.state.sublimeMark.find();
if(b){var c=a.getCursor();if(0<g.cmpPos(c,b))var d=b,b=c,c=d;a.state.sublimeKilled=a.getRange(c,b);a.replaceRange("",c,b)}};e[d[k+h+"X"]="swapWithSublimeMark"]=function(a){var b=a.state.sublimeMark&&a.state.sublimeMark.find();b&&(a.state.sublimeMark.clear(),a.state.sublimeMark=a.setBookmark(a.getCursor()),a.setCursor(b))};e[d[k+h+"Y"]="sublimeYank"]=function(a){null!=a.state.sublimeKilled&&a.replaceSelection(a.state.sublimeKilled,null,"paste")};d[k+h+"G"]="clearBookmarks";e[d[k+h+"C"]="showInCenter"]=
function(a){var b=a.cursorCoords(null,"local");a.scrollTo(null,(b.top+b.bottom)/2-a.getScrollInfo().clientHeight/2)};u=u?"Ctrl-Shift-":"Ctrl-Alt-";e[d[u+"Up"]="selectLinesUpward"]=function(a){a.operation(function(){for(var b=a.listSelections(),c=0;c<b.length;c++){var d=b[c];d.head.line>a.firstLine()&&a.addSelection(l(d.head.line-1,d.head.ch))}})};e[d[u+"Down"]="selectLinesDownward"]=function(a){a.operation(function(){for(var b=a.listSelections(),c=0;c<b.length;c++){var d=b[c];d.head.line<a.lastLine()&&
a.addSelection(l(d.head.line+1,d.head.ch))}})};e[d[h+"F3"]="findUnder"]=function(a){z(a,!0)};e[d["Shift-"+h+"F3"]="findUnderPrevious"]=function(a){z(a,!1)};e[d["Alt-F3"]="findAllUnder"]=function(a){var b=y(a);if(b){for(var c=a.getSearchCursor(b.query),d=[],e=-1;c.findNext();)d.push({anchor:c.from(),head:c.to()}),c.from().line<=b.from.line&&c.from().ch<=b.from.ch&&e++;a.setSelections(d,e)}};d["Shift-"+h+"["]="fold";d["Shift-"+h+"]"]="unfold";d[k+h+"0"]=d[k+h+"J"]="unfoldAll";d[h+"I"]="findIncremental";
d["Shift-"+h+"I"]="findIncrementalReverse";d[h+"H"]="replace";d.F3="findNext";d["Shift-F3"]="findPrev";g.normalizeKeyMap(d)});
