var page = require('webpage').create();
page.open('http://127.0.0.1:5500/index.html', function(status) {
  console.log("Status: " + status);
  if(status === "success") {
    var body = page.evaluate(function() {
        var toString = function(pad, element) {
            var children = element.childNodes
            var childrenString = '';
            for(var i=0;i<children.length;i++) {
                childrenString += toString('  ' + pad, children[i]) + '\n'
            }
            var name = element.tagName
            if(element.nodeType === Node.TEXT_NODE) {
                name = "#text"
            }
            return pad + name + (children.length? '\n' + childrenString:"")
        }
        return toString("", document.body)
    });
    console.log(body);
  }
  phantom.exit();
});