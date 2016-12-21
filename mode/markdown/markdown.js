'use strict';(function(h){"object"==typeof exports&&"object"==typeof module?h(require("../../lib/codemirror"),require("../xml/xml"),require("../meta")):"function"==typeof define&&define.amd?define(["../../lib/codemirror","../xml/xml","../meta"],h):h(CodeMirror)})(function(h){h.defineMode("markdown",function(v,c){function r(b,a,c){a.f=a.inline=c;return c(b,a)}function t(b){return!b||!/\S/.test(b.string)}function w(b){b.linkTitle=!1;b.em=!1;b.strong=!1;b.strikethrough=!1;b.quote=0;b.indentedCode=!1;
x&&b.f==u&&(b.f=m,b.block=p);b.trailingSpace=0;b.trailingSpaceNewLine=!1;b.prevLine=b.thisLine;return b.thisLine=null}function p(b,a){var e=b.sol(),g=!1!==a.list,l=a.indentedCode;a.indentedCode=!1;g&&(0<=a.indentationDiff?(4>a.indentationDiff&&(a.indentation-=a.indentationDiff),a.list=null):a.list=0<a.indentation?null:!1);var k=null;if(4<=a.indentationDiff)return b.skipToEnd(),l||t(a.prevLine)?(a.indentation-=4,a.indentedCode=!0,f.code):null;if(b.eatSpace())return null;if((k=b.match(E))&&6>=k[1].length)return a.header=
k[1].length,c.highlightFormatting&&(a.formatting="header"),a.f=a.inline,d(a);if(t(a.prevLine)||a.quote||g||l||!(k=b.match(F))){if(b.eat(">"))return a.quote=e?1:a.quote+1,c.highlightFormatting&&(a.formatting="quote"),b.eatSpace(),d(a);if("["===b.peek())return r(b,a,G);if(b.match(H,!0))return a.hr=!0,f.hr;if((t(a.prevLine)||g)&&(b.match(y,!1)||b.match(z,!1))){b.match(y,!0)?e="ul":(b.match(z,!0),e="ol");a.indentation=b.column()+b.current().length;for(a.list=!0;a.listStack&&b.column()<a.listStack[a.listStack.length-
1];)a.listStack.pop();a.listStack.push(a.indentation);c.taskLists&&b.match(A,!1)&&(a.taskList=!0);a.f=a.inline;c.highlightFormatting&&(a.formatting=["list","list-"+e]);return d(a)}if(c.fencedCodeBlocks&&(k=b.match(I,!0)))return a.fencedChars=k[1],b=k[2],h.findModeByName&&(e=h.findModeByName(b))&&(b=e.mime||e.mimes[0]),b=h.getMode(v,b),a.localMode="null"==b.name?null:b,a.localMode&&(a.localState=h.startState(a.localMode)),a.f=a.block=J,c.highlightFormatting&&(a.formatting="code-block"),a.code=-1,d(a)}else return a.header=
"="==k[0].charAt(0)?1:2,c.highlightFormatting&&(a.formatting="header"),a.f=a.inline,d(a);return r(b,a,a.inline)}function u(b,a){var c=n.token(b,a.htmlState);if(!x){var d=h.innerMode(n,a.htmlState);if("xml"==d.mode.name&&null===d.state.tagStart&&!d.state.context&&d.state.tokenize.isInText||a.md_inside&&-1<b.current().indexOf(">"))a.f=m,a.block=p,a.htmlState=null}return c}function J(b,a){if(a.fencedChars&&b.match(a.fencedChars,!1))return a.localMode=a.localState=null,a.f=a.block=K,null;if(a.localMode)return a.localMode.token(b,
a.localState);b.skipToEnd();return f.code}function K(b,a){b.match(a.fencedChars);a.block=p;a.f=m;a.fencedChars=null;c.highlightFormatting&&(a.formatting="code-block");a.code=1;b=d(a);a.code=0;return b}function d(b){var a=[];if(b.formatting){a.push(f.formatting);"string"===typeof b.formatting&&(b.formatting=[b.formatting]);for(var e=0;e<b.formatting.length;e++)a.push(f.formatting+"-"+b.formatting[e]),"header"===b.formatting[e]&&a.push(f.formatting+"-"+b.formatting[e]+"-"+b.header),"quote"===b.formatting[e]&&
(!c.maxBlockquoteDepth||c.maxBlockquoteDepth>=b.quote?a.push(f.formatting+"-"+b.formatting[e]+"-"+b.quote):a.push("error"))}if(b.taskOpen)return a.push("meta"),a.length?a.join(" "):null;if(b.taskClosed)return a.push("property"),a.length?a.join(" "):null;b.linkHref?a.push(f.linkHref,"url"):(b.strong&&a.push(f.strong),b.em&&a.push(f.em),b.strikethrough&&a.push(f.strikethrough),b.linkText&&a.push(f.linkText),b.code&&a.push(f.code),b.image&&a.push(f.image),b.imageAltText&&a.push(f.imageAltText,"link"),
b.imageMarker&&a.push(f.imageMarker));b.header&&a.push(f.header,f.header+"-"+b.header);b.quote&&(a.push(f.quote),!c.maxBlockquoteDepth||c.maxBlockquoteDepth>=b.quote?a.push(f.quote+"-"+b.quote):a.push(f.quote+"-"+c.maxBlockquoteDepth));!1!==b.list&&((e=(b.listStack.length-1)%3)?1===e?a.push(f.list2):a.push(f.list3):a.push(f.list1));b.trailingSpaceNewLine?a.push("trailing-space-new-line"):b.trailingSpace&&a.push("trailing-space-"+(b.trailingSpace%2?"a":"b"));return a.length?a.join(" "):null}function L(b,
a){if(b.match(M,!0))return d(a)}function m(b,a){var e=a.text(b,a);if("undefined"!==typeof e)return e;if(a.list)return a.list=null,d(a);if(a.taskList)return"x"!==b.match(A,!0)[1]?a.taskOpen=!0:a.taskClosed=!0,c.highlightFormatting&&(a.formatting="task"),a.taskList=!1,d(a);a.taskOpen=!1;a.taskClosed=!1;if(a.header&&b.match(/^#+$/,!0))return c.highlightFormatting&&(a.formatting="header"),d(a);var e=b.sol(),g=b.next();if(a.linkTitle){a.linkTitle=!1;var l=g;"("===g&&(l=")");l=(l+"").replace(/([.?*+^$[\]\\(){}|-])/g,
"\\$1");if(b.match(new RegExp("^\\s*(?:[^"+l+"\\\\]+|\\\\\\\\|\\\\.)"+l),!0))return f.linkHref}if("`"===g){e=a.formatting;c.highlightFormatting&&(a.formatting="code");b.eatWhile("`");b=b.current().length;if(0==a.code)return a.code=b,d(a);if(b==a.code)return b=d(a),a.code=0,b;a.formatting=e;return d(a)}if(a.code)return d(a);if("\\"===g&&(b.next(),c.highlightFormatting))return b=d(a),a=f.formatting+"-escape",b?b+" "+a:a;if("!"===g&&b.match(/\[[^\]]*\] ?(?:\(|\[)/,!1))return a.imageMarker=!0,a.image=
!0,c.highlightFormatting&&(a.formatting="image"),d(a);if("["===g&&a.imageMarker)return a.imageMarker=!1,a.imageAltText=!0,c.highlightFormatting&&(a.formatting="image"),d(a);if("]"===g&&a.imageAltText)return c.highlightFormatting&&(a.formatting="image"),b=d(a),a.imageAltText=!1,a.image=!1,a.inline=a.f=B,b;if("["===g&&b.match(/[^\]]*\](\(.*\)| ?\[.*?\])/,!1)&&!a.image)return a.linkText=!0,c.highlightFormatting&&(a.formatting="link"),d(a);if("]"===g&&a.linkText&&b.match(/\(.*?\)| ?\[.*?\]/,!1))return c.highlightFormatting&&
(a.formatting="link"),b=d(a),a.linkText=!1,a.inline=a.f=B,b;if("<"===g&&b.match(/^(https?|ftps?):\/\/(?:[^\\>]|\\.)+>/,!1))return a.f=a.inline=C,c.highlightFormatting&&(a.formatting="link"),b=d(a),(b?b+" ":"")+f.linkInline;if("<"===g&&b.match(/^[^> \\]+@(?:[^\\>]|\\.)+>/,!1))return a.f=a.inline=C,c.highlightFormatting&&(a.formatting="link"),b=d(a),(b?b+" ":"")+f.linkEmail;if("<"===g&&b.match(/^(!--|\w)/,!1))return e=b.string.indexOf(">",b.pos),-1!=e&&(e=b.string.substring(b.start,e),/markdown\s*=\s*('|"){0,1}1('|"){0,1}/.test(e)&&
(a.md_inside=!0)),b.backUp(1),a.htmlState=h.startState(n),e=u,a.f=a.block=e,e(b,a);if("<"===g&&b.match(/^\/\w*?>/))return a.md_inside=!1,"tag";l=!1;if(!c.underscoresBreakWords&&"_"===g&&"_"!==b.peek()&&b.match(/(\w)/,!1)){var k=b.pos-2;0<=k&&(k=b.string.charAt(k),"_"!==k&&k.match(/(\w)/,!1)&&(l=!0))}if("*"===g||"_"===g&&!l){if(!e||" "!==b.peek()){if(a.strong===g&&b.eat(g))return c.highlightFormatting&&(a.formatting="strong"),b=d(a),a.strong=!1,b;if(!a.strong&&b.eat(g))return a.strong=g,c.highlightFormatting&&
(a.formatting="strong"),d(a);if(a.em===g)return c.highlightFormatting&&(a.formatting="em"),b=d(a),a.em=!1,b;if(!a.em)return a.em=g,c.highlightFormatting&&(a.formatting="em"),d(a)}}else if(" "===g&&(b.eat("*")||b.eat("_"))){if(" "===b.peek())return d(a);b.backUp(1)}if(c.strikethrough)if("~"===g&&b.eatWhile(g)){if(a.strikethrough)return c.highlightFormatting&&(a.formatting="strikethrough"),b=d(a),a.strikethrough=!1,b;if(b.match(/^[^\s]/,!1))return a.strikethrough=!0,c.highlightFormatting&&(a.formatting=
"strikethrough"),d(a)}else if(" "===g&&b.match(/^~~/,!0)){if(" "===b.peek())return d(a);b.backUp(2)}" "===g&&(b.match(/ +$/,!1)?a.trailingSpace++:a.trailingSpace&&(a.trailingSpaceNewLine=!0));return d(a)}function C(b,a){if(">"===b.next())return a.f=a.inline=m,c.highlightFormatting&&(a.formatting="link"),b=d(a),(b?b+" ":"")+f.linkInline;b.match(/^[^>]+/,!0);return f.linkInline}function B(b,a){if(b.eatSpace())return null;b=b.next();return"("===b||"["===b?(a.f=a.inline=N("("===b?")":"]",0),c.highlightFormatting&&
(a.formatting="link-string"),a.linkHref=!0,d(a)):"error"}function N(b){return function(a,e){if(a.next()===b)return e.f=e.inline=m,c.highlightFormatting&&(e.formatting="link-string"),a=d(e),e.linkHref=!1,a;a.match(O[b]);e.linkHref=!0;return d(e)}}function G(b,a){return b.match(/^([^\]\\]|\\.)*\]:/,!1)?(a.f=P,b.next(),c.highlightFormatting&&(a.formatting="link"),a.linkText=!0,d(a)):r(b,a,m)}function P(b,a){if(b.match(/^\]:/,!0))return a.f=a.inline=Q,c.highlightFormatting&&(a.formatting="link"),b=d(a),
a.linkText=!1,b;b.match(/^([^\]\\]|\\.)+/,!0);return f.linkText}function Q(b,a){if(b.eatSpace())return null;b.match(/^[^\s]+/,!0);void 0===b.peek()?a.linkTitle=!0:b.match(/^(?:\s+(?:"(?:[^"\\]|\\\\|\\.)+"|'(?:[^'\\]|\\\\|\\.)+'|\((?:[^)\\]|\\\\|\\.)+\)))?/,!0);a.f=a.inline=m;return f.linkHref+" url"}var n=h.getMode(v,"text/html"),x="null"==n.name;void 0===c.highlightFormatting&&(c.highlightFormatting=!1);void 0===c.maxBlockquoteDepth&&(c.maxBlockquoteDepth=0);void 0===c.underscoresBreakWords&&(c.underscoresBreakWords=
!0);void 0===c.taskLists&&(c.taskLists=!1);void 0===c.strikethrough&&(c.strikethrough=!1);void 0===c.tokenTypeOverrides&&(c.tokenTypeOverrides={});var f={header:"header",code:"comment",quote:"quote",list1:"variable-2",list2:"variable-3",list3:"keyword",hr:"hr",image:"image",imageAltText:"image-alt-text",imageMarker:"image-marker",formatting:"formatting",linkInline:"link",linkEmail:"link",linkText:"link",linkHref:"string",em:"em",strong:"strong",strikethrough:"strikethrough"},q;for(q in f)f.hasOwnProperty(q)&&
c.tokenTypeOverrides[q]&&(f[q]=c.tokenTypeOverrides[q]);var H=/^([*\-_])(?:\s*\1){2,}\s*$/,y=/^[*\-+]\s+/,z=/^[0-9]+([.)])\s+/,A=/^\[(x| )\](?=\s)/,E=c.allowAtxHeaderWithoutSpace?/^(#+)/:/^(#+)(?: |$)/,F=/^ *(?:\={1,}|-{1,})\s*$/,M=/^[^#!\[\]*_\\<>` "'(~]+/,I=new RegExp("^("+(!0===c.fencedCodeBlocks?"~~~+|```+":c.fencedCodeBlocks)+")[ \\t]*([\\w+#-]*)"),O={")":/^(?:[^\\\(\)]|\\.|\((?:[^\\\(\)]|\\.)*\))*?(?=\))/,"]":/^(?:[^\\\[\]]|\\.|\[(?:[^\\\[\\]]|\\.)*\])*?(?=\])/},D={startState:function(){return{f:p,
prevLine:null,thisLine:null,block:p,htmlState:null,indentation:0,inline:m,text:L,formatting:!1,linkText:!1,linkHref:!1,linkTitle:!1,code:0,em:!1,strong:!1,header:0,hr:!1,taskList:!1,list:!1,listStack:[],quote:0,trailingSpace:0,trailingSpaceNewLine:!1,strikethrough:!1,fencedChars:null}},copyState:function(b){return{f:b.f,prevLine:b.prevLine,thisLine:b.thisLine,block:b.block,htmlState:b.htmlState&&h.copyState(n,b.htmlState),indentation:b.indentation,localMode:b.localMode,localState:b.localMode?h.copyState(b.localMode,
b.localState):null,inline:b.inline,text:b.text,formatting:!1,linkTitle:b.linkTitle,code:b.code,em:b.em,strong:b.strong,strikethrough:b.strikethrough,header:b.header,hr:b.hr,taskList:b.taskList,list:b.list,listStack:b.listStack.slice(0),quote:b.quote,indentedCode:b.indentedCode,trailingSpace:b.trailingSpace,trailingSpaceNewLine:b.trailingSpaceNewLine,md_inside:b.md_inside,fencedChars:b.fencedChars}},token:function(b,a){a.formatting=!1;if(b!=a.thisLine){var c=a.header||a.hr;a.header=0;a.hr=!1;if(b.match(/^\s*$/,
!0)||c){w(a);if(!c)return null;a.prevLine=null}a.prevLine=a.thisLine;a.thisLine=b;a.taskList=!1;a.trailingSpace=0;a.trailingSpaceNewLine=!1;a.f=a.block;c=b.match(/^\s*/,!0)[0].replace(/\t/g,"    ").length;a.indentationDiff=Math.min(c-a.indentation,4);a.indentation+=a.indentationDiff;if(0<c)return null}return a.f(b,a)},innerMode:function(b){return b.block==u?{state:b.htmlState,mode:n}:b.localState?{state:b.localState,mode:b.localMode}:{state:b,mode:D}},blankLine:w,getType:d,closeBrackets:"()[]{}''\"\"``",
fold:"markdown"};return D},"xml");h.defineMIME("text/x-markdown","markdown")});
