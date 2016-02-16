/*!CK:1539797061!*//*1455268448,*/

if (self.CavalryLogger) { CavalryLogger.start_js(["Rs18G"]); }

__d('legacy:PhotoSnowlift',['PhotoSnowlift'],function a(b,c,d,e){if(c.__markCompiled)c.__markCompiled();b.PhotoSnowlift=c('PhotoSnowlift');},3);
__d('PhotoViewerFollow',['Arbiter','AsyncRequest','BanzaiODS','CSS','DOM','Event','Parent','PhotosConst','$'],function a(b,c,d,e,f,g,h,i,j,k,l,m,n,o,p){if(c.__markCompiled)c.__markCompiled();var q={};function r(s){'use strict';this.viewer=s;}r.prototype.init=function(s,t,u,v,w,x,y){'use strict';this.subscribeLink=s;this.unsubscribeFlyout=t;this.subscribeEndpoints=w;this.unsubscribeEndpoints=x;this.unsubLinks=v;this.unsubDiv=u;this.reset();this.activate();this.type=y;m.listen(this.subscribeLink,'click',(function(event){if(n.byClass(event.getTarget(),'photoViewerFollowLink'))this.subscribePhotoOwner();}).bind(this));m.listen(this.unsubLinks.user,'click',this.unsubscribePhotoOwner.bind(this));m.listen(this.unsubLinks.page,'click',this.unsubscribePhotoOwner.bind(this));h.subscribe(['FollowUser','FollowUserFail','UnfollowUser','UnfollowUserFail'],this.updateSubscribe.bind(this));h.subscribe(this.viewer.getEventString('DATA_CHANGE'),this.showSubscribeLinkOnChange.bind(this));if(this.viewer.getVersionConst()===o.VIEWER_SNOWLIFT){h.subscribe(this.viewer.getEventString('CLOSE'),this.reset.bind(this));h.subscribe(this.viewer.getEventString('OPEN'),this.activate.bind(this));}this.registerUnsubscribeTarget();};r.prototype.activate=function(){'use strict';this.activated=true;};r.prototype.reset=function(){'use strict';this.unsubscribeFlyout&&this.unsubscribeFlyout.clearNodes();this.subscriptionChange={};this.activated=false;};r.prototype.registerUnsubscribeTarget=function(){'use strict';if(!this.unsubscribeFlyout)return;var s=l.scry(this.subscribeLink,'.photoViewerFollowedMsg')[0];if(s&&!k.hasClass(s,'unsubFlyoutEnabled')){this.unsubscribeFlyout.initNode(s);k.addClass(s,'unsubFlyoutEnabled');}};r.prototype.updateSubscribe=function(s,t){'use strict';if(!this.activated)return;var u=t.profile_id;if(u){this.subscriptionChange[u]=s==='FollowUser'||s==='UnfollowUserFail'?'following':'unfollowed';this.toggleSubscribeLink(u);}};r.prototype.showSubscribeLinkOnChange=function(s,t){'use strict';this.type=t.ownertype;k.conditionClass(this.unsubDiv,'isPage',this.type==='page');this.toggleSubscribeLink(t.owner);};r.prototype.toggleSubscribeLink=function(s){'use strict';var t=l.scry(this.subscribeLink,'span.fbPhotoSubscribeWrapper')[0];if(!t)return;if(this.subscriptionChange[s]){k.conditionClass(t,'followingOwner',this.subscriptionChange[s]==='following');if(this.subscriptionChange[s]==='unfollowed')this.unsubscribeFlyout&&this.unsubscribeFlyout.hideFlyout(true);}this.registerUnsubscribeTarget();};r.prototype.subscribePhotoOwner=function(){'use strict';if(!this.viewer.getOwnerId())return;var s=this.type==='user'?{profile_id:this.viewer.getOwnerId()}:{fbpage_id:this.viewer.getOwnerId(),add:true,reload:false,fan_origin:'photo_snowlift'};h.inform('FollowUser',{profile_id:this.viewer.getOwnerId()});if(this.type==='page')j.bumpEntityKey('snowlift_page_like','snowlift_page_like.clicked_link');s.location=this.FOLLOW_LOCATION_PHOTO;new i(this.subscribeEndpoints[this.type]).setAllowCrossPageTransition(true).setData(s).setMethod('POST').setReadOnly(false).setErrorHandler(h.inform.bind(null,'FollowUserFail',s)).send();};r.prototype.unsubscribePhotoOwner=function(){'use strict';if(!this.viewer.getOwnerId())return;var s=this.type==='user'?{profile_id:this.viewer.getOwnerId()}:{fbpage_id:this.viewer.getOwnerId(),add:false,reload:false};h.inform('UnfollowUser',{profile_id:this.viewer.getOwnerId()});s.location=this.FOLLOW_LOCATION_PHOTO;new i(this.unsubscribeEndpoints[this.type]).setAllowCrossPageTransition(true).setData(s).setMethod('POST').setReadOnly(false).setErrorHandler(h.inform.bind(null,'UnfollowUserFail',s)).send();};r.createInstance=function(s,t,u,v,w,x,y,z){'use strict';var aa=s.getInstance(),ba=new r(aa);ba.init(p(t),u,v,w,x,y,z);q[aa.getVersionConst()]=ba;return ba;};r.getInstance=function(s){'use strict';return q[s];};Object.assign(r.prototype,{FOLLOW_LOCATION_PHOTO:48});f.exports=r;},null);
__d('PhotosButtonTooltips',['Arbiter','DOMDimensions','Style','Tooltip'],function a(b,c,d,e,f,g,h,i,j,k){if(c.__markCompiled)c.__markCompiled();var l=[],m=[],n;function o(s,t){if(!s||!s.length||!t||!t.length||s.length!=t.length)throw new Error('Incorrect arguments passed in from PHP for photo button cropping');var u=0,v=[],w=false;for(u=0;u<s.length;u++){v.push(i.getElementDimensions(s[u]).width);if(v[u])w=true;}if(w){s.forEach(function(aa){j.set(aa,'max-width','100%');});for(u=0;u<s.length;u++){var x=s[u],y=v[u];if(y){var z=i.getElementDimensions(x).width;if(z>y){k.set(x,t[u]);m.push(x);}}}s.forEach(function(aa){j.set(aa,'max-width','');});}return w;}function p(){l.forEach(function(s){s.unsubscribe();});l=[];m.forEach(k.remove);m=[];}function q(s,t,u){this.arbiterToken=h.subscribe(s,(function(){if(o(t,u))this.arbiterToken&&this.arbiterToken.unsubscribe();}).bind(this));}var r={init:function(){if(!n)n=h.subscribe('PhotoSnowlift.CLOSE',p);},registerButtonsOnPaging:function(s,t){l.push(new q('PhotoSnowlift.DATA_CHANGE',s,t).arbiterToken);},registerButtonsOnTaggingOn:function(s,t){l.push(new q('PhotoTagger.ACTIVATED_TAGGING',s,t).arbiterToken);},registerButtonsOnTaggingOff:function(s,t){l.push(new q('PhotoTagger.DEACTIVATED_TAGGING',s,t).arbiterToken);}};f.exports=r;},null);