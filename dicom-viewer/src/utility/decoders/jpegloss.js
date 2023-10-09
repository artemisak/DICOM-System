(function(a){if("object"==typeof exports&&"undefined"!=typeof module)module.exports=a();else if("function"==typeof define&&define.amd)define([],a);else{var b;b="undefined"==typeof window?"undefined"==typeof global?"undefined"==typeof self?this:self:global:window,b.jpeg=a()}})(function(){return function b(c,d,e){function a(h,i){if(!d[h]){if(!c[h]){var j="function"==typeof require&&require;if(!i&&j)return j(h,!0);if(g)return g(h,!0);var k=new Error("Cannot find module '"+h+"'");throw k.code="MODULE_NOT_FOUND",k}var f=d[h]={exports:{}};c[h][0].call(f.exports,function(b){var d=c[h][1][b];return a(d?d:b)},f,f.exports,b,c,d,e)}return d[h].exports}for(var g="function"==typeof require&&require,f=0;f<e.length;f++)a(e[f]);return a}({1:[function(a,b){"use strict";var c=c||{};c.lossless=c.lossless||{},c.lossless.ComponentSpec=c.lossless.ComponentSpec||function(){this.hSamp=0,this.quantTableSel=0,this.vSamp=0};"undefined"!=typeof b&&b.exports&&(b.exports=c.lossless.ComponentSpec)},{}],2:[function(a,b){"use strict";var c=c||{};c.lossless=c.lossless||{},c.lossless.DataStream=c.lossless.DataStream||function(a,b,c){this.buffer=new Uint8Array(a,b,c),this.index=0},c.lossless.DataStream.prototype.get16=function(){var a=(this.buffer[this.index]<<8)+this.buffer[this.index+1];return this.index+=2,a},c.lossless.DataStream.prototype.get8=function(){var a=this.buffer[this.index];return this.index+=1,a};"undefined"!=typeof b&&b.exports&&(b.exports=c.lossless.DataStream)},{}],3:[function(a,b){"use strict";var c=c||{};c.lossless=c.lossless||{},c.lossless.DataStream=c.lossless.DataStream||("undefined"==typeof a?null:a("./data-stream.js")),c.lossless.HuffmanTable=c.lossless.HuffmanTable||("undefined"==typeof a?null:a("./huffman-table.js")),c.lossless.QuantizationTable=c.lossless.QuantizationTable||("undefined"==typeof a?null:a("./quantization-table.js")),c.lossless.ScanHeader=c.lossless.ScanHeader||("undefined"==typeof a?null:a("./scan-header.js")),c.lossless.FrameHeader=c.lossless.FrameHeader||("undefined"==typeof a?null:a("./frame-header.js")),c.lossless.Utils=c.lossless.Utils||("undefined"==typeof a?null:a("./utils.js")),c.lossless.Decoder=c.lossless.Decoder||function(a,b){this.buffer=a,this.frame=new c.lossless.FrameHeader,this.huffTable=new c.lossless.HuffmanTable,this.quantTable=new c.lossless.QuantizationTable,this.scan=new c.lossless.ScanHeader,this.DU=c.lossless.Utils.createArray(10,4,64),this.HuffTab=c.lossless.Utils.createArray(4,2,12800),this.IDCT_Source=[],this.nBlock=[],this.acTab=c.lossless.Utils.createArray(10,1),this.dcTab=c.lossless.Utils.createArray(10,1),this.qTab=c.lossless.Utils.createArray(10,1),this.marker=0,this.markerIndex=0,this.numComp=0,this.restartInterval=0,this.selection=0,this.xDim=0,this.yDim=0,this.xLoc=0,this.yLoc=0,this.numBytes=0,this.outputData=null,this.restarting=!1,this.mask=0,"undefined"!=typeof b&&(this.numBytes=b)},c.lossless.Decoder.IDCT_P=[0,5,40,16,45,2,7,42,21,56,8,61,18,47,1,4,41,23,58,13,32,24,37,10,63,17,44,3,6,43,20,57,15,34,29,48,53,26,39,9,60,19,46,22,59,12,33,31,50,55,25,36,11,62,14,35,28,49,52,27,38,30,51,54],c.lossless.Decoder.TABLE=[0,1,5,6,14,15,27,28,2,4,7,13,16,26,29,42,3,8,12,17,25,30,41,43,9,11,18,24,31,40,44,53,10,19,23,32,39,45,52,54,20,22,33,38,46,51,55,60,21,34,37,47,50,56,59,61,35,36,48,49,57,58,62,63],c.lossless.Decoder.MAX_HUFFMAN_SUBTREE=50,c.lossless.Decoder.MSB=2147483648,c.lossless.Decoder.RESTART_MARKER_BEGIN=65488,c.lossless.Decoder.RESTART_MARKER_END=65495,c.lossless.Decoder.prototype.decompress=function(a,b,c){return this.decode(a,b,c).buffer},c.lossless.Decoder.prototype.decode=function(a,b,d,e){var f,g,h,j,k=0,l=[],m=[],n=[];if("undefined"!=typeof a&&(this.buffer=a),"undefined"!=typeof e&&(this.numBytes=e),this.stream=new c.lossless.DataStream(this.buffer,b,d),this.buffer=null,this.xLoc=0,this.yLoc=0,f=this.stream.get16(),65496!==f)throw new Error("Not a JPEG file");for(f=this.stream.get16();4092!=f>>4||65476===f;){switch(f){case 65476:this.huffTable.read(this.stream,this.HuffTab);break;case 65484:throw new Error("Program doesn't support arithmetic coding. (format throw new IOException)");case 65499:this.quantTable.read(this.stream,c.lossless.Decoder.TABLE);break;case 65501:this.restartInterval=this.readNumber();break;case 65504:case 65505:case 65506:case 65507:case 65508:case 65509:case 65510:case 65511:case 65512:case 65513:case 65514:case 65515:case 65516:case 65517:case 65518:case 65519:this.readApp();break;case 65534:this.readComment();break;default:if(255!=f>>8)throw new Error("ERROR: format throw new IOException! (decode)");}f=this.stream.get16()}if(65472>f||65479<f)throw new Error("ERROR: could not handle arithmetic code!");this.frame.read(this.stream),f=this.stream.get16();do{for(;65498!==f;){switch(f){case 65476:this.huffTable.read(this.stream,this.HuffTab);break;case 65484:throw new Error("Program doesn't support arithmetic coding. (format throw new IOException)");case 65499:this.quantTable.read(this.stream,c.lossless.Decoder.TABLE);break;case 65501:this.restartInterval=this.readNumber();break;case 65504:case 65505:case 65506:case 65507:case 65508:case 65509:case 65510:case 65511:case 65512:case 65513:case 65514:case 65515:case 65516:case 65517:case 65518:case 65519:this.readApp();break;case 65534:this.readComment();break;default:if(255!=f>>8)throw new Error("ERROR: format throw new IOException! (Parser.decode)");}f=this.stream.get16()}switch(this.precision=this.frame.precision,this.components=this.frame.components,this.numBytes||(this.numBytes=parseInt(Math.ceil(this.precision/8))),this.mask=1==this.numBytes?255:65535,this.scan.read(this.stream),this.numComp=this.scan.numComp,this.selection=this.scan.selection,1===this.numBytes?3===this.numComp?(this.getter=this.getValueRGB,this.setter=this.setValueRGB,this.output=this.outputRGB):(this.getter=this.getValue8,this.setter=this.setValue8,this.output=this.outputSingle):(this.getter=this.getValue16,this.setter=this.setValue16,this.output=this.outputSingle),this.selection){case 2:this.selector=this.select2;break;case 3:this.selector=this.select3;break;case 4:this.selector=this.select4;break;case 5:this.selector=this.select5;break;case 6:this.selector=this.select6;break;case 7:this.selector=this.select7;break;default:this.selector=this.select1;}for(this.scanComps=this.scan.components,this.quantTables=this.quantTable.quantTables,g=0;g<this.numComp;g+=1)h=this.scanComps[g].scanCompSel,this.qTab[g]=this.quantTables[this.components[h].quantTableSel],this.nBlock[g]=this.components[h].vSamp*this.components[h].hSamp,this.dcTab[g]=this.HuffTab[this.scanComps[g].dcTabSel][0],this.acTab[g]=this.HuffTab[this.scanComps[g].acTabSel][1];for(this.xDim=this.frame.dimX,this.yDim=this.frame.dimY,this.outputData=1==this.numBytes?new Uint8Array(new ArrayBuffer(this.xDim*this.yDim*this.numBytes*this.numComp)):new Uint16Array(new ArrayBuffer(this.xDim*this.yDim*this.numBytes*this.numComp)),k+=1;;){for(m[0]=0,n[0]=0,g=0;10>g;g+=1)l[g]=1<<this.precision-1;if(0===this.restartInterval){for(f=this.decodeUnit(l,m,n);0===f&&this.xLoc<this.xDim&&this.yLoc<this.yDim;)this.output(l),f=this.decodeUnit(l,m,n);break}for(j=0;j<this.restartInterval&&(this.restarting=0==j,f=this.decodeUnit(l,m,n),this.output(l),0===f);j+=1);if(0===f&&(0===this.markerIndex?f=this.stream.get16():(f=65280|this.marker,this.markerIndex=0)),!(f>=c.lossless.Decoder.RESTART_MARKER_BEGIN&&f<=c.lossless.Decoder.RESTART_MARKER_END))break}65500===f&&1===k&&(this.readNumber(),f=this.stream.get16())}while(65497!==f&&this.xLoc<this.xDim&&this.yLoc<this.yDim&&0===k);return this.outputData},c.lossless.Decoder.prototype.decodeUnit=function(a,b,c){return 1==this.numComp?this.decodeSingle(a,b,c):3==this.numComp?this.decodeRGB(a,b,c):-1},c.lossless.Decoder.prototype.select1=function(a){return this.getPreviousX(a)},c.lossless.Decoder.prototype.select2=function(a){return this.getPreviousY(a)},c.lossless.Decoder.prototype.select3=function(a){return this.getPreviousXY(a)},c.lossless.Decoder.prototype.select4=function(a){return this.getPreviousX(a)+this.getPreviousY(a)-this.getPreviousXY(a)},c.lossless.Decoder.prototype.select5=function(a){return this.getPreviousX(a)+(this.getPreviousY(a)-this.getPreviousXY(a)>>1)},c.lossless.Decoder.prototype.select6=function(a){return this.getPreviousY(a)+(this.getPreviousX(a)-this.getPreviousXY(a)>>1)},c.lossless.Decoder.prototype.select7=function(a){return(this.getPreviousX(a)+this.getPreviousY(a))/2},c.lossless.Decoder.prototype.decodeRGB=function(a,b,d){var e,f,g,h,l,m,n,o;for(a[0]=this.selector(0),a[1]=this.selector(1),a[2]=this.selector(2),l=0;l<this.numComp;l+=1)for(h=this.qTab[l],f=this.acTab[l],g=this.dcTab[l],m=0;m<this.nBlock[l];m+=1){for(n=0;n<this.IDCT_Source.length;n+=1)this.IDCT_Source[n]=0;if(e=this.getHuffmanValue(g,b,d),65280<=e)return e;for(a[l]=this.IDCT_Source[0]=a[l]+this.getn(d,e,b,d),this.IDCT_Source[0]*=h[0],o=1;64>o;o+=1){if(e=this.getHuffmanValue(f,b,d),65280<=e)return e;if(o+=e>>4,0!=(15&e))this.IDCT_Source[c.lossless.Decoder.IDCT_P[o]]=this.getn(d,15&e,b,d)*h[o];else if(0==e>>4)break}}return 0},c.lossless.Decoder.prototype.decodeSingle=function(a,b,d){var e,f,g,h;for(this.restarting?(this.restarting=!1,a[0]=1<<this.frame.precision-1):a[0]=this.selector(),f=0;f<this.nBlock[0];f+=1){if(e=this.getHuffmanValue(this.dcTab[0],b,d),65280<=e)return e;if(g=this.getn(a,e,b,d),h=g>>8,h>=c.lossless.Decoder.RESTART_MARKER_BEGIN&&h<=c.lossless.Decoder.RESTART_MARKER_END)return h;a[0]+=g}return 0},c.lossless.Decoder.prototype.getHuffmanValue=function(a,b,d){var e,f,g;if(g=65535,8>d[0]?(b[0]<<=8,f=this.stream.get8(),255===f&&(this.marker=this.stream.get8(),0!==this.marker&&(this.markerIndex=9)),b[0]|=f):d[0]-=8,e=a[b[0]>>d[0]],0!=(e&c.lossless.Decoder.MSB)){if(0!==this.markerIndex)return this.markerIndex=0,65280|this.marker;b[0]&=g>>16-d[0],b[0]<<=8,f=this.stream.get8(),255===f&&(this.marker=this.stream.get8(),0!==this.marker&&(this.markerIndex=9)),b[0]|=f,e=a[256*(255&e)+(b[0]>>d[0])],d[0]+=8}if(d[0]+=8-(e>>8),0>d[0])throw new Error("index="+d[0]+" temp="+b[0]+" code="+e+" in HuffmanValue()");return d[0]<this.markerIndex?(this.markerIndex=0,65280|this.marker):(b[0]&=g>>16-d[0],255&e)},c.lossless.Decoder.prototype.getn=function(a,b,c,d){var e,f,g,h,i;if(f=1,g=-1,h=65535,0===b)return 0;if(16===b)return 0<=a[0]?-32768:32768;if(d[0]-=b,0<=d[0]){if(d[0]<this.markerIndex&&!this.isLastPixel())return this.markerIndex=0,(65280|this.marker)<<8;e=c[0]>>d[0],c[0]&=h>>16-d[0]}else{if(c[0]<<=8,i=this.stream.get8(),255===i&&(this.marker=this.stream.get8(),0!==this.marker&&(this.markerIndex=9)),c[0]|=i,d[0]+=8,0>d[0]){if(0!==this.markerIndex)return this.markerIndex=0,(65280|this.marker)<<8;c[0]<<=8,i=this.stream.get8(),255===i&&(this.marker=this.stream.get8(),0!==this.marker&&(this.markerIndex=9)),c[0]|=i,d[0]+=8}if(0>d[0])throw new Error("index="+d[0]+" in getn()");if(d[0]<this.markerIndex)return this.markerIndex=0,(65280|this.marker)<<8;e=c[0]>>d[0],c[0]&=h>>16-d[0]}return e<f<<b-1&&(e+=(g<<b)+1),e},c.lossless.Decoder.prototype.getPreviousX=function(a){return 0<this.xLoc?this.getter(this.yLoc*this.xDim+this.xLoc-1,a):0<this.yLoc?this.getPreviousY(a):1<<this.frame.precision-1},c.lossless.Decoder.prototype.getPreviousXY=function(a){return 0<this.xLoc&&0<this.yLoc?this.getter((this.yLoc-1)*this.xDim+this.xLoc-1,a):this.getPreviousY(a)},c.lossless.Decoder.prototype.getPreviousY=function(a){return 0<this.yLoc?this.getter((this.yLoc-1)*this.xDim+this.xLoc,a):this.getPreviousX(a)},c.lossless.Decoder.prototype.isLastPixel=function(){return this.xLoc===this.xDim-1&&this.yLoc===this.yDim-1},c.lossless.Decoder.prototype.outputSingle=function(a){this.xLoc<this.xDim&&this.yLoc<this.yDim&&(this.setter(this.yLoc*this.xDim+this.xLoc,this.mask&a[0]),this.xLoc+=1,this.xLoc>=this.xDim&&(this.yLoc+=1,this.xLoc=0))},c.lossless.Decoder.prototype.outputRGB=function(a){var b=this.yLoc*this.xDim+this.xLoc;this.xLoc<this.xDim&&this.yLoc<this.yDim&&(this.setter(b,a[0],0),this.setter(b,a[1],1),this.setter(b,a[2],2),this.xLoc+=1,this.xLoc>=this.xDim&&(this.yLoc+=1,this.xLoc=0))},c.lossless.Decoder.prototype.setValue8=function(a,b){this.outputData[a]=b},c.lossless.Decoder.prototype.getValue8=function(a){return this.outputData[a]};var d=function(){var a=new ArrayBuffer(2);return new DataView(a).setInt16(0,256,!0),256===new Int16Array(a)[0]}();d?(c.lossless.Decoder.prototype.setValue16=c.lossless.Decoder.prototype.setValue8,c.lossless.Decoder.prototype.getValue16=c.lossless.Decoder.prototype.getValue8):(c.lossless.Decoder.prototype.setValue16=function(a,b){this.outputData[a]=(255&b)<<8|255&b>>8},c.lossless.Decoder.prototype.getValue16=function(a){var b=this.outputData[a];return(255&b)<<8|255&b>>8}),c.lossless.Decoder.prototype.setValueRGB=function(a,b,c){this.outputData[3*a+c]=b},c.lossless.Decoder.prototype.getValueRGB=function(a,b){return this.outputData[3*a+b]},c.lossless.Decoder.prototype.readApp=function(){var a=0,b=this.stream.get16();for(a+=2;a<b;)this.stream.get8(),a+=1;return b},c.lossless.Decoder.prototype.readComment=function(){var a,b="",c=0;for(a=this.stream.get16(),c+=2;c<a;)b+=this.stream.get8(),c+=1;return b},c.lossless.Decoder.prototype.readNumber=function(){var a=this.stream.get16();if(4!==a)throw new Error("ERROR: Define number format throw new IOException [Ld!=4]");return this.stream.get16()};"undefined"!=typeof b&&b.exports&&(b.exports=c.lossless.Decoder)},{"./data-stream.js":2,"./frame-header.js":4,"./huffman-table.js":5,"./quantization-table.js":7,"./scan-header.js":9,"./utils.js":10}],4:[function(a,b){"use strict";var d=d||{};d.lossless=d.lossless||{},d.lossless.ComponentSpec=d.lossless.ComponentSpec||("undefined"==typeof a?null:a("./component-spec.js")),d.lossless.DataStream=d.lossless.DataStream||("undefined"==typeof a?null:a("./data-stream.js")),d.lossless.FrameHeader=d.lossless.FrameHeader||function(){this.components=[],this.dimX=0,this.dimY=0,this.numComp=0,this.precision=0},d.lossless.FrameHeader.prototype.read=function(a){var b,e,f,g,h=0;for(b=a.get16(),h+=2,this.precision=a.get8(),h+=1,this.dimY=a.get16(),h+=2,this.dimX=a.get16(),h+=2,this.numComp=a.get8(),h+=1,e=1;e<=this.numComp;e+=1){if(h>b)throw new Error("ERROR: frame format error");if(f=a.get8(),h+=1,h>=b)throw new Error("ERROR: frame format error [c>=Lf]");g=a.get8(),h+=1,this.components[f]||(this.components[f]=new d.lossless.ComponentSpec),this.components[f].hSamp=g>>4,this.components[f].vSamp=15&g,this.components[f].quantTableSel=a.get8(),h+=1}if(h!==b)throw new Error("ERROR: frame format error [Lf!=count]");return 1};"undefined"!=typeof b&&b.exports&&(b.exports=d.lossless.FrameHeader)},{"./component-spec.js":1,"./data-stream.js":2}],5:[function(a,b){"use strict";var c=c||{};c.lossless=c.lossless||{},c.lossless.DataStream=c.lossless.DataStream||("undefined"==typeof a?null:a("./data-stream.js")),c.lossless.Utils=c.lossless.Utils||("undefined"==typeof a?null:a("./utils.js")),c.lossless.HuffmanTable=c.lossless.HuffmanTable||function(){this.l=c.lossless.Utils.createArray(4,2,16),this.th=[],this.v=c.lossless.Utils.createArray(4,2,16,200),this.tc=c.lossless.Utils.createArray(4,2),this.tc[0][0]=0,this.tc[1][0]=0,this.tc[2][0]=0,this.tc[3][0]=0,this.tc[0][1]=0,this.tc[1][1]=0,this.tc[2][1]=0,this.tc[3][1]=0,this.th[0]=0,this.th[1]=0,this.th[2]=0,this.th[3]=0},c.lossless.HuffmanTable.MSB=2147483648,c.lossless.HuffmanTable.prototype.read=function(a,b){var d,e,f,g,h,k,l=0;for(d=a.get16(),l+=2;l<d;){if(e=a.get8(),l+=1,f=15&e,3<f)throw new Error("ERROR: Huffman table ID > 3");if(g=e>>4,2<g)throw new Error("ERROR: Huffman table [Table class > 2 ]");for(this.th[f]=1,this.tc[f][g]=1,h=0;16>h;h+=1)this.l[f][g][h]=a.get8(),l+=1;for(h=0;16>h;h+=1)for(k=0;k<this.l[f][g][h];k+=1){if(l>d)throw new Error("ERROR: Huffman table format error [count>Lh]");this.v[f][g][h][k]=a.get8(),l+=1}}if(l!==d)throw new Error("ERROR: Huffman table format error [count!=Lf]");for(h=0;4>h;h+=1)for(k=0;2>k;k+=1)0!==this.tc[h][k]&&this.buildHuffTable(b[h][k],this.l[h][k],this.v[h][k]);return 1},c.lossless.HuffmanTable.prototype.buildHuffTable=function(a,b,d){var e,f,g,h,l,m;for(f=256,g=0,h=0;8>h;h+=1)for(l=0;l<b[h];l+=1)for(m=0;m<f>>h+1;m+=1)a[g]=d[h][l]|h+1<<8,g+=1;for(h=1;256>g;h+=1,g+=1)a[g]=h|c.lossless.HuffmanTable.MSB;for(e=1,g=0,h=8;16>h;h+=1)for(l=0;l<b[h];l+=1){for(m=0;m<f>>h-7;m+=1)a[256*e+g]=d[h][l]|h+1<<8,g+=1;if(256<=g){if(256<g)throw new Error("ERROR: Huffman table error(1)!");g=0,e+=1}}};"undefined"!=typeof b&&b.exports&&(b.exports=c.lossless.HuffmanTable)},{"./data-stream.js":2,"./utils.js":10}],6:[function(a,b){"use strict";var c=c||{};c.lossless=c.lossless||{},c.lossless.ComponentSpec=c.lossless.ComponentSpec||("undefined"==typeof a?null:a("./component-spec.js")),c.lossless.DataStream=c.lossless.DataStream||("undefined"==typeof a?null:a("./data-stream.js")),c.lossless.Decoder=c.lossless.Decoder||("undefined"==typeof a?null:a("./decoder.js")),c.lossless.FrameHeader=c.lossless.FrameHeader||("undefined"==typeof a?null:a("./frame-header.js")),c.lossless.HuffmanTable=c.lossless.HuffmanTable||("undefined"==typeof a?null:a("./huffman-table.js")),c.lossless.QuantizationTable=c.lossless.QuantizationTable||("undefined"==typeof a?null:a("./quantization-table.js")),c.lossless.ScanComponent=c.lossless.ScanComponent||("undefined"==typeof a?null:a("./scan-component.js")),c.lossless.ScanHeader=c.lossless.ScanHeader||("undefined"==typeof a?null:a("./scan-header.js")),c.lossless.Utils=c.lossless.Utils||("undefined"==typeof a?null:a("./utils.js"));"undefined"!=typeof b&&b.exports&&(b.exports=c)},{"./component-spec.js":1,"./data-stream.js":2,"./decoder.js":3,"./frame-header.js":4,"./huffman-table.js":5,"./quantization-table.js":7,"./scan-component.js":8,"./scan-header.js":9,"./utils.js":10}],7:[function(a,b){"use strict";var c=c||{};c.lossless=c.lossless||{},c.lossless.DataStream=c.lossless.DataStream||("undefined"==typeof a?null:a("./data-stream.js")),c.lossless.Utils=c.lossless.Utils||("undefined"==typeof a?null:a("./utils.js")),c.lossless.QuantizationTable=c.lossless.QuantizationTable||function(){this.precision=[],this.tq=[],this.quantTables=c.lossless.Utils.createArray(4,64),this.tq[0]=0,this.tq[1]=0,this.tq[2]=0,this.tq[3]=0},c.lossless.QuantizationTable.enhanceQuantizationTable=function(a,b){var c;for(c=0;8>c;c+=1)a[b[0+c]]*=90,a[b[32+c]]*=90,a[b[16+c]]*=118,a[b[48+c]]*=49,a[b[40+c]]*=71,a[b[8+c]]*=126,a[b[56+c]]*=25,a[b[24+c]]*=106;for(c=0;8>c;c+=1)a[b[0+8*c]]*=90,a[b[4+8*c]]*=90,a[b[2+8*c]]*=118,a[b[6+8*c]]*=49,a[b[5+8*c]]*=71,a[b[1+8*c]]*=126,a[b[7+8*c]]*=25,a[b[3+8*c]]*=106;for(c=0;64>c;c+=1)a[c]>>=6},c.lossless.QuantizationTable.prototype.read=function(a,b){var d,e,f,g,h=0;for(d=a.get16(),h+=2;h<d;){if(e=a.get8(),h+=1,f=15&e,3<f)throw new Error("ERROR: Quantization table ID > 3");if(this.precision[f]=e>>4,0===this.precision[f])this.precision[f]=8;else if(1===this.precision[f])this.precision[f]=16;else throw new Error("ERROR: Quantization table precision error");if(this.tq[f]=1,8===this.precision[f]){for(g=0;64>g;g+=1){if(h>d)throw new Error("ERROR: Quantization table format error");this.quantTables[f][g]=a.get8(),h+=1}c.lossless.QuantizationTable.enhanceQuantizationTable(this.quantTables[f],b)}else{for(g=0;64>g;g+=1){if(h>d)throw new Error("ERROR: Quantization table format error");this.quantTables[f][g]=a.get16(),h+=2}c.lossless.QuantizationTable.enhanceQuantizationTable(this.quantTables[f],b)}}if(h!==d)throw new Error("ERROR: Quantization table error [count!=Lq]");return 1};"undefined"!=typeof b&&b.exports&&(b.exports=c.lossless.QuantizationTable)},{"./data-stream.js":2,"./utils.js":10}],8:[function(a,b){"use strict";var c=c||{};c.lossless=c.lossless||{},c.lossless.ScanComponent=c.lossless.ScanComponent||function(){this.acTabSel=0,this.dcTabSel=0,this.scanCompSel=0};"undefined"!=typeof b&&b.exports&&(b.exports=c.lossless.ScanComponent)},{}],9:[function(a,b){"use strict";var c=c||{};c.lossless=c.lossless||{},c.lossless.DataStream=c.lossless.DataStream||("undefined"==typeof a?null:a("./data-stream.js")),c.lossless.ScanComponent=c.lossless.ScanComponent||("undefined"==typeof a?null:a("./scan-component.js")),c.lossless.ScanHeader=c.lossless.ScanHeader||function(){this.ah=0,this.al=0,this.numComp=0,this.selection=0,this.spectralEnd=0,this.components=[]},c.lossless.ScanHeader.prototype.read=function(a){var b,d,e,f=0;for(b=a.get16(),f+=2,this.numComp=a.get8(),f+=1,d=0;d<this.numComp;d+=1){if(this.components[d]=new c.lossless.ScanComponent,f>b)throw new Error("ERROR: scan header format error");this.components[d].scanCompSel=a.get8(),f+=1,e=a.get8(),f+=1,this.components[d].dcTabSel=e>>4,this.components[d].acTabSel=15&e}if(this.selection=a.get8(),f+=1,this.spectralEnd=a.get8(),f+=1,e=a.get8(),this.ah=e>>4,this.al=15&e,f+=1,f!==b)throw new Error("ERROR: scan header format error [count!=Ns]");return 1};"undefined"!=typeof b&&b.exports&&(b.exports=c.lossless.ScanHeader)},{"./data-stream.js":2,"./scan-component.js":8}],10:[function(a,b){"use strict";var c=c||{};c.lossless=c.lossless||{},c.lossless.Utils=c.lossless.Utils||{},c.lossless.Utils.createArray=function(a){var b=Array(a||0),d=a;if(1<arguments.length)for(var e=Array.prototype.slice.call(arguments,1);d--;)b[a-1-d]=c.lossless.Utils.createArray.apply(this,e);return b},c.lossless.Utils.makeCRCTable=function(){for(var a,b=[],d=0;256>d;d++){a=d;for(var e=0;8>e;e++)a=1&a?3988292384^a>>>1:a>>>1;b[d]=a}return b},c.lossless.Utils.crc32=function(a){for(var b=new Uint8Array(a.buffer),d=c.lossless.Utils.crcTable||(c.lossless.Utils.crcTable=c.lossless.Utils.makeCRCTable()),e=-1,f=0;f<b.length;f++)e=e>>>8^d[255&(e^b[f])];return(-1^e)>>>0};"undefined"!=typeof b&&b.exports&&(b.exports=c.lossless.Utils)},{}]},{},[6])(6)}),self.addEventListener("message",function(a){var b=a.data.bitsAllocated/8,c=new Uint8Array(a.data.buffer),d=new jpeg.lossless.Decoder,e=d.decode(c.buffer,0,c.buffer.byteLength,b),f=null;8===a.data.bitsAllocated?a.data.isSigned?f=new Int8Array(e.buffer):f=new Uint8Array(e.buffer):16===a.data.bitsAllocated&&(a.data.isSigned?f=new Int16Array(e.buffer):f=new Uint16Array(e.buffer)),self.postMessage([f])},!1);