'use strict';(function(e){"object"==typeof exports&&"object"==typeof module?e(require("../../lib/codemirror")):"function"==typeof define&&define.amd?define(["../../lib/codemirror"],e):e(CodeMirror)})(function(e){e.defineMode("haskell",function(e,t){function g(a,c,b){c(b);return b(a,c)}function f(a,c){if(a.eatWhile(l))return null;var b=a.next();if(u.test(b)){if("{"==b&&a.eat("-")){var d="comment";a.eat("#")&&(d="meta");return g(a,c,m(d,1))}return null}if("'"==b)return a.eat("\\"),a.next(),a.eat("'")?
"string":"string error";if('"'==b)return g(a,c,n);if(v.test(b))return a.eatWhile(p),a.eat(".")?"qualifier":"variable-2";if(w.test(b))return a.eatWhile(p),"variable";if(h.test(b)){if("0"==b){if(a.eat(/[xX]/))return a.eatWhile(x),"integer";if(a.eat(/[oO]/))return a.eatWhile(y),"number"}a.eatWhile(h);d="number";a.match(/^\.\d+/)&&(d="number");a.eat(/[eE]/)&&(d="number",a.eat(/[-+]/),a.eatWhile(h));return d}if("."==b&&a.eat("."))return"keyword";if(k.test(b)){if("-"==b&&a.eat(/-/)&&(a.eatWhile(/-/),!a.eat(k)))return a.skipToEnd(),
"comment";d="variable";":"==b&&(d="variable-2");a.eatWhile(k);return d}return"error"}function m(a,c){return 0==c?f:function(b,d){for(var e=c;!b.eol();){var q=b.next();if("{"==q&&b.eat("-"))++e;else if("-"==q&&b.eat("}")&&(--e,0==e))return d(f),a}d(m(a,e));return a}}function n(a,c){for(;!a.eol();){var b=a.next();if('"'==b)return c(f),"string";if("\\"==b){if(a.eol()||a.eat(l))return c(z),"string";a.eat("&")||a.next()}}c(f);return"string error"}function z(a,c){if(a.eat("\\"))return g(a,c,n);a.next();
c(f);return"error"}var w=/[a-z_]/,v=/[A-Z]/,h=/\d/,x=/[0-9A-Fa-f]/,y=/[0-7]/,p=/[a-z_A-Z0-9'\xa1-\uffff]/,k=/[-!#$%&*+.\/<=>?@\\^|~:]/,u=/[(),;[\]`{}]/,l=/[ \t\v\f]/,r=function(){function a(a){return function(){for(var b=0;b<arguments.length;b++)c[arguments[b]]=a}}var c={};a("keyword")("case","class","data","default","deriving","do","else","foreign","if","import","in","infix","infixl","infixr","instance","let","module","newtype","of","then","type","where","_");a("keyword")("..",":","::","=","\\",
"<-","->","@","~","=>");a("builtin")("!!","$!","$","&&","+","++","-",".","/","/=","<","<=","=<<","==",">",">=",">>",">>=","^","^^","||","*","**");a("builtin")("Bool","Bounded","Char","Double","EQ","Either","Enum","Eq","False","FilePath","Float","Floating","Fractional","Functor","GT","IO","IOError","Int","Integer","Integral","Just","LT","Left","Maybe","Monad","Nothing","Num","Ord","Ordering","Rational","Read","ReadS","Real","RealFloat","RealFrac","Right","Show","ShowS","String","True");a("builtin")("abs",
"acos","acosh","all","and","any","appendFile","asTypeOf","asin","asinh","atan","atan2","atanh","break","catch","ceiling","compare","concat","concatMap","const","cos","cosh","curry","cycle","decodeFloat","div","divMod","drop","dropWhile","either","elem","encodeFloat","enumFrom","enumFromThen","enumFromThenTo","enumFromTo","error","even","exp","exponent","fail","filter","flip","floatDigits","floatRadix","floatRange","floor","fmap","foldl","foldl1","foldr","foldr1","fromEnum","fromInteger","fromIntegral",
"fromRational","fst","gcd","getChar","getContents","getLine","head","id","init","interact","ioError","isDenormalized","isIEEE","isInfinite","isNaN","isNegativeZero","iterate","last","lcm","length","lex","lines","log","logBase","lookup","map","mapM","mapM_","max","maxBound","maximum","maybe","min","minBound","minimum","mod","negate","not","notElem","null","odd","or","otherwise","pi","pred","print","product","properFraction","putChar","putStr","putStrLn","quot","quotRem","read","readFile","readIO",
"readList","readLn","readParen","reads","readsPrec","realToFrac","recip","rem","repeat","replicate","return","reverse","round","scaleFloat","scanl","scanl1","scanr","scanr1","seq","sequence","sequence_","show","showChar","showList","showParen","showString","shows","showsPrec","significand","signum","sin","sinh","snd","span","splitAt","sqrt","subtract","succ","sum","tail","take","takeWhile","tan","tanh","toEnum","toInteger","toRational","truncate","uncurry","undefined","unlines","until","unwords",
"unzip","unzip3","userError","words","writeFile","zip","zip3","zipWith","zipWith3");var b=t.overrideKeywords;if(b)for(var d in b)b.hasOwnProperty(d)&&(c[d]=b[d]);return c}();return{startState:function(){return{f:f}},copyState:function(a){return{f:a.f}},token:function(a,c){var b=c.f(a,function(a){c.f=a});a=a.current();return r.hasOwnProperty(a)?r[a]:b},blockCommentStart:"{-",blockCommentEnd:"-}",lineComment:"--"}});e.defineMIME("text/x-haskell","haskell")});
