var http = require('http')

http.createServer(function(req,res){
	session(req,res)
	req.session.base = (req.session.base+1) || 1
	res.end('hi'+req.session.base)
}).listen(3000)
console.log('listen on 3000')
function session(req,res){
	if (req.session)
		return
	if (hasCookie(req)){
		var sid = getCookie()
		req.session = getSession(sid)
	}
	else{
		req.session =  {}
		var id = saveSession(req.session)
		setCookie(res,id)
	}
}
function hasCookie(req){
  var h = JSON.stringify(req.headers)
  var c = h['cookie']
  return c 
}
function getCookie(req){
  var h = JSON.stringify(req.headers)
  var c = h['cookie']
  	return c
}
function setCookie(res,id){
  res.setHeader("set-cookie",id)
}
var sessions = {}
var sid = 0  
function getSession(sid){
	return sessions[sid]
}
function saveSession(session){
	sessions[sid++,session]
	return sid
}

