const users = [];
const requestData = [];

const requestHandler = (request,response) => {
    if(request.url === "/users"){
        request.on('data',(chunck)=>{
            requestData.push(chunck);
        });
        return request.on('end',() =>{
            var postedData = Buffer.concat(requestData).toString();
            var userName = postedData.split("=")[1];
            users.push(userName);
            response.write("<html>");
            response.write("<ul>");
            for (let index = 0; index < users.length; index++) {
                const element = users[index];
                response.write("<li>" + element + "</li>");
            }
            response.write("<html>");
            response.end();
        });
    }
    else if(request.url === "/"){
        response.write("<html>");
        response.write('<body><form action="/users" method="POST"><input type="text" name="user"><button>save</button></form></body>');
        response.write("</html>");
        response.end();
    }
};

module.exports = requestHandler;