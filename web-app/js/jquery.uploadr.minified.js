/**
 *  Uploadr, a multi-file uploader plugin
 *  Copyright (C) 2011 Jeroen Wesbeek
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *  http://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 *
 *  $Author$
 *  $Rev$
 *  $Date$
 */
(function(b){var a={playNotification:function(c){if(c.workvars.notificationSoundEffect){c.workvars.notificationSoundEffect.play()}},playError:function(c){if(c.workvars.errorSoundEffect){c.workvars.errorSoundEffect.play()}},playDelete:function(c){if(c.workvars.deleteSoundEffect){c.workvars.deleteSoundEffect.play()}},cancel:function(c){if(c.preventDefault){c.preventDefault();c.stopPropagation()}return false},dragOver:function(c){a.cancel(c)},dragEnter:function(e,f,d,g,c){f.addClass(g);a.cancel(e,f,d,g,c);if(!c.workvars.gotFiles){b(".placeholder",f).hide()}},dragLeave:function(e,f,d,g,c){if(e.target&&e.target==f[0]){f.removeClass(g)}a.cancel(e);b(".placeholder",f).html(c.placeholderText);if(!c.workvars.gotFiles){b(".placeholder",f).show()}},addFile:function(d,f,c){var g=a.addFileElements(d,f,c,false);var e=b(g);if(f.fileColor){b(".progress",e).css("background-color",f.fileColor)}a.onProgressHandler(e,f,100,c.labelDone,"",c);b(".placeholder",d).hide();c.workvars.gotFiles=true;a.addButtons(f,e,c)},addFileElements:function(r,w,f,u){var c=(f.id+"File"+f.workvars.files.length);var s=document.createElement("div");s.setAttribute("class","file");var q=document.createElement("div");q.setAttribute("class","background");var g=document.createElement("div");g.setAttribute("class","progress");var k=document.createElement("div");k.setAttribute("class","info");var d=document.createElement("div");d.setAttribute("class","details");var v=document.createElement("div");v.setAttribute("class","buttons");var l=document.createElement("div");l.setAttribute("class","voting");var p=document.createElement("div");p.setAttribute("class","controls");p.appendChild(v);p.appendChild(l);var h=document.createElement("div");h.setAttribute("class","spinner");h.style.display="none";var j=document.createElement("div");j.setAttribute("class","name");j.setAttribute("id",c);var t=document.createElement("span");t.setAttribute("class","fileName");t.innerHTML=a.shortenFileName(f.maxFileNameLength,w.fileName);var e=document.createElement("div");e.setAttribute("class","size");e.innerHTML=a.bytesToSize(w.fileSize);var o=document.createElement("div");o.setAttribute("class","percentage");o.innerHTML=((u)?"0%":f.labelDone);var n=document.createElement("div");n.setAttribute("class","rating");var m=document.createElement("div");m.setAttribute("class","speed");k.appendChild(d);k.appendChild(p);k.appendChild(h);j.appendChild(t);d.appendChild(j);d.appendChild(e);d.appendChild(o);d.appendChild(m);d.appendChild(n);s.appendChild(q);s.appendChild(g);s.appendChild(k);var i=b(".files",r)[0];if(f.insertDirection=="down"){i.appendChild(s)}else{i.insertBefore(s,i.childNodes[0])}a.addFileTooltip(b(".fileName",b("#"+c)),w);if(f.insertDirection=="up"){f.workvars.files.unshift(s);if(f.workvars.viewing>0){f.workvars.viewing++}}else{if(!(f.workvars.files.length>0&&f.workvars.viewing<(f.workvars.files.length-1))){f.workvars.viewing=f.workvars.files.length}f.workvars.files.push(s)}a.handlePagination(r,f);return s},removeFileElement:function(d,c){var e=d.parent();a.playDelete(c);d.animate({height:"0px"},200,"swing",function(){for(var f=0;f<c.workvars.files.length;f++){if(c.workvars.files[f]==d.get(0)){c.workvars.files.splice(f,1);break}}if(c.insertDirection=="up"){c.workvars.viewing=(f>0)?f-1:0}else{c.workvars.viewing=(f>(c.workvars.files.length-1))?(c.workvars.files.length-1):f}d.remove();if(b(".info",e).size()<1){b(".placeholder",e).show()}a.handlePagination(c.workvars.uploadrDiv,c)})},handleBadge:function(d,c){c.workvars.uploading+=d;if(c.workvars.uploading<0){c.workvars.uploading=0}var f=c.workvars.badgeDiv,e=c.workvars.uploading;f.html(e);var g=(e==1)?c.badgeTooltipSingular:c.badgeTooltipPlural;f.tipTip({content:g.replace("%d",e)});if(e<1&&d<0){f.animate({opacity:0},{duration:1000})}else{if(e==1&&d>0){f.animate({opacity:1},{duration:700});f.unbind("hover")}}},handlePagination:function(d,p){var f,e,i,n,l,m,k,o,h,j=b(".pagination",d),g="",c=p.workvars.files;if(p.maxVisible==0){if(j.is(":visible")){j.hide()}return}if(c.length>p.maxVisible||j.is(":visible")){e=Math.ceil(c.length/p.maxVisible);i=Math.ceil((p.workvars.viewing+1)/p.maxVisible);m=((p.maxVisible*i)-1);l=(m-p.maxVisible+1);for(n=0;n<c.length;n++){f=b(c[n]);if(n<l||n>m){if(f.is(":visible")){f.hide()}}else{if(f.is(":hidden")){f.show()}}}}if(!i||!e||e==1){if(j.is(":visible")){j.hide()}}else{k=p.workvars.prevButton;o=p.workvars.nextButton;h=p.workvars.pagesDiv;if(j.is(":hidden")){j.show()}for(n=1;n<=e;n++){g+="<li"+((n==i)?' class="current"':"")+">"+n+"</li>"}h.html(g);if(i==1){k.hide();o.show()}else{if(i==e){k.show();o.hide()}else{k.show();o.show()}}}},addFileTooltip:function(d,e){var c=new Date();c.setTime(e.fileDate);d.tipTip({content:"name: "+e.fileName+"<br/>size: "+a.bytesToSize(e.fileSize)+((e.fileDate)?("<br/>date: "+c.toString()):""),maxWidth:600})},drop:function(g,h,e,i,d){var f=g.dataTransfer.files;var c=h;c.removeClass(i);if(g.preventDefault){g.preventDefault();g.stopPropagation()}if(typeof f!=="undefined"){b(".placeholder",h).hide();d.workvars.gotFiles=true;b.each(f,function(j,k){var l={fileName:((k.name)?k.name:k.fileName),fileSize:((k.size)?k.size:k.fileSize),startTime:new Date().getTime(),fileRating:0,deletable:true};var m=a.addFileElements(e,l,d);a.startUpload(k,l,b(m),d)})}return false},startUpload:function(d,g,c,j){var e="";a.handleBadge(1,j);j.onStart(g);var i=new XMLHttpRequest(),k=i.upload,f=b(".progress",c);if(j.maxSize&&(((d.fileSize)?d.fileSize:d.size)>j.maxSize)){a.playError(j);if(j.onProgress(g,c,100)){a.onProgressHandler(c,g,100,j.labelFileTooLarge,"",j,true);var h=j.fileTooLargeText.replace("%s",a.bytesToSize(((d.fileSize)?d.fileSize:d.size)));h=h.replace("%s",a.bytesToSize(j.maxSize));b("div.percentage",c).tipTip({content:h,maxWidth:600});a.handleBadge(-1,j);a.addButton(c,"delete",j.removeFromViewText,"",j,function(){a.removeFileElement(c,j)});g.failed=true}f.addClass("failed");return false}a.addButton(c,"cancel",j.fileAbortText,j.fileAbortConfirm,j,function(l){e="abort";i.abort()});k.addEventListener("progress",function(l){if(j.onProgress(g,c,Math.ceil((l.loaded/l.total)*100))){a.onProgressHandler(c,g,Math.ceil((l.loaded/l.total)*100),"","",j)}},false);k.addEventListener("error",function(l){a.playError(j);if(j.onProgress(g,c,100)){a.onProgressHandler(c,g,100,j.labelFailed,"",j,true);a.handleBadge(-1,j)}f.addClass("failed");a.addButton(c,"delete",j.removeFromViewText,"",j,function(){a.removeFileElement(c,j)})},false);k.addEventListener("abort",function(l){a.playError(j);if(j.onProgress(g,c,100)){a.onProgressHandler(c,g,100,j.labelAborted,"",j,true)}f.addClass("failed");j.onAbort(g,c);a.addButton(c,"delete",j.removeFromViewText,"",j,function(){a.removeFileElement(c,j)})},false);i.onreadystatechange=function(){if(i.readyState!=4){return}var l=(i.responseText)?JSON.parse(i.responseText):{};if(l.fileName&&g.fileName!=l.fileName){g.fileName=l.fileName;a.addFileTooltip(b(".fileName",c).html(a.shortenFileName(j.maxFileNameLength,l.fileName)),g)}if(i.status==200){if(j.onProgress(g,c,100)){a.onProgressHandler(c,g,100,"","",j)}var m=b(".spinner",c);m.show("slow");j.onSuccess(g,c,function(){m.hide();a.onProgressHandler(c,g,100,j.labelDone,"",j);a.playNotification(j);a.handleBadge(-1,j);a.addButtons(g,c,j)})}else{a.playError(j);if(j.onProgress(g,c,100)){a.onProgressHandler(c,g,100,j.labelFailed,l.statusText,j);a.handleBadge(-1,j)}f.addClass("failed");j.onFailure(g,c);if(e!="abort"){j.onDelete(g,c)}return}};i.open("POST",j.uri);i.setRequestHeader("Cache-Control","no-cache");i.setRequestHeader("X-Requested-With","XMLHttpRequest");i.setRequestHeader("X-File-Name",(d.name)?d.name:d.fileName);i.setRequestHeader("X-File-Size",(d.size)?d.size:d.fileSize);i.setRequestHeader("X-Uploadr-Name",j.id);i.setRequestHeader("Content-Type",(d.type)?d.type:d.contentType);i.send(d)},onProgressHandler:function(p,h,k,m,f,g,t){var e=p.parent().width();var n=b(".progress",p);var s=b(".percentage",p);var c=b(".speed",p);var i,l,u,q,d,r;if(h.startTime&&k<100){i=new Date().getTime();l=Math.ceil((i-h.startTime)/1000);u=((h.fileSize/100)*k)/l;if(h.avg){d=Math.round((h.avg+u)/2);h.avg=d}else{h.avg=u;d=u}r=Math.ceil((h.fileSize/d)-l);q=a.bytesToSize(d)+"/s (about "+a.secondsToTime(r)+" to go)"}else{q=""}c.html(q);n.width((e/100)*k);s.html((m)?m:k+"%");if(m&&f){s.tipTip({content:f,maxWidth:600})}if(k>=100){var o=b(".rating",p);var j=b(".cancel",p);n.addClass("complete");j.hide();if(g.rating&&!t){c.hide();s.hide(1000);a.setRating(h.fileRating,p);o.show(500);if(h.fileRatingText){o.tipTip({content:h.fileRatingText,maxWidth:600})}}h.speed=null}},addVotingButtons:function(e,d,c){if(!c.voting){return true}var h=b(".voting",d);var g=document.createElement("div");g.setAttribute("class","like");var f=document.createElement("div");f.setAttribute("class","unlike");h[0].appendChild(g);h[0].appendChild(f);b(g).bind("click.uploadr",function(){c.onLike(e,d,function(i){e.fileRating=i;if(!e.fileRating||e.fileRating<0){e.fileRating=0}if(e.fileRating>1){e.fileRating=1}a.setRating(e.fileRating,d)})}).tipTip({content:c.likeText,maxWidth:600});b(f).bind("click.uploadr",function(){c.onUnlike(e,d,function(i){e.fileRating=i;if(!e.fileRating||e.fileRating<0){e.fileRating=0}if(e.fileRating>1){e.fileRating=1}a.setRating(e.fileRating,d)})}).tipTip({content:c.unlikeText,maxWidth:600})},addButtons:function(f,e,d){if(f.deletable){a.addButton(e,"delete",d.fileDeleteText,d.fileDeleteConfirm,d,function(){if(d.onDelete(f,e)){a.removeFileElement(e,d)}})}if(d.colorPicker){var c=a.addButton(e,"color",d.colorPickerText,"",d,function(){var g=b(".progress",e);var h=g.css("background-color");a.launchColorPicker(e,h,d,function(i){g.css("background-color",i);d.onChangeColor(f,e,i)})})}a.addButton(e,"download",d.fileDownloadText,"",d,function(){d.onDownload(f,e)});a.addButton(e,"view",d.fileViewText,"",d,function(){d.onView(f,e)});a.addVotingButtons(f,e,d)},addButton:function(c,g,f,e,k,j){var i=document.createElement("div");i.setAttribute("class","button "+g);i.setAttribute("style","display: none");var h=b(".buttons",c);h[0].appendChild(i);var d=b("."+g,c);if(f){d.tipTip({content:f,maxWidth:600})}d.bind("click.uploadr",function(l){if(!e||(confirm&&confirm(e))){j()}});d.show("slow");return d},launchColorPicker:function(d,g,t,s){var p=d.parent().parent();var n=b(".pickr",p);var k=null;if(!n.length){var r=document.createElement("div");r.setAttribute("class","arrow");var e=document.createElement("div");e.setAttribute("class","content");var j=document.createElement("ul");for(var h in t.colorPickerColors){var q=document.createElement("li");j.appendChild(q);b(q).css("background-color",t.colorPickerColors[h])}var m=document.createElement("div");m.setAttribute("class","pickr");e.appendChild(j);m.appendChild(e);m.appendChild(r);p[0].appendChild(m);n=b(".pickr",p);n.hide()}var c=b("li",n);for(var h=0;h<c.size();h++){var f=b(c[h]);var l=f.css("background-color");if(l==g){f.addClass("current")}else{f.removeClass("current")}f.unbind("click.uploadr");f.bind("click.uploadr",function(){s(b(this).css("background-color"));b(document).unbind("click.uploadr");n.hide(200)})}var o=d.position();n.css({top:o.top,left:o.left+d.width()+2});n.show(200,function(){b(document).bind("click.uploadr",function(i){if(i.pageX<n.position().left||i.pageX>(n.position().left+n.width())||i.pageY<n.position().top||i.pageY>(n.position().top+n.height())){b(document).unbind("click.uploadr");n.hide(200)}})})},setRating:function(g,e){var l=b(".rating",e);var f=l.children();if(g<0||!g){g=0}if(g>1){g=1}var d=Math.round(g*10);var h=Math.round(d/2);for(var j=1;j<=5;j++){var k=(h>=j)?((h==j&&(d%2))?"half":"full"):"empty";if(f.size()){b(f[j-1])[0].setAttribute("class",k)}else{var c=document.createElement("div");c.setAttribute("class",k);l[0].appendChild(c)}}},bytesToSize:function(c){var e=["B","KB","MB","GB","TB"];if(c==0){return"n/a"}var d=parseInt(Math.floor(Math.log(c)/Math.log(1024)));return Math.round(c/Math.pow(1024,d),2)+" "+e[d]},secondsToTime:function(e){var d=[" seconds","minutes","hours"];if(e==0){return"n/a"}var c=parseInt(Math.floor(Math.log(e)/Math.log(60)));return Math.round(e/Math.pow(60,c),2)+" "+d[c]},shortenFileName:function(g,c){var i="",h="",e="",f=0,d=c.lastIndexOf(".");if(c.length<=g){return c}else{if(d){i=c.substring(0,d);h=c.substring(d+1,c.length);f=(g-4-h.length);if(i.match(/\-\d+$/)){d=i.lastIndexOf("-");e=i.substring(d+1,i.length);i=i.substring(0,d);f-=e.length}}else{i=c}}return i.substring(0,f)+((e)?("..."+e+"."):"....")+h},addFileUploadField:function(h,g,f){var i=document.createElement("input");i.setAttribute("type","file");i.multiple=true;var c=document.createElement("div");c.setAttribute("class","message");c.innerHTML=f.fileSelectText;var e=document.createElement("div");e.setAttribute("class","fileinput");e.appendChild(c);e.appendChild(i);g.appendChild(e);var d=b("input[type=file]",h);b(".message",h).bind("click.uploadr",function(){d[0].click()});d.bind("change.uploadr",function(){if(typeof this.files!=="undefined"){b(".placeholder",g).hide();f.workvars.gotFiles=true;b.each(this.files,function(j,k){var l={fileName:k.fileName,fileSize:k.fileSize,startTime:new Date().getTime(),fileRating:0,deletable:true};var m=a.addFileElements(g,l,f);a.startUpload(k,l,b(m),f)})}})}};b.fn.uploadr=function(c){var d={placeholderText:"drag and drop your files here to upload...",fileSelectText:"Select files to upload",fileAbortText:"Click to abort file transfer",fileAbortConfirm:"Are you sure you would like to abort this tranfer?",fileDeleteText:"Click to delete this file",fileDeleteConfirm:"Are you sure you want to delete this file?",fileDownloadText:"Click to download this file",fileViewText:"Click to view this file",fileTooLargeText:"The upload size of %s is larger than allowed maximum of %s",likeText:"Click to like",unlikeText:"Click to unlike",colorPickerText:"Click to change background color",badgeTooltipSingular:"%d file is still being uploaded...",badgeTooltipPlural:"%d files are still being uploaded...",removeFromViewText:"Click to remove this aborted transfer from your view",labelDone:"done",labelFailed:"failed",labelAborted:"aborted",labelFileTooLarge:"too large",dropableClass:"uploadr-dropable",hoverClass:"uploadr-hover",uri:"/upload/uri",id:"uploadr",maxFileNameLength:34,maxSize:0,maxVisible:5,files:[],uploadField:true,insertDirection:"down",rating:true,voting:true,colorPicker:true,notificationSound:"",errorSound:"",deleteSound:"",colorPickerColors:["#bce08a","#00a8e1","#ff6418","#c78cda","#ffcb00","#e70033"],workvars:{gotFiles:false,files:[],notificationSoundEffect:null,errorSoundEffect:null,deleteSoundEffect:null,viewing:0,uploading:0,badgeDiv:null,uploadrDiv:null,paginationDiv:null,pagesDiv:null,nextButton:null,prevButton:null},onStart:function(e){},onProgress:function(g,f,e){return true},onSuccess:function(f,e,g){g()},onFailure:function(f,e){return true},onAbort:function(f,e){return true},onView:function(f,e){return true},onDownload:function(f,e){return true},onDelete:function(f,e){return true},onLike:function(f,e,g){g(f.fileRating+0.1)},onUnlike:function(f,e,g){g(f.fileRating-0.1)},onChangeColor:function(g,f,e){return true}};var c=b.extend(d,c);return this.each(function(){var j=b(this);var n=j.get(0);if(c.uploadField){a.addFileUploadField(j,n,c)}var i=document.createElement("div");i.setAttribute("class","badge hidden");var f=document.createElement("div");f.setAttribute("class","placeholder");f.innerHTML=d.placeholderText;var h=document.createElement("div");h.setAttribute("class","files "+d.dropableClass);h.appendChild(f);var o=document.createElement("div");o.setAttribute("class","pagination");var m=document.createElement("div");m.setAttribute("class","previous");var l=document.createElement("div");l.setAttribute("class","pages");var g=document.createElement("div");g.setAttribute("class","next");o.appendChild(m);o.appendChild(l);o.appendChild(g);n.appendChild(i);n.appendChild(h);n.appendChild(o);c.workvars.uploadrDiv=n;c.workvars.badgeDiv=b(i);c.workvars.paginationDiv=b(o);c.workvars.pagesDiv=b(l);c.workvars.nextButton=b(g);c.workvars.prevButton=b(m);c.workvars.badgeDiv.css({opacity:0});c.workvars.paginationDiv.hide();h.addEventListener("dragover",a.dragOver,false);h.addEventListener("dragenter",function(e){a.dragEnter(e,b(this),n,d.hoverClass,c)},false);h.addEventListener("dragleave",function(e){a.dragLeave(e,b(this),n,d.hoverClass,c)},false);h.addEventListener("drop",function(e){a.drop(e,b(this),n,d.hoverClass,c)},false);b(m).bind("click.uploadr",function(){c.workvars.viewing=c.workvars.viewing-c.maxVisible;a.handlePagination(n,c)});b(g).bind("click.uploadr",function(){c.workvars.viewing=c.workvars.viewing+c.maxVisible;a.handlePagination(n,c)});a.handlePagination(n,c);if(c.files){for(var k in c.files){a.addFile(n,c.files[k],c)}}if(c.notificationSound){c.workvars.notificationSoundEffect=new Audio(c.notificationSound)}if(c.errorSound){c.workvars.errorSoundEffect=new Audio(c.errorSound)}if(c.deleteSound){c.workvars.deleteSoundEffect=new Audio(c.deleteSound)}})}})(jQuery);