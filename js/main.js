$(document).ready(function(){

    $.getJSON('https://github.com/lrvick.json?callback=?',function(data){
        var items = [];
        $.each(data, function(key,val){
            if (val.type == 'PushEvent'){
                items.push('<li><span class="time">'+val.created_at+'</span><span class="action">Pushed to: <a href="'+val.url+'">'+val.repository.name+'</a></span><br/> "'+val.payload.shas[0][2]+'"</li>');
            } else if (val.type == 'FollowEvent'){
                items.push('<li><span class="time">'+val.created_at+'</span><span class="action">Followed: <a href="'+val.url+'">'+val.payload.target.login+'</a></span></li>');
            } else if (val.type == 'WatchEvent'){
                items.push('<li><span class="time">'+val.created_at+'</span><span class="action">Watched: <a href="'+val.url+'">'+val.repository.name+'</a></span></li>');
            } else if (val.type == 'IssueCommentEvent'){
                items.push('<li><span class="time">'+val.created_at+'</span><span class="action">Commented on: <a href="'+val.url+'">'+val.repository.name+'</a><br/></span></li>');
            }
        })
        $('<ul/>',{ html: items.slice(0,3).join('\n') }).appendTo('.github')
        $('.github .time').cuteTime({refresh: 40});
    })

    $.getJSON('http://api.twitter.com/statuses/user_timeline.json?screen_name=lrvick&callback=?',function(data){
        var items = [];
        $.each(data, function(key,val){
            items.push('<li><span class="time">'+val.created_at+'</span>'+val.text+'</li>');
        })
        $('<ul/>',{ html: items.slice(0,3).join('\n') }).appendTo('.twitter')
        $('.twitter .time').cuteTime({refresh: 40});
    })

    $.getJSON('http://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=lrvick&api_key=30faa843dc740d5b76b0f1e77a66db59&format=json&callback=?',function(data){
        var items = [];
        $.each(data.recenttracks.track, function(key,val){
            var date
            if (val.date){
                date = val.date.uts
            } else {
                date = "Playing Now"
            }
            items.push('<li><span class="time">'+date+'</span><a href="'+val.url+'">'+val.artist['#text']+' - '+val.name+'</a></li>');
        })
        $('<ul/>',{ html: items.slice(0,3).join('\n') }).appendTo('.lastfm')
        $('.lastfm .time').cuteTime({refresh: 40});
    })

    $.getJSON('http://gdata.youtube.com/feeds/api/users/lrvick/uploads?v=2&alt=jsonc&callback=?',function(data){
        var items = []
        $.each(data.data.items,function(key,value){
            items.push('<li><span class="time">'+value.uploaded+'</span><a href="http://youtu.be/'+value.id+'">'+value.title+'</a></li>');
        })
        $('<ul/>',{ html: items.slice(0,3).join('\n') }).appendTo('.youtube')
        $('.youtube .time').cuteTime({refresh: 40});
    })

    var disqus_shortname = 'lrvick';
    (function () {
        var s = document.createElement('script'); s.async = true;
        s.type = 'text/javascript';
        s.src = 'http://' + disqus_shortname + '.disqus.com/count.js';
        (document.getElementsByTagName('HEAD')[0] || document.getElementsByTagName('BODY')[0]).appendChild(s);
    }());

    $('<a target="_blank" href="http://github.com/lrvick"><img style="position: absolute; top: 0; right: 0; border: 0;" src="https://a248.e.akamai.net/assets.github.com/img/4c7dc970b89fd04b81c8e221ba88ff99a06c6b61/687474703a2f2f73332e616d617a6f6e6177732e636f6d2f6769746875622f726962626f6e732f666f726b6d655f72696768745f77686974655f6666666666662e706e67" alt="Fork me on GitHub"></a>').appendTo('html');
})
