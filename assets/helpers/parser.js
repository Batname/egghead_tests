var aDomainContentGenerator = function *() {
    let data;
    var aList = document.querySelectorAll('a');
    for (var i = 0, c = aList.length, a, content, domain; i < c; i++) {
        a = aList[i];
        content = a.innerHTML;
        domain = a.getAttribute('href');
        data = yield {domain: domain, content: content};
        a.innerHTML = `${data.content} ${data.content} ${data.content}`
        console.log(data, 'content')
    }
};

var ancors = aDomainContentGenerator();
let value = true;
while(value){
  value = ancors.next(value).value;
};