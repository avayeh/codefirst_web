/*!CK:3460559795!*//*1455520318,*/

if (self.CavalryLogger) { CavalryLogger.start_js(["LlbV6"]); }

__d('NotificationCounter',['Arbiter','ChatConfig','DocumentTitle','JSLogger','UserActivity'],function a(b,c,d,e,f,g,h,i,j,k,l){if(c.__markCompiled)c.__markCompiled();var m={messages:0,notifications:0,requests:0},n={init:function(o){h.subscribe('update_title',this._handleUpdate.bind(this));h.subscribe('jewel/count-updated',this._handleCountUpdate.bind(this));},getCount:function(){var o=0;for(var p in m){var q=Number(m[p]);if(typeof m[p]=='string'&&isNaN(q))return m[p];if(isNaN(q)||q<0){k.create('jewels').error('bad_count',{jewel:p,count:m[p]});continue;}o+=q;}return o;},updateTitle:function(){var o=this.getCount(),p=j.get();p=o?'('+o+') '+p:p;j.set(p,true);},_handleCountUpdate:function(o,p){m[p.jewel]=p.count;this.updateTitle();},_handleUpdate:function(o,p){this.updateTitle();}};f.exports=n;},null);
__d("XNotificationsSyncController",["XController"],function a(b,c,d,e,f,g){c.__markCompiled&&c.__markCompiled();f.exports=c("XController").create("\/notifications\/sync\/",{lastSync:{type:"Int",required:true}});},null);
__d('NotificationSync',['Arbiter','AsyncRequest','ChannelConstants','JSLogger','NotificationConstants','NotificationUpdates','XNotificationsSyncController'],function a(b,c,d,e,f,g,h,i,j,k,l,m,n){if(c.__markCompiled)c.__markCompiled();var o=k.create('notifications'),p='channel_reload',q=0;function r(w){var x=m.getserverTime()?m.getserverTime():q,y=n.getURIBuilder().setInt('lastSync',x).getURI();w.setHandler(s).setOption('suppressErrorAlerts',true).setErrorHandler(t).setMethod('GET').setReadOnly(true).setURI(y).setAllowCrossPageTransition(true);}function s(w){var x=w.getPayload();if(x.syncPayload)m.handleUpdate(l.PayloadSourceType.SYNC,x.syncPayload);}function t(w){}function u(){var w=new i();w.setIsBackgroundRequest(true);r(w);w.send();o.bump(p);}var v={setup:function(w){q=w;h.subscribe(j.ON_INVALID_HISTORY,u);}};f.exports=v;},null);
__d('NotificationJewelController',['Arbiter','Event','NotificationConstants','NotificationCounter','NotificationSeenState','NotificationStore','NotificationSync','NotificationUpdates','createObjectFrom','curry'],function a(b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q){if(c.__markCompiled)c.__markCompiled();var r=0;function s(u){h.inform('jewel/count-updated',{jewel:u,count:l.getUnseenIDs().length},h.BEHAVIOR_STATE);}function t(u,v,w,x,y){'use strict';var z=null;if(v.list&&v.unseenNotifs&&v.startTime){z=v.list;w=v.unseenNotifs;x=v.startTime;}else z=v;if(y)m.registerEndpoint(y);k.init();var aa=i.listen(u.getRoot(),'mouseover',function(){aa.remove();aa=null;z.open();});if(u.isOpen()){z.open();}else var ba=u.subscribe('opened',function(){ba.unsubscribe();ba=null;z.open();});var ca=z.pause.bind(z);u.subscribe('opened',function(){setTimeout(ca,0);s(u.name);});u.subscribe('closed',function(){z.unpause();s(u.name);});o.subscribe('seen-state-updated',q(s,u.name));o.handleUpdate(j.PayloadSourceType.INITIAL_LOAD,{seenState:p(w,r)});n.setup(x);s(u.name);}f.exports=t;},null);